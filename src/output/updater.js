'use strict';

import Writer from './writer.js';
import {toStrings} from '../strings.js';
import {cursorUp, setCommands} from '../ansi/csi.js';

const RESET = setCommands([]);

export class Updater {
  constructor(updater, {prologue, epilogue, noLastNewLine} = {}, writer = new Writer()) {
    this.updater = updater;
    this.writer = writer;
    this.prologue = prologue || RESET;
    this.epilogue = epilogue || RESET;
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
    if (this.intervalHandle || this.isDone || !this.writer.isTTY) return;
    this.intervalHandle = setInterval(this.update.bind(this), ms);
  }

  stopRefreshing() {
    if (!this.intervalHandle) return;
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
  }

  getFrame(state) {
    if (typeof this.updater == 'function') return this.updater(state);
    if (typeof this.updater?.getFrame == 'function') {
      this.updater.state = state;
      return this.updater.getFrame();
    }
    throw new TypeError('Updater must be a function or implement getFrame()');
  }

  async writeFrame(state) {
    if (this.first) {
      this.prologue && (await this.writer.writeString(this.prologue));
      this.first = false;
    }

    const frame = toStrings(this.getFrame(state));
    if (!frame) return;

    if (this.lastHeight) await this.writer.writeString('\r' + cursorUp(this.lastHeight));

    this.lastHeight = frame.length;
    if (this.noLastNewLine) --this.lastHeight;

    await this.writer.write(frame, false, this.noLastNewLine);
  }

  async done() {
    if (this.isDone) return;
    this.isDone = true;
    this.stopRefreshing();
    this.epilogue && (await this.writer.writeString(this.epilogue));
  }

  async update(state = 'active') {
    if (this.isDone || !this.writer.isTTY) return;
    await this.writeFrame(state);
  }

  async final() {
    if (this.isDone) return;
    await this.writeFrame('finished');
    await this.done();
  }
}

export default Updater;
