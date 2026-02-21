'use strict';

import Writer from './writer.js';
import {toStrings} from '../strings.js';
import {cursorUp, setCommands} from '../ansi/csi.js';

const RESET = setCommands([]);

/** Manages continuously updating console output (spinners, progress bars, etc.).
 * Handles refreshing frames, prologue/epilogue sequences, and interacts with a Writer instance.
 */
export class Updater {
  /** @param {Function|{state?: string, getFrame: Function}} updater - A function `(state, ...args) => frame` or an object with `getFrame()`.
   * @param {object} [options] - Options.
   * @param {string} [options.prologue] - String written before the first frame.
   * @param {string} [options.epilogue] - String written after the last frame.
   * @param {string} [options.beforeFrame] - String written before each frame.
   * @param {string} [options.afterFrame] - String written after each frame.
   * @param {string} [options.beforeLine] - String prepended to each line.
   * @param {string} [options.afterLine] - String appended to each line.
   * @param {boolean} [options.noLastNewLine] - If true, omit the trailing newline of each frame.
   * @param {Writer} [writer=new Writer()] - The Writer instance to use.
   */
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
    this.isDone = false;
    this.first = true;
    this.intervalHandle = null;
  }

  /** Whether the updater is currently auto-refreshing. */
  get isRefreshing() {
    return this.intervalHandle !== null;
  }

  /** Starts auto-refreshing at the given interval.
   * @param {number} [ms=100] - Refresh interval in milliseconds.
   * @returns {this}
   */
  startRefreshing(ms = 100) {
    if (this.intervalHandle || this.isDone || !this.writer.isTTY) return this;
    this.intervalHandle = setInterval(this.update.bind(this), ms);
    return this;
  }

  /** Stops auto-refreshing.
   * @returns {this}
   */
  stopRefreshing() {
    if (!this.intervalHandle) return this;
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
    return this;
  }

  /** Resets the updater state, stopping any refresh and clearing the done flag.
   * @returns {this}
   */
  reset() {
    this.stopRefreshing();
    this.isDone = false;
    this.lastHeight = 0;
    return this;
  }

  /** Gets a frame from the updater function or object.
   * @param {string} state - The current state ('active', 'paused', 'finished', etc.).
   * @param {...*} args - Additional arguments.
   * @returns {*} The frame content.
   */
  getFrame(state, ...args) {
    if (typeof this.updater == 'function') return this.updater(state, ...args);
    if (typeof this.updater?.getFrame == 'function') {
      this.updater.state = state;
      return this.updater.getFrame(...args);
    }
    throw new TypeError('Updater must be a function or implement getFrame()');
  }

  /** Writes a single frame to the output, handling cursor repositioning.
   * @param {string} state - The current state.
   * @param {...*} args - Additional arguments passed to `getFrame()`.
   * @returns {Promise<void>}
   */
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

    await this.writer.write(frame, {
      noLastNewLine: this.noLastNewLine,
      beforeLine: this.beforeLine,
      afterLine: this.afterLine
    });
    this.afterFrame && (await this.writer.writeString(this.afterFrame));
  }

  /** Marks the updater as done, stops refreshing, and writes the epilogue.
   * @returns {Promise<void>}
   */
  async done() {
    if (this.isDone) return;
    this.isDone = true;
    this.stopRefreshing();
    this.epilogue && (await this.writer.writeString(this.epilogue));
  }

  /** Updates the display with a new frame.
   * @param {string} [state='active'] - The current state.
   * @param {...*} args - Additional arguments passed to `getFrame()`.
   * @returns {Promise<void>}
   */
  async update(state = 'active', ...args) {
    if (this.isDone || !this.writer.isTTY) return;
    await this.writeFrame(state, ...args);
  }

  /** Writes the final frame with state 'finished' and calls `done()`.
   * @param {...*} args - Additional arguments passed to `getFrame()`.
   * @returns {Promise<void>}
   */
  async final(...args) {
    if (this.isDone) return;
    await this.writeFrame('finished', ...args);
    await this.done();
  }
}

export default Updater;
