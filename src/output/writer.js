import {CURSOR_DOWN1, CURSOR_RESTORE_POS, CURSOR_SAVE_POS} from '../ansi/csi.js';
import {getLength, matchCsiNoGroups, toStrings} from '../strings.js';

const write = async (stream, chunk, encoding = 'utf8') =>
  new Promise((resolve, reject) => {
    stream.write(chunk, encoding, error => (error ? reject(error) : resolve()));
  });

export class Writer {
  constructor(stream) {
    this.stream = stream;
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
    const [columns, rows] = this.stream.getWindowSize();
    return {columns, rows};
  }
  get colorDepth() {
    return this.stream.getColorDepth();
  }

  hasColors(...args) {
    return this.stream.hasColors(...args);
  }

  clearLine(dir) {
    return new Promise((resolve, reject) => this.stream.clearLine(dir, error => (error ? reject(error) : resolve())));
  }
  clearScreenDown() {
    return new Promise((resolve, reject) => this.stream.clearScreenDown(error => (error ? reject(error) : resolve())));
  }

  cursorTo(x, y) {
    return new Promise((resolve, reject) => this.stream.cursorTo(x, y, error => (error ? reject(error) : resolve())));
  }
  moveCursor(dx, dy) {
    return new Promise((resolve, reject) =>
      this.stream.moveCursor(dx, dy, error => (error ? reject(error) : resolve()))
    );
  }

  async writeString(s) {
    s = String(s);

    if (this.isTTY) {
      await write(this.stream, s);
      return;
    }

    matchCsiNoGroups.lastIndex = 0;
    await write(this.stream, s.replace(matchCsiNoGroups, ''));
  }

  async write(s, sameColumn) {
    s = toStrings(s);

    if (!this.isTTY) {
      for (const line of s) {
        matchCsiNoGroups.lastIndex = 0;
        await write(this.stream, line.replace(matchCsiNoGroups, '') + '\n');
      }
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

    for (const line of s) {
      await write(this.stream, line + '\n');
    }
  }
}

export default Writer;
