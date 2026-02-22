import process from 'node:process';

import {CURSOR_DOWN1, CURSOR_RESTORE_POS, CURSOR_SAVE_POS} from '../ansi/csi.js';
import {getLength, matchCsiNoGroups, matchCsiNoSgrNoGroups, toStrings} from '../strings.js';

const write = async (stream, chunk, encoding = 'utf8') =>
  new Promise((resolve, reject) => stream.write(chunk, encoding, error => (error ? reject(error) : resolve())));

/** Abstracts writing to a stream (defaulting to `process.stdout`).
 * Handles TTY capabilities, color depth, cursor manipulation, and ANSI stripping for non-TTY streams.
 */
export class Writer {
  /**
   * @param {import('node:stream').Writable} [stream=process.stdout] - The output stream.
   * @param {number} [forceColorDepth] - Force a specific color depth instead of auto-detecting.
   */
  constructor(stream = process.stdout, forceColorDepth) {
    this.stream = stream;
    this.forceColorDepth = forceColorDepth;
  }

  /** Whether the stream is a TTY. */
  get isTTY() {
    return this.stream.isTTY;
  }
  /** The number of columns in the terminal. */
  get columns() {
    return this.stream.columns;
  }
  /** The number of rows in the terminal. */
  get rows() {
    return this.stream.rows;
  }
  /** The terminal size as `{columns, rows}`. */
  get size() {
    const [columns, rows] = this.stream.getWindowSize?.() || [];
    return {columns, rows};
  }
  /** Returns the color depth of the stream.
   * @param {object} [env] - Environment variables to check (default: `process.env`).
   * @returns {number} The color depth (1, 4, 8, or 24).
   */
  getColorDepth(...args) {
    return this.forceColorDepth || this.stream.getColorDepth?.(...args);
  }

  /** Checks if the stream supports the given number of colors.
   * @param {number} [count] - Number of colors to check for.
   * @param {object} [env] - Environment variables to check.
   * @returns {boolean} True if supported.
   */
  hasColors(...args) {
    return this.forceColorDepth ? args[0] <= Math.pow(2, this.forceColorDepth) : this.stream.hasColors?.(...args);
  }

  /** Clears the current line.
   * @param {number} dir - Direction: -1 = left, 0 = entire line, 1 = right.
   * @returns {Promise<boolean>} True if the operation was supported.
   */
  clearLine(dir) {
    return new Promise((resolve, reject) => {
      if (typeof this.stream.clearLine == 'function') {
        this.stream.clearLine(dir, error => (error ? reject(error) : resolve(true)));
      } else {
        resolve(false);
      }
    });
  }
  /** Clears the screen from the cursor down.
   * @returns {Promise<boolean>} True if the operation was supported.
   */
  clearScreenDown() {
    return new Promise((resolve, reject) => {
      if (typeof this.stream.clearScreenDown == 'function') {
        this.stream.clearScreenDown(error => (error ? reject(error) : resolve(true)));
      } else {
        resolve(false);
      }
    });
  }

  /** Moves the cursor to an absolute position.
   * @param {number} x - Column.
   * @param {number} [y] - Row.
   * @returns {Promise<boolean>} True if the operation was supported.
   */
  cursorTo(x, y) {
    return new Promise((resolve, reject) => {
      if (typeof this.stream.cursorTo == 'function') {
        this.stream.cursorTo(x, y, error => (error ? reject(error) : resolve(true)));
      } else {
        resolve(false);
      }
    });
  }
  /** Moves the cursor relative to its current position.
   * @param {number} dx - Columns to move.
   * @param {number} dy - Rows to move.
   * @returns {Promise<boolean>} True if the operation was supported.
   */
  moveCursor(dx, dy) {
    return new Promise((resolve, reject) => {
      if (typeof this.stream.moveCursor == 'function') {
        this.stream.moveCursor(dx, dy, error => (error ? reject(error) : resolve(true)));
      } else {
        resolve(false);
      }
    });
  }

  /** Writes a raw string to the stream, stripping ANSI codes for non-TTY streams.
   * @param {string} s - The string to write.
   * @returns {Promise<void>}
   */
  async writeString(s) {
    s = String(s);

    if (this.isTTY) {
      await write(this.stream, s);
      return;
    }

    // no cursor/screen commands
    if (this.forceColorDepth) {
      matchCsiNoSgrNoGroups.lastIndex = 0;
      await write(this.stream, s.replace(matchCsiNoSgrNoGroups, ''));
      return;
    }

    // no colors
    matchCsiNoGroups.lastIndex = 0;
    await write(this.stream, s.replace(matchCsiNoGroups, ''));
  }

  /** Writes a text container to the stream.
   * @param {import('../strings.js').StringsInput} s - Input convertible to strings.
   * @param {object} [options] - Options.
   * @param {boolean|'save'} [options.sameColumn] - If true or 'save', keep cursor in the same column between lines.
   * @param {boolean} [options.noLastNewLine] - If true, omit the trailing newline.
   * @param {string} [options.beforeLine=''] - String prepended to each line.
   * @param {string} [options.afterLine=''] - String appended to each line.
   * @returns {Promise<void>}
   */
  async write(s, {sameColumn, noLastNewLine, beforeLine = '', afterLine = ''} = {}) {
    s = toStrings(s);

    if (!this.isTTY) {
      const matcher = this.forceColorDepth ? matchCsiNoSgrNoGroups : matchCsiNoGroups;
      let lines = Array.from(s)
        .map(line => beforeLine + line + afterLine)
        .join('\n');
      if (!noLastNewLine) lines += '\n';
      matcher.lastIndex = 0;
      lines = lines.replace(matcher, '');
      await write(this.stream, lines);
      return;
    }

    if (sameColumn === 'save') {
      for (const line of s) {
        await write(this.stream, CURSOR_SAVE_POS + beforeLine + line + afterLine + CURSOR_RESTORE_POS + CURSOR_DOWN1);
      }
      return;
    }

    if (sameColumn) {
      for (const line of s) {
        const fullLine = beforeLine + line + afterLine,
          length = getLength(fullLine);
        await write(this.stream, fullLine);
        await this.moveCursor(-length, 1);
      }
      return;
    }

    let lines = Array.from(s)
      .map(line => beforeLine + line + afterLine)
      .join('\n');
    if (!noLastNewLine) lines += '\n';
    await write(this.stream, lines);
  }
}

export default Writer;
