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

    if (typeof x != 'number') {
      x = y = 0;
      width = this.width;
      height = this.height;
    } else if (typeof y != 'number') {
      y = 0;
      width = this.width;
      height = this.height;
    } else if (typeof width != 'number') {
      width = this.width;
      height = this.height;
    } else if (typeof height != 'number') {
      height = this.height;
    }

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
    if (x >= this.width) return this;
    if (x + width > this.width) {
      width = this.width - x;
    }
    if (x1 < 0) x1 = 0;
    if (x1 >= screen.width) return this;
    width = Math.min(width, screen.width - x1);

    if (y < 0) y = 0;
    if (y >= this.height) return this;
    if (y + height > this.height) {
      height = this.height - y;
    }
    if (y1 < 0) y1 = 0;
    if (y1 >= screen.height) return this;
    height = Math.min(height, screen.height - y1);

    // copy cells
    for (let i = 0; i < height; ++i) {
      const screenRow = screen.box[y1 + i],
        row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        row[x + j] = screenRow[x1 + j];
      }
    }

    return this;
  }

  put(x, y, s, ignore = '\x07') {
    // normalize arguments

    let length = s.length;

    if (x < 0) x = 0;
    if (x >= this.width) return this;
    if (x + length > this.width) {
      length = this.width - x;
    }

    if (y < 0) y = 0;
    if (y >= this.height) return this;

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

    return this;
  }

  fill(x, y, width, height, symbol, state = {}) {
    // normalize arguments

    if (x < 0) x = 0;
    if (x >= this.width) return this;
    if (x + width > this.width) {
      width = this.width - x;
    }

    if (y < 0) y = 0;
    if (y >= this.height) return this;
    if (y + height > this.height) {
      height = this.height - y;
    }

    if (typeof state == 'string') {
      state = newState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = newState(state);
    }

    // fill cells
    for (let i = 0; i < height; ++i) {
      const row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        row[x + j] = {symbol, state};
      }
    }

    return this;
  }

  clear(x, y, width, height) {
    // normalize arguments

    if (typeof x != 'number') {
      x = y = 0;
      width = this.width;
      height = this.height;
    } else if (typeof y != 'number') {
      y = 0;
      width = this.width;
      height = this.height;
    } else if (typeof width != 'number') {
      width = this.width;
      height = this.height;
    } else if (typeof height != 'number') {
      height = this.height;
    }

    if (x < 0) x = 0;
    if (x >= this.width) return this;
    if (x + width > this.width) {
      width = this.width - x;
    }

    if (y < 0) y = 0;
    if (y >= this.height) return this;
    if (y + height > this.height) {
      height = this.height - y;
    }

    // clear cells
    for (let i = 0; i < height; ++i) {
      const row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        row[x + j] = null;
      }
    }

    return this;
  }

  padLeft(n) {
    if (n <= 0) return this;

    for (let i = 0; i < this.height; ++i) {
      this.box[i] = new Array(n).fill(null).concat(this.box[i]);
    }
    this.width += n;

    return this;
  }

  padRight(n) {
    if (n <= 0) return this;

    for (let i = 0; i < this.height; ++i) {
      this.box[i] = this.box[i].concat(new Array(n).fill(null));
    }
    this.width += n;

    return this;
  }

  padLeftRight(n, m) {
    if (n <= 0) return this.padRight(m);
    if (m <= 0) return this.padLeft(n);

    for (let i = 0; i < this.height; ++i) {
      this.box[i] = new Array(n).fill(null).concat(this.box[i], new Array(m).fill(null));
    }
    this.width += n + m;

    return this;
  }

  padTop(n) {
    if (n <= 0) return this;

    const pad = new Array(n);
    for (let i = 0; i < n; ++i) {
      pad[i] = new Array(this.width).fill(null);
    }
    this.box = pad.concat(this.box);
    this.height += n;

    return this;
  }

  padBottom(n) {
    if (n <= 0) return this;

    const pad = new Array(n);
    for (let i = 0; i < n; ++i) {
      pad[i] = new Array(this.width).fill(null);
    }
    this.box = this.box.concat(pad);
    this.height += n;

    return this;
  }

  padTopBottom(n, m) {
    if (n <= 0) return this.padBottom(m);
    if (m <= 0) return this.padTop(n);

    const top = new Array(n);
    for (let i = 0; i < n; ++i) {
      top[i] = new Array(this.width).fill(null);
    }
    const bottom = new Array(m);
    for (let i = 0; i < m; ++i) {
      bottom[i] = new Array(this.width).fill(null);
    }
    this.box = top.concat(this.box, bottom);
    this.height += n + m;

    return this;
  }

  pad(t, r, b, l) {
    // use values according to CSS rules
    if (typeof r != 'number') {
      r = b = l = t;
    } else if (typeof b != 'number') {
      l = r;
      b = t;
    } else if (typeof l != 'number') {
      l = r;
    }

    return this.padLeftRight(l, r).padTopBottom(t, b);
  }

  addRight(screen, alignment = 'top') {
    const diff = this.height - screen.height;

    if (alignment === 'bottom') {
      if (diff >= 0) {
        for (let i = 0; i < diff; ++i) {
          this.box[i] = this.box[i].concat(new Array(screen.width).fill(null));
        }
        for (let i = diff; i < this.height; ++i) {
          this.box[i] = this.box[i].concat(screen.box[i - diff]);
        }
        return this;
      }
      const box = new Array(screen.height);
      for (let i = 0, n = -diff; i < n; ++i) {
        box[i] = new Array(screen.width).fill(null).concat().concat(screen.box[i]);
      }
      for (let i = -diff; i < screen.height; ++i) {
        box[i] = this.box[i + diff].concat(screen.box[i]);
      }
      this.box = box;
      return this;
    }

    if (alignment === 'top') {
      if (diff >= 0) {
        for (let i = 0; i < screen.height; ++i) {
          this.box[i] = this.box[i].concat(screen.box[i]);
        }
        for (let i = screen.height; i < this.height; ++i) {
          this.box[i] = this.box[i].concat(new Array(screen.width).fill(null));
        }
        return this;
      }
      const box = new Array(screen.height);
      for (let i = 0; i < this.height; ++i) {
        box[i] = this.box[i].concat(screen.box[i]);
      }
      for (let i = this.height; i < screen.height; ++i) {
        box[i] = new Array(screen.width).fill(null).concat().concat(screen.box[i]);
      }
      this.box = box;
      return this;
    }

    // alignment === 'center'

    if (diff >= 0) {
      const half = diff >> 1;
      for (let i = 0; i < half; ++i) {
        this.box[i] = this.box[i].concat(new Array(screen.width).fill(null));
      }
      for (let i = 0; i < screen.height; ++i) {
        this.box[i + half] = this.box[i + half].concat(screen.box[i]);
      }
      for (let i = screen.height + half; i < this.height; ++i) {
        this.box[i] = this.box[i].concat(new Array(screen.width).fill(null));
      }
      return this;
    }

    const half = -diff >> 1,
      box = new Array(screen.height);
    for (let i = 0; i < half; ++i) {
      box[i] = new Array(screen.width).fill(null).concat(screen.box[i]);
    }
    for (let i = 0; i < this.height; ++i) {
      box[i + half] = this.box[i].concat(screen.box[i + half]);
    }
    for (let i = this.height + half; i < screen.height; ++i) {
      box[i] = new Array(screen.width).fill(null).concat(screen.box[i]);
    }
    this.box = box;
    return this;
  }

  addBottom(screen, alignment = 'left') {
    const diff = this.width - screen.width;

    if (alignment === 'left') {
      if (diff >= 0) {
        this.box.splice(this.height, 0, ...screen.box.map(row => row.concat(new Array(diff).fill(null))));
        return this;
      }
      this.box = this.box.map(row => row.concat(new Array(diff).fill(null))).concat(screen.box);
      return this;
    }

    if (alignment === 'right') {
      if (diff >= 0) {
        this.box.splice(this.height, 0, ...screen.box.map(row => new Array(diff).fill(null).concat(row)));
        return this;
      }
      this.box = this.box.map(row => new Array(diff).fill(null).concat(row)).concat(screen.box);
      return this;
    }

    // alignment === 'center'

    if (diff >= 0) {
      const half = diff >> 1;
      this.box.splice(this.height, 0, ...screen.box.map(row => new Array(half).fill(null).concat(row, new Array(diff - half).fill(null))));
      return this;
    }

    const half = -diff >> 1;
    this.box = this.box.map(row => new Array(half).fill(null).concat(row, new Array(-diff - half).fill(null))).concat(screen.box);
    return this;

    return this;
  }
}
