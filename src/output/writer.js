'use strict';

import process from 'node:process';

import {CURSOR_DOWN1, CURSOR_RESTORE_POS, CURSOR_SAVE_POS} from '../ansi/csi.js';
import {getLength, matchCsiNoGroups, matchCsiNoSgrNoGroups, toStrings} from '../strings.js';

const write = async (stream, chunk, encoding = 'utf8') =>
  new Promise((resolve, reject) => stream.write(chunk, encoding, error => (error ? reject(error) : resolve())));

export class Writer {
  constructor(stream = process.stdout, forceColorDepth) {
    this.stream = stream;
    this.forceColorDepth = forceColorDepth;
  }

  get isTTY() {
    return this.stream.isTTY;
  }
  get columns() {
    return this.stream.columns;
  }
  get rows() {
    return this.stream.rows;
  }
  get size() {
    const [columns, rows] = this.stream.getWindowSize?.() || [];
    return {columns, rows};
  }
  getColorDepth(...args) {
    return this.forceColorDepth || this.stream.getColorDepth?.(...args);
  }

  hasColors(...args) {
    return this.forceColorDepth ? args[0] <= Math.pow(2, this.forceColorDepth) : this.stream.hasColors?.(...args);
  }

  clearLine(dir) {
    return new Promise((resolve, reject) => {
      if (typeof this.stream.clearLine == 'function') {
        this.stream.clearLine(dir, error => (error ? reject(error) : resolve(true)));
      } else {
        resolve(false);
      }
    });
  }
  clearScreenDown() {
    return new Promise((resolve, reject) => {
      if (typeof this.stream.clearScreenDown == 'function') {
        this.stream.clearScreenDown(error => (error ? reject(error) : resolve(true)));
      } else {
        resolve(false);
      }
    });
  }

  cursorTo(x, y) {
    return new Promise((resolve, reject) => {
      if (typeof this.stream.cursorTo == 'function') {
        this.stream.cursorTo(x, y, error => (error ? reject(error) : resolve(true)));
      } else {
        resolve(false);
      }
    });
  }
  moveCursor(dx, dy) {
    return new Promise((resolve, reject) => {
      if (typeof this.stream.moveCursor == 'function') {
        this.stream.moveCursor(dx, dy, error => (error ? reject(error) : resolve(true)));
      } else {
        resolve(false);
      }
    });
  }

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

  async write(s, sameColumn, noLastNewLine) {
    s = toStrings(s);

    if (!this.isTTY) {
      const matcher = this.forceColorDepth ? matchCsiNoSgrNoGroups : matchCsiNoGroups;
      let lines = Array.from(s).join('\n');
      if (!noLastNewLine) lines += '\n';
      matcher.lastIndex = 0;
      lines = lines.replace(matcher, '');
      await write(this.stream, lines);
      return;
    }

    if (sameColumn === 'save') {
      for (const line of s) {
        await write(this.stream, CURSOR_SAVE_POS + line + CURSOR_RESTORE_POS + CURSOR_DOWN1);
      }
      return;
    }

    if (sameColumn) {
      for (const line of s) {
        const length = getLength(line);
        await write(this.stream, line);
        await this.moveCursor(-length, 1);
      }
      return;
    }

    let lines = Array.from(s).join('\n');
    if (!noLastNewLine) lines += '\n';
    await write(this.stream, lines);
  }
}

export default Writer;
