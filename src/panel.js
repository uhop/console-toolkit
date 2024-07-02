import {matchCsi} from './ansi/csi.js';
import {
  RESET_STATE,
  combineStates,
  commandsToState,
  addCommandsToState,
  stateTransition,
  stateReverseTransition,
  stringifyCommands,
  optimize,
  toState
} from './ansi/sgr-state.js';
import parse from './strings/parse.js';
import split, {size} from './strings/split.js';
import Box from './box.js';
import {addAliases} from './meta.js';

export class Panel {
  constructor(width, height) {
    this.box = new Array(height);
    for (let i = 0; i < height; ++i) {
      this.box[i] = new Array(width).fill(null);
    }
  }

  get width() {
    return this.box.length && this.box[0].length;
  }

  get height() {
    return this.box.length;
  }

  static make(s, options) {
    main: for (;;) {
      switch (typeof s) {
        case 'function':
          for (let i = 0; i < 10 && typeof s == 'function'; ++i) s = s();
          if (typeof s == 'function') s = String(s);
          continue main;
        case 'object':
          if (s instanceof Panel) return s.clone();
          if (typeof s?.toPanel == 'function') return s.toPanel(options);
          break;
      }
      s = Box.make(s, options);
      break main;
    }

    const {emptySymbol = '\x07'} = options || {},
      panel = new Panel(s.width, s.height);
    panel.put(0, 0, s, emptySymbol);
    return panel;
  }

  toStrings({emptySymbol = ' ', emptyState = RESET_STATE} = {}) {
    if (!this.height || !this.width) return Box.makeBlank(this.width, this.height);
    emptyState = toState(emptyState);

    const s = new Array(this.height),
      emptyCell = {symbol: emptySymbol, state: emptyState};

    for (let i = 0; i < this.height; ++i) {
      const panelRow = this.box[i];
      let row = '',
        initState = {},
        state = initState;
      for (let j = 0; j < this.width; ++j) {
        const cell = panelRow[j] || emptyCell;
        if (cell.ignore) continue;
        const newState = combineStates(state, cell.state),
          commands = stateTransition(state, newState);
        row += stringifyCommands(commands) + cell.symbol;
        state = newState;
      }
      const commands = stateReverseTransition(initState, state);
      s[i] = optimize(row + stringifyCommands(commands), initState);
    }

    return s;
  }

