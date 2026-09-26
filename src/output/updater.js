// @ts-self-types="./updater.d.ts"
import Writer from './writer.js';
import {getLength, toStrings} from '../strings.js';
import {CLEAR_EOL, CLEAR_EOS, cursorUp, setCommands} from '../ansi/csi.js';

const RESET = setCommands([]);

const ignore = () => {};

export class Updater {
  constructor(
    updater,
    {prologue, epilogue, beforeFrame, afterFrame, beforeLine, afterLine, noLastNewLine} = {},
    writer = new Writer()
  ) {
    this.updater = updater;
    this.writer = writer;
    this.prologue = prologue || RESET;
    this.epilogue = epilogue || RESET;
    this.beforeFrame = beforeFrame || '';
    this.afterFrame = afterFrame || '';
    this.beforeLine = beforeLine || '';
    this.afterLine = afterLine || '';
    this.noLastNewLine = noLastNewLine;
    this.lastHeight = 0;
    this.lastWidths = [];
    this.isDone = false;
    this.first = true;
    this.intervalHandle = null;
    this.pendingFrame = null;
    this.donePromise = null;
  }

  get isRefreshing() {
    return this.intervalHandle !== null;
  }

  startRefreshing(ms = 100) {
    if (this.intervalHandle || this.isDone || !this.writer.isTTY) return this;
    this.intervalHandle = setInterval(() => this.pendingFrame || this.update(), ms);
    return this;
  }

  stopRefreshing() {
    if (!this.intervalHandle) return this;
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
    return this;
  }

  reset() {
    this.stopRefreshing();
    this.isDone = false;
    this.lastHeight = 0;
    this.lastWidths = [];
    this.first = true;
    this.donePromise = null;
    return this;
  }

  getFrame(state, ...args) {
    if (typeof this.updater == 'function') return this.updater(state, ...args);
    if (this.updater) {
      this.updater.state = state;
      if (typeof this.updater.nextFrame == 'function') return this.updater.nextFrame(...args);
      if (typeof this.updater.getFrame == 'function') return this.updater.getFrame(...args);
    }
    throw new TypeError('Updater must be a function or implement nextFrame()/getFrame()');
  }

  writeFrame(state, ...args) {
    const draw = async () => {
      if (this.first) {
        this.prologue && (await this.writer.writeString(this.prologue));
        this.first = false;
      }

      const frame = toStrings(this.getFrame(state, ...args));
      if (!frame) return;

      const previousHeight = this.lastHeight,
        previousWidths = this.lastWidths;
      if (previousHeight) {
        const up = this.noLastNewLine ? previousHeight - 1 : previousHeight;
        await this.writer.writeString('\r' + (up > 0 ? cursorUp(up) : '') + this.beforeFrame);
      }

      const widths = frame.map(line => getLength(this.beforeLine + line + this.afterLine));
      this.lastHeight = frame.length;
      this.lastWidths = widths;

      const lines = frame.map((line, i) => (widths[i] < (previousWidths[i] ?? 0) ? line + CLEAR_EOL : line));
      await this.writer.write(lines, {
        noLastNewLine: this.noLastNewLine,
        beforeLine: this.beforeLine,
        afterLine: this.afterLine
      });
      if (this.lastHeight < previousHeight) await this.writer.writeString(CLEAR_EOS);
      this.afterFrame && (await this.writer.writeString(this.afterFrame));
    };

    const current = this.pendingFrame ? this.pendingFrame.then(draw, draw) : draw();
    this.pendingFrame = current;
    const clear = () => {
      if (this.pendingFrame === current) this.pendingFrame = null;
    };
    current.then(clear, clear);
    return current;
  }

  done() {
    this.donePromise ??= (async () => {
      this.isDone = true;
      this.stopRefreshing();
      if (this.pendingFrame) await this.pendingFrame.catch(ignore);
      this.epilogue && (await this.writer.writeString(this.epilogue));
    })();
    return this.donePromise;
  }

  async update(state = 'active', ...args) {
    if (this.isDone || !this.writer.isTTY) return;
    await this.writeFrame(state, ...args);
  }

  async final(...args) {
    if (this.isDone) return this.done();
    await this.writeFrame('finished', ...args);
    await this.done();
  }
}

export default Updater;
