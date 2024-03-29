import {getLength} from './utils.js';
import {matchCsi} from './csi.js';
import {setCommands} from './sgr.js';
import {newState, stateCommand} from './sgr-state.js';

class Screen {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.box = new Array(height);
    for (let i = 0; i < height; ++i) {
      this.box[i] = new Array(width).fill(null);
    }
  }

  static fromBox(box, ignore = '\x07') {
    // box should be normalized
    if (!box || !box.length || !box[0].length) return null;

    const screen = new Screen(getLength(box[0]), box.length);

    for (let i = 0; i < box.length; ++i) {
      const row = box[i],
        screenRow = screen.box[i];
      let start = 0,
        pos = 0,
        state = {};
      matchCsi.lastIndex = 0;
      for (const match of row.matchAll(matchCsi)) {
        for (let j = start, n = match.index; j < n; ++j) {
          screenRow[pos++] = row[j] === ignore ? null : {symbol: row[j], state};
        }
        start = match.index + match[0].length;
        if (match[3] === 'm') {
          state = newState(match[1].split(';'), state);
        }
      }
      for (let j = start, n = row.length; j < n; ++j) {
        screenRow[pos++] = row[j] === ignore ? null : {symbol: row[j], state};
      }
    }

    return screen;
  }

  toBox(endOfLineCommand = '', ignore = '\x07') {
    if (!this.height || !this.width) return null;

    const box = new Array(this.height);

    for (let i = 0; i < this.height; ++i) {
      const screenRow = this.box[i];
      let row = '',
        state = {};
      for (let j = 0; j < this.width; ++j) {
        const cell = screenRow[j];
        if (!cell) {
          row += ignore;
          continue;
        }
        const commands = stateCommand(state, cell.state);
        if (commands.length) {
          row += setCommands(commands);
        }
        state = cell.state;
        row += cell.symbol;
      }
      box[i] = row + endOfLineCommand;
    }

    return box;
  }

  extract(x, y, width, height) {
    // normalize arguments

    if (x < 0) x = 0;
    if (x >= this.width) return null;
    if (x + width > this.width) {
      width = this.width - x;
    }

    if (y < 0) y = 0;
    if (y >= this.height) return null;
    if (y + height > this.height) {
      height = this.height - y;
    }

    // create new instance
    const screen = new Screen(width, height);

    // copy cells
    for (let i = 0; i < height; ++i) {
      const screenRow = screen.box[i],
        row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        screenRow[j] = row[x + j];
      }
    }

    return screen;
  }

  copyFrom(x, y, width, height, screen, x1, y1) {
    // normalize arguments

    if (x < 0) x = 0;
    if (x >= this.width) return false;
    if (x + width > this.width) {
      width = this.width - x;
    }
    if (x1 < 0) x1 = 0;
    if (x1 >= screen.width) return false;
    width = Math.min(width, screen.width - x1);

    if (y < 0) y = 0;
    if (y >= this.height) return false;
    if (y + height > this.height) {
      height = this.height - y;
    }
    if (y1 < 0) y1 = 0;
    if (y1 >= screen.height) return false;
    height = Math.min(height, screen.height - y1);

    // copy cells
    for (let i = 0; i < height; ++i) {
      const screenRow = screen.box[y1 + i],
        row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        row[x + j] = screenRow[x1 + j];
      }
    }

    return true;
  }

  put(x, y, s, ignore = '\x07') {
    // normalize arguments

    let length = s.length;

    if (x < 0) x = 0;
    if (x >= this.width) return false;
    if (x + length > this.width) {
      length = this.width - x;
    }

    if (y < 0) y = 0;
    if (y >= this.height) return false;

    // copy cells
    const row = this.box[y];
    let start = 0,
      pos = 0,
      state = x > 0 ? row[x - 1].state : {};
    matchCsi.lastIndex = 0;
    for (const match of s.matchAll(matchCsi)) {
      for (let j = start, n = match.index; j < n; ++j, ++pos) {
        if (x + pos >= row.length) break;
        row[x + pos] = s[j] === ignore ? null : {symbol: s[j], state};
      }
      start = match.index + match[0].length;
      if (match[3] === 'm') {
        state = newState(match[1].split(';'), state);
      }
    }
    for (let j = start, n = row.length; j < n; ++j, ++row) {
      if (x + pos >= row.length) break;
      row[x + pos] = s[j] === ignore ? null : {symbol: s[j], state};
    }

    return true;
  }
}