  toBox(options) {
    return new Box(this.toStrings(options), true);
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
    if (x >= this.width) return new Panel(0, 0);
    if (x + width > this.width) {
      width = this.width - x;
    }

    if (y < 0) y = 0;
    if (y >= this.height) return new Panel(0, 0);
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
        const cell = row[x + j];
        panelRow[j] = cell && {...cell};
      }
    }

    return panel;
  }

  clone() {
    return this.extract();
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
        const cell = panelRow[x1 + j];
        row[x + j] = cell && {...cell};
      }
    }

    return this;
  }

  put(x, y, text, emptySymbol = '\x07') {
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
    let state = {};
    for (let i = 0; i < height; ++i) {
      const row = this.box[y + i],
        s = box.box[i];
      let pos = 0;
      matchCsi.lastIndex = 0;
      for (const {string, match} of parse(s, matchCsi)) {
        const {graphemes} = split(string);
        for (const grapheme of graphemes) {
          if (x + pos >= row.length) break;
          if (grapheme.symbol === emptySymbol) {
            row[x + pos] = null;
          } else {
            const cell = row[x + pos];
            row[x + pos] = {
              symbol: grapheme.symbol,
              state: cell && !cell.ignore ? combineStates(cell.state, state) : state
            };
          }
          ++pos;
          if (grapheme.width === 2) {
            if (x + pos < row.length) {
              row[x + pos] = {ignore: true};
              ++pos;
            } else {
              row[x + pos - 1] = null;
            }
          }
        }
        if (match && match[3] === 'm') state = addCommandsToState(state, match[1].split(';'));
      }
      if (x + pos < row.length) {
        const cell = row[x + pos];
        if (cell && !cell.ignore) row[x + pos] = {symbol: cell.symbol, state: combineStates(state, cell.state)};
      }
    }

    return this;
  }

  applyFn(x, y, width, height, fn) {
    // normalize arguments

    if (typeof x == 'function') {
      fn = x;
      x = 0;
      y = 0;
      width = this.width;
      height = this.height;
    } else {
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
    }

    // fill cells
    for (let i = 0; i < height; ++i) {
      const row = this.box[y + i];
      for (let j = 0; j < width; ++j) {
        const cell = row[x + j];
        if (cell?.ignore) continue;
        const newCell = fn(x + j, y + i, cell);
        if (newCell !== undefined) {
          if (cell) {
            const symbolWidth = size(cell.symbol);
            if (symbolWidth > 1 && x + j + 1 < row.length) row[x + j + 1] = null;
          }
          if (newCell) {
            const symbolWidth = size(newCell.symbol);
            if (symbolWidth > 1 && x + j + 1 < row.length) row[x + j + 1] = {ignore: true};
          }
          row[x + j] = newCell;
        }
      }
    }

    return this;
  }

  fill(x, y, width, height, symbol, state = {}) {
    if (typeof x === 'string') {
      symbol = x;
      state = y || {};
      y = 0;
      x = 0;
      width = this.width;
      height = this.height;
    }
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    } else {
      state = toState(state);
    }
    return this.applyFn(x, y, width, height, () => ({symbol, state}));
  }

  fillState(x, y, width, height, options) {
    if (typeof x === 'object') {
      options = x;
      x = 0;
      y = 0;
      width = this.width;
      height = this.height;
    }
    let {state = {}, emptySymbol = ' '} = options || {};
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    } else {
      state = toState(state);
    }
    return this.applyFn(x, y, width, height, (x, y, cell) => ({symbol: cell ? cell.symbol : emptySymbol, state}));
  }

  fillNonEmptyState(x, y, width, height, options) {
    if (typeof x === 'object') {
      options = x;
      x = 0;
      y = 0;
      width = this.width;
      height = this.height;
    }
    let {state = {}} = options || {};
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    } else {
      state = toState(state);
    }
    return this.applyFn(x, y, width, height, (x, y, cell) => cell && {symbol: cell.symbol, state});
  }

  combineStateBefore(x, y, width, height, options) {
    if (typeof x === 'object') {
      options = x;
      x = 0;
      y = 0;
      width = this.width;
      height = this.height;
    }
    let {state = {}, emptySymbol = ' ', emptyState = RESET_STATE} = options || {};
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    } else {
      state = toState(state);
    }
    return this.applyFn(x, y, width, height, (x, y, cell) =>
      cell
        ? {symbol: cell.symbol, state: combineStates(state, cell.state)}
        : {symbol: emptySymbol, state: combineStates(state, emptyState)}
    );
  }

  combineStateAfter(x, y, width, height, options) {
    if (typeof x === 'object') {
      options = x;
      x = 0;
      y = 0;
      width = this.width;
      height = this.height;
    }
    let {state = {}, emptySymbol = ' ', emptyState = RESET_STATE} = options || {};
    if (typeof state == 'string') {
      state = commandsToState(state.split(';'));
    } else if (Array.isArray(state)) {
      state = commandsToState(state);
    } else {
      state = toState(state);
    }
    return this.applyFn(x, y, width, height, (x, y, cell) =>
      cell
        ? {symbol: cell.symbol, state: combineStates(cell.state, state)}
        : {symbol: emptySymbol, state: combineStates(emptyState, state)}
    );
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

    return this.applyFn(x, y, width, height, () => null);
  }

  padLeft(n) {
    if (n <= 0) return this;

    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i],
        padding = new Array(n).fill(null);
      this.box[i] = row ? padding.concat(row) : padding;
    }
    return this;
  }

  padRight(n) {
    if (n <= 0) return this;

    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i],
        padding = new Array(n).fill(null);
      this.box[i] = row ? row.concat(padding) : padding;
    }
    return this;
  }

  padLeftRight(n, m) {
    if (n <= 0) return this.padRight(m);
    if (m <= 0) return this.padLeft(n);

    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i];
      this.box[i] = row ? new Array(n).fill(null).concat(row, new Array(m).fill(null)) : new Array(n + m).fill(null);
    }
    return this;
  }

  padTop(n) {
    if (n <= 0) return this;

    const pad = new Array(n);
    for (let i = 0; i < n; ++i) pad[i] = new Array(this.width).fill(null);
    this.box = pad.concat(this.box);

    return this;
  }

  padBottom(n) {
    if (n <= 0) return this;

    const pad = new Array(n);
    for (let i = 0; i < n; ++i) pad[i] = new Array(this.width).fill(null);
    this.box = this.box.concat(pad);

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
    for (let i = 0; i < m; ++i) bottom[i] = new Array(this.width).fill(null);
    this.box = top.concat(this.box, bottom);

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
      n = Math.max(0, x + n);
      x = 0;
    }
    if (n <= 0) return this;

    for (const row of this.box) row.splice(x, n);
    return this;
  }

  removeRows(y, n) {
    // normalize arguments
    if (y < 0) {
      if (y + n <= 0) return this;
      n = Math.max(0, y + n);
      y = 0;
    }
    if (n <= 0) return this;

    this.box.splice(y, n);
    return this;
  }

  resizeH(newWidth, align = 'right') {
    if (!this.width) return this.padRight(newWidth);

    const diff = newWidth - this.width;
    switch (align) {
      case 'left':
      case 'l':
        return diff < 0 ? this.removeColumns(0, -diff) : this.padLeft(diff);
      case 'center':
      case 'c': {
        const half = Math.abs(diff) >> 1;
        return diff < 0
          ? this.removeColumns(0, half).removeColumns(newWidth, half + 1)
          : this.padLeft(half).padRight(diff - half);
      }
    }
    // right
    return diff < 0 ? this.removeColumns(newWidth, -diff) : this.padRight(diff);
  }

  resizeV(newHeight, align = 'bottom') {
    if (!this.height) return this.padBottom(newHeight);

    const diff = newHeight - this.height;
    switch (align) {
      case 'top':
      case 't':
        return diff < 0 ? this.removeRows(0, -diff) : this.padTop(diff);
      case 'center':
      case 'c': {
        const half = Math.abs(diff) >> 1;
        return diff < 0
          ? this.removeRows(0, half).removeRows(newHeight, half + 1)
          : this.padTop(half).padBottom(diff - half);
      }
    }
    // bottom
    return diff < 0 ? this.removeRows(newHeight, -diff) : this.padBottom(diff);
  }

  resize(newWidth, newHeight, horizontal = 'right', vertical = 'bottom') {
    if (!this.height) return this.padBottom(newHeight).padRight(newWidth);

    return newHeight < this.height
      ? this.resizeV(newHeight, vertical).resizeH(newWidth, horizontal)
      : this.resizeH(newWidth, horizontal).resizeV(newHeight, vertical);
  }

  insertColumns(x, n) {
    // normalize arguments
    if (n <= 0) return this;
    if (x > this.width) x = this.width;
    else if (x < 0) x = 0;

    for (const row of this.box) row.splice(x, 0, ...new Array(n).fill(null));
    return this;
  }

  insertRows(y, n) {
    // normalize arguments
    if (n <= 0) return this;
    if (y > this.height) y = this.height;
    else if (y < 0) y = 0;

    this.box.splice(y, 0, ...new Array(n).fill(null));
    for (let i = 0; i < n; ++i) this.box[y + i] = new Array(this.width).fill(null);
    return this;
  }

  addBottom(panel, {align = 'left'} = {}) {
    panel = panel.clone();

    const diff = this.width - panel.width;

    if (align === 'left' || align === 'l') {
      if (diff >= 0) {
        this.box.splice(this.height, 0, ...panel.box.map(row => row.concat(new Array(diff).fill(null))));
        return this;
      }
      this.box = this.box.map(row => row.concat(new Array(-diff).fill(null))).concat(panel.box);
      return this;
    }

    if (align === 'right' || align === 'r') {
      if (diff >= 0) {
        this.box.splice(this.height, 0, ...panel.box.map(row => new Array(diff).fill(null).concat(row)));
        return this;
      }
      this.box = this.box.map(row => new Array(-diff).fill(null).concat(row)).concat(panel.box);
      return this;
    }

    // align === 'center'

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

  addRight(panel, {align = 'top'} = {}) {
    panel = panel.clone();

    const diff = this.height - panel.height;

    if (align === 'bottom' || align === 'b') {
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
        box[i] = new Array(this.width).fill(null).concat(panel.box[i]);
      }
      for (let i = -diff; i < panel.height; ++i) {
        box[i] = this.box[i + diff].concat(panel.box[i]);
      }
      this.box = box;
      return this;
    }

    if (align === 'top' || align === 't') {
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
        box[i] = new Array(this.width).fill(null).concat(panel.box[i]);
      }
      this.box = box;
      return this;
    }

    // align === 'center'

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
      box[i] = new Array(this.width).fill(null).concat(panel.box[i]);
    }
    for (let i = 0; i < this.height; ++i) {
      box[i + half] = this.box[i].concat(panel.box[i + half]);
    }
    for (let i = this.height + half; i < panel.height; ++i) {
      box[i] = new Array(this.width).fill(null).concat(panel.box[i]);
    }
    this.box = box;
    return this;
  }

  transpose() {
    const panel = new Panel(this.height, this.width);
    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i];
      for (let j = 0; j < this.width; ++j) {
        const cell = row[j];
        panel.box[j][i] = cell && {...cell};
      }
    }
    return panel;
  }

  rotateRight() {
    const panel = new Panel(this.height, this.width);
    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i];
      for (let j = 0; j < this.width; ++j) {
        const cell = row[j];
        panel.box[j][this.height - i - 1] = cell && {...cell};
      }
    }
    return panel;
  }

  rotateLeft() {
    const panel = new Panel(this.height, this.width);
    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i];
      for (let j = 0; j < this.width; ++j) {
        const cell = row[j];
        panel.box[this.width - j - 1][i] = cell && {...cell};
      }
    }
    return panel;
  }

  flipH() {
    for (const row of this.box) row.reverse();
    return this;
  }

  flipV() {
    this.box.reverse();
    return this;
  }
}

addAliases(Panel, {combineState: 'combineStateAfter', toPanel: 'clone'});

export const toPanel = Panel.make;

export default Panel;
