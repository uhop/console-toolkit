import {matchCsi} from './ansi/csi.js';
import {
  RESET_STATE,
  combineStates,
  commandsToState,
  addCommandsToState,
  stateTransition,
  stateReverseTransition,
  stringifyCommands,
  optimize
} from './ansi/sgr-state.js';
import Box from './Box.js';

// TODO: When copying and filling areas accept a state that finishes a row. The same goes for `addRight()`.

export class Panel {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.box = new Array(height);
    for (let i = 0; i < height; ++i) {
      this.box[i] = new Array(width).fill(null);
    }
  }

  static fromBox(box, ignore = '\x07') {
    if (!(box instanceof Box)) box = new Box(box);
    if (!box.height || !box.width) return null;

    const panel = new Panel(box.width, box.height);

    for (let i = 0, n = box.height; i < n; ++i) {
      const row = box.box[i],
        panelRow = panel.box[i];
      let start = 0,
        pos = 0,
        state = {};
      matchCsi.lastIndex = 0;
      for (const match of row.matchAll(matchCsi)) {
        const str = [...row.substring(start, match.index)];
        for (let j = 0; j < str.length; ++j) {
          panelRow[pos++] = str[j] === ignore ? null : {symbol: str[j], state};
        }
        start = match.index + match[0].length;
        if (match[3] !== 'm') continue;
        state = addCommandsToState(state, match[1].split(';'));
      }
      const str = [...row.substring(start)];
      for (let j = 0; j < str.length; ++j) {
        panelRow[pos++] = str[j] === ignore ? null : {symbol: str[j], state};
      }
    }

    return panel;
  }

  toBox(ignore = ' ') {
    if (!this.height || !this.width) return null;

    const box = new Array(this.height),
      emptyCell = {symbol: ignore, state: RESET_STATE};

    for (let i = 0; i < this.height; ++i) {
      const panelRow = this.box[i];
      let row = '',
        initState = {},
        state = initState;
      for (let j = 0; j < this.width; ++j) {
        const cell = panelRow[j] || emptyCell,
          newState = combineStates(state, cell.state),
          commands = stateTransition(state, newState);
        row += stringifyCommands(commands) + cell.symbol;
        state = newState;
      }
      const commands = stateReverseTransition(initState, state);
      box[i] = optimize(row + stringifyCommands(commands), initState);
    }

    return new Box(box, true);
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
    const panel = new Panel(width, height);

    // copy cells
    for (let i = 0; i < height; ++i) {
      const panelRow = panel.box[i],
        row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        panelRow[j] = row[x + j];
      }
    }

    return panel;
  }

  copyFrom(x, y, width, height, panel, x1 = 0, y1 = 0) {
    // normalize arguments

    if (x < 0) x = 0;
    if (x >= this.width) return this;
    if (x + width > this.width) {
      width = this.width - x;
    }
    if (x1 < 0) x1 = 0;
    if (x1 >= panel.width) return this;
    width = Math.min(width, panel.width - x1);

    if (y < 0) y = 0;
    if (y >= this.height) return this;
    if (y + height > this.height) {
      height = this.height - y;
    }
    if (y1 < 0) y1 = 0;
    if (y1 >= panel.height) return this;
    height = Math.min(height, panel.height - y1);

    // copy cells
    for (let i = 0; i < height; ++i) {
      const panelRow = panel.box[y1 + i],
        row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        row[x + j] = panelRow[x1 + j];
      }
    }

    return this;
  }

  put(x, y, text, ignore = '\x07') {
    if (text instanceof Panel) return this.copyFrom(x, y, text.width, text.height, text);

    // normalize arguments

    const box = text instanceof Box ? text : new Box(text);
    let height = box.height;
    if (!height) return this;

    if (x < 0) x = 0;
    if (x >= this.width) return this;

    if (y < 0) y = 0;
    if (y >= this.height) return this;
    if (y + height > this.height) height = this.height - y;

    // copy characters
    let state = null;
    for (let i = 0; i < height; ++i) {
      const row = this.box[y + i],
        s = box.box[i];
      let start = 0,
        pos = 0;
      if (!state) {
        state = x > 0 ? (row[x - 1] ? row[x - 1].state : RESET_STATE) : {};
      }
      matchCsi.lastIndex = 0;
      for (const match of s.matchAll(matchCsi)) {
        const str = [...s.substring(start, match.index)];
        for (let j = 0; j < str.length; ++j, ++pos) {
          if (x + pos >= row.length) break;
          row[x + pos] = str[j] === ignore ? null : {symbol: str[j], state};
        }
        start = match.index + match[0].length;
        if (match[3] !== 'm') continue;
        state = addCommandsToState(state, match[1].split(';'));
      }
      const str = [...s.substring(start)];
      for (let j = 0; j < str.length; ++j, ++pos) {
        if (x + pos >= row.length) break;
        row[x + pos] = str[j] === ignore ? null : {symbol: str[j], state};
      }
      if (x + pos < row.length) {
        const cell = row[x + pos];
        if (cell) cell.state = combineStates(state, cell.state);
      }
    }

    return this;
  }

  fillFn(x, y, width, height, fn) {
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

    // fill cells
    for (let i = 0; i < height; ++i) {
      const row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        const cell = row[x + j],
          newCell = fn(x + j, y + i, cell);
        if (newCell !== undefined) row[x + j] = newCell;
      }
    }

    return this;
  }

  fill(x, y, width, height, symbol, state = {}) {
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    }
    return this.fillFn(x, y, width, height, () => ({symbol, state}));
  }

  fillState(x, y, width, height, state = {}, ignore = ' ') {
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    }
    return this.fillFn(x, y, width, height, (x, y, cell) => ({symbol: cell ? cell.symbol : ignore, state}));
  }

  fillNonEmptyState(x, y, width, height, state = {}) {
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    }
    return this.fillFn(x, y, width, height, (x, y, cell) => cell && {symbol: cell.symbol, state});
  }

  combineStateBefore(x, y, width, height, state = {}, ignore = ' ') {
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    }
    return this.fillFn(x, y, width, height, (x, y, cell) => ({
      symbol: cell ? cell.symbol : ignore,
      state: combineStates(state, cell ? cell.state : RESET_STATE)
    }));
  }

  combineState(x, y, width, height, state = {}, ignore = ' ') {
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    }
    return this.fillFn(x, y, width, height, (x, y, cell) => ({
      symbol: cell ? cell.symbol : ignore,
      state: combineStates(cell ? cell.state : RESET_STATE, state)
    }));
  }

  combineStateAfter(x, y, width, height, state, ignore) {
    return this.combineState(x, y, width, height, state, ignore);
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

    return this.fillFn(x, y, width, height, () => null);
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

  removeColumns(x, n) {
    // normalize arguments
    if (x < 0) {
      if (x + n <= 0) return this;
      n = x + n;
      x = 0;
    }
    if (n > this.width) n = this.width;

    for (const row of this.box) {
      row.splice(x, n);
    }
    this.width -= n;

    return this;
  }

  removeRows(y, n) {
    // normalize arguments
    if (y < 0) {
      if (y + n <= 0) return this;
      n = y + n;
      y = 0;
    }
    if (y > this.height) n = this.width;

    this.box.splice(y, n);
    this.height -= n;

    return this;
  }

  insertColumns(x, n) {
    // normalize arguments
    if (n <= 0) return this;
    if (x > this.width) x = this.width;
    else if (x < 0) x = 0;

    for (const row of this.box) {
      row.splice(x, 0, ...new Array(n).fill(null));
    }
    this.width += n;

    return this;
  }

  insertRows(y, n) {
    // normalize arguments
    if (n <= 0) return this;
    if (y > this.height) y = this.height;
    else if (y < 0) y = 0;

    this.box.splice(y, 0, ...new Array(n).fill(null));
    for (let i = 0; i < n; ++i) {
      row[y + i] = new Array(this.width).fill(null);
    }
    this.height += n;

    return this;
  }

  addRight(panel, alignment = 'top') {
    const diff = this.height - panel.height;

    if (alignment === 'bottom' || alignment === 'b') {
      if (diff >= 0) {
        for (let i = 0; i < diff; ++i) {
          this.box[i] = this.box[i].concat(new Array(panel.width).fill(null));
        }
        for (let i = diff; i < this.height; ++i) {
          this.box[i] = this.box[i].concat(panel.box[i - diff]);
        }
        return this;
      }
      const box = new Array(panel.height);
      for (let i = 0, n = -diff; i < n; ++i) {
        box[i] = new Array(panel.width).fill(null).concat().concat(panel.box[i]);
      }
      for (let i = -diff; i < panel.height; ++i) {
        box[i] = this.box[i + diff].concat(panel.box[i]);
      }
      this.box = box;
      return this;
    }

    if (alignment === 'top' || alignment === 't') {
      if (diff >= 0) {
        for (let i = 0; i < panel.height; ++i) {
          this.box[i] = this.box[i].concat(panel.box[i]);
        }
        for (let i = panel.height; i < this.height; ++i) {
          this.box[i] = this.box[i].concat(new Array(panel.width).fill(null));
        }
        return this;
      }
      const box = new Array(panel.height);
      for (let i = 0; i < this.height; ++i) {
        box[i] = this.box[i].concat(panel.box[i]);
      }
      for (let i = this.height; i < panel.height; ++i) {
        box[i] = new Array(panel.width).fill(null).concat().concat(panel.box[i]);
      }
      this.box = box;
      return this;
    }

    // alignment === 'center'

    if (diff >= 0) {
      const half = diff >> 1;
      for (let i = 0; i < half; ++i) {
        this.box[i] = this.box[i].concat(new Array(panel.width).fill(null));
      }
      for (let i = 0; i < panel.height; ++i) {
        this.box[i + half] = this.box[i + half].concat(panel.box[i]);
      }
      for (let i = panel.height + half; i < this.height; ++i) {
        this.box[i] = this.box[i].concat(new Array(panel.width).fill(null));
      }
      return this;
    }

    const half = -diff >> 1,
      box = new Array(panel.height);
    for (let i = 0; i < half; ++i) {
      box[i] = new Array(panel.width).fill(null).concat(panel.box[i]);
    }
    for (let i = 0; i < this.height; ++i) {
      box[i + half] = this.box[i].concat(panel.box[i + half]);
    }
    for (let i = this.height + half; i < panel.height; ++i) {
      box[i] = new Array(panel.width).fill(null).concat(panel.box[i]);
    }
    this.box = box;
    return this;
  }

  addBottom(panel, alignment = 'left') {
    const diff = this.width - panel.width;

    if (alignment === 'left' || alignment === 'l') {
      if (diff >= 0) {
        this.box.splice(this.height, 0, ...panel.box.map(row => row.concat(new Array(diff).fill(null))));
        return this;
      }
      this.box = this.box.map(row => row.concat(new Array(diff).fill(null))).concat(panel.box);
      return this;
    }

    if (alignment === 'right' || alignment === 'r') {
      if (diff >= 0) {
        this.box.splice(this.height, 0, ...panel.box.map(row => new Array(diff).fill(null).concat(row)));
        return this;
      }
      this.box = this.box.map(row => new Array(diff).fill(null).concat(row)).concat(panel.box);
      return this;
    }

    // alignment === 'center'

    if (diff >= 0) {
      const half = diff >> 1;
      this.box.splice(
        this.height,
        0,
        ...panel.box.map(row => new Array(half).fill(null).concat(row, new Array(diff - half).fill(null)))
      );
      return this;
    }

    const half = -diff >> 1;
    this.box = this.box
      .map(row => new Array(half).fill(null).concat(row, new Array(-diff - half).fill(null)))
      .concat(panel.box);
    return this;
  }
}

export default Panel;
