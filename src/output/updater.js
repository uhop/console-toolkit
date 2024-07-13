'use strict';

import Writer from './writer.js';
import {toStrings} from '../strings.js';
import {cursorUp, setCommands} from '../ansi/csi.js';

const RESET = setCommands([]);

export class Updater {
  constructor(updater, {prologue, epilogue, beforeFrame, afterFrame, beforeLine, afterLine, noLastNewLine} = {}, writer = new Writer()) {
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
    this.isDone = false;
    this.first = true;
    this.intervalHandle = null;
  }

  get isRefreshing() {
    return this.intervalHandle !== null;
  }

  startRefreshing(ms = 100) {
    if (this.intervalHandle || this.isDone || !this.writer.isTTY) return this;
    this.intervalHandle = setInterval(this.update.bind(this), ms);
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
    return this;
  }

  getFrame(state, ...args) {
    if (typeof this.updater == 'function') return this.updater(state, ...args);
    if (typeof this.updater?.getFrame == 'function') {
      this.updater.state = state;
      return this.updater.getFrame(...args);
    }
    throw new TypeError('Updater must be a function or implement getFrame()');
  }

  async writeFrame(state, ...args) {
    if (this.first) {
      this.prologue && (await this.writer.writeString(this.prologue));
      this.first = false;
    }

    const frame = toStrings(this.getFrame(state, ...args));
    if (!frame) return;

    if (this.lastHeight) await this.writer.writeString('\r' + cursorUp(this.lastHeight) + this.beforeFrame);

    this.lastHeight = frame.length;
    if (this.noLastNewLine) --this.lastHeight;

    await this.writer.write(frame, {noLastNewLine: this.noLastNewLine, beforeLine: this.beforeLine, afterLine: this.afterLine});
    this.afterFrame && (await this.writer.writeString(this.afterFrame));
  }

  async done() {
    if (this.isDone) return;
    this.isDone = true;
    this.stopRefreshing();
    this.epilogue && (await this.writer.writeString(this.epilogue));
  }

  async update(state = 'active', ...args) {
    if (this.isDone || !this.writer.isTTY) return;
    await this.writeFrame(state, ...args);
  }

  async final(...args) {
    if (this.isDone) return;
    await this.writeFrame('finished', ...args);
    await this.done();
  }
}

export default Updater;
