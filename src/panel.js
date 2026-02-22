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

/** A 2D array of cells, where each cell has a character symbol and an SGR state.
 * Provides methods for manipulation, styling, geometric transforms, and conversion to Box/strings.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-panel}
 */
export class Panel {
  /** Creates an empty Panel of the given dimensions.
   * @param {number} width - Width in columns.
   * @param {number} height - Height in rows.
   */
  constructor(width, height) {
    this.box = new Array(height);
    for (let i = 0; i < height; ++i) {
      this.box[i] = new Array(width).fill(null);
    }
  }

  /** The width of the panel in columns. */
  get width() {
    return this.box.length && this.box[0].length;
  }

  /** The height of the panel in rows. */
  get height() {
    return this.box.length;
  }

  /** Creates a Panel from various input types (Panel, Box, string, string[], function).
   * @param {*} s - Input data.
   * @param {object} [options] - Options passed to Box.make() or put().
   * @returns {Panel}
   */
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

    const panel = new Panel(s.width, s.height);
    panel.put(0, 0, s, options);
    return panel;
  }

  /** Converts the panel to an array of strings with embedded ANSI escape sequences.
   * @param {object} [options] - Options.
   * @param {string} [options.emptySymbol=' '] - Character for empty cells.
   * @param {object} [options.emptyState] - SGR state for empty cells.
   * @returns {string[]}
   */
  toStrings(options = {}) {
    if (!this.height || !this.width) return Box.makeBlank(this.width, this.height);

    let {emptySymbol = ' ', emptyState = RESET_STATE} = options;
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

  /** Converts the panel to a Box.
   * @param {object} [options] - Options passed to toStrings().
   * @returns {import('./box.js').Box}
   */
  toBox(options) {
    return new Box(this.toStrings(options), true);
  }

  /** Extracts a rectangular region as a new Panel.
   * @param {number} [x=0] - Left column.
   * @param {number} [y=0] - Top row.
   * @param {number} [width] - Width (defaults to panel width).
   * @param {number} [height] - Height (defaults to panel height).
   * @returns {Panel}
   */
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

  /** Creates a deep copy of this panel.
   * @returns {Panel}
   */
  clone() {
    return this.extract();
  }

  /** Copies cells from another panel into this panel.
   * @param {number} x - Destination x.
   * @param {number} y - Destination y.
   * @param {number} width - Width to copy.
   * @param {number} height - Height to copy.
   * @param {Panel} panel - Source panel.
   * @param {number} [x1=0] - Source x.
   * @param {number} [y1=0] - Source y.
   * @returns {this}
   */
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

  /** Places text onto this panel at the given position. Characters matching `emptySymbol` (default: '\x07' BELL) are treated as empty cells.
   * @param {number} x - Left column.
   * @param {number} y - Top row.
   * @param {Panel|import('./box.js').Box|string|string[]} text - Content to place.
   * @param {object} [options] - Put options.
   * @param {string} [options.emptySymbol='\x07'] - Character treated as an empty cell.
   * @returns {this}
   */
  put(x, y, text, options = {}) {
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

    const {emptySymbol = '\x07'} = options;

    // copy characters
    let state = {};
    for (let i = 0; i < height; ++i) {
      const row = this.box[y + i],
        s = box.box[i];
      let pos = 0;
      matchCsi.lastIndex = 0;
      for (const {string, match} of parse(s, matchCsi)) {
        const {graphemes} = split(string, options);
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

  /** Applies a function to each cell in a rectangular region.
   * @param {number|Function} x - Left column, or the function if called with a single argument.
   * @param {number} [y] - Top row.
   * @param {number} [width] - Width.
   * @param {number} [height] - Height.
   * @param {Function} [fn] - Function `(x, y, cell) => newCell`.
   * @param {object} [options] - Options.
   * @returns {this}
   */
  applyFn(x, y, width, height, fn, options) {
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
            const symbolWidth = size(cell.symbol, options);
            if (symbolWidth > 1 && x + j + 1 < row.length) row[x + j + 1] = null;
          }
          if (newCell) {
            const symbolWidth = size(newCell.symbol, options);
            if (symbolWidth > 1 && x + j + 1 < row.length) row[x + j + 1] = {ignore: true};
          }
          row[x + j] = newCell;
        }
      }
    }

    return this;
  }

  /** Fills a rectangular region with a symbol and state.
   * @param {number|string} x - Left column, or symbol if filling the entire panel.
   * @param {number} [y] - Top row.
   * @param {number} [width] - Width.
   * @param {number} [height] - Height.
   * @param {string} [symbol] - Fill character.
   * @param {object|string|string[]} [state={}] - SGR state.
   * @param {object} [options] - Options.
   * @returns {this}
   */
  fill(x, y, width, height, symbol, state = {}, options) {
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
    return this.applyFn(x, y, width, height, () => ({symbol, state}), options);
  }

  /** Fills all cells with the given state, using `emptySymbol` for empty cells' symbol.
   * @param {number|object} x - Left column, or options if filling the entire panel.
   * @param {number} [y] - Top row.
   * @param {number} [width] - Width.
   * @param {number} [height] - Height.
   * @param {object} [options] - Options with `state` and `emptySymbol`.
   * @returns {this}
   */
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
    return this.applyFn(
      x,
      y,
      width,
      height,
      (x, y, cell) => ({symbol: cell ? cell.symbol : emptySymbol, state}),
      options
    );
  }

  /** Fills state only for non-empty cells in a region.
   * @param {number|object} x - Left column, or options if filling the entire panel.
   * @param {number} [y] - Top row.
   * @param {number} [width] - Width.
   * @param {number} [height] - Height.
   * @param {object} [options] - Options with `state`.
   * @returns {this}
   */
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
    return this.applyFn(x, y, width, height, (x, y, cell) => cell && {symbol: cell.symbol, state}, options);
  }

  /** Combines a state before existing cell states (applied state acts as a base that cells override).
   * @param {number|object} x - Left column, or options if filling the entire panel.
   * @param {number} [y] - Top row.
   * @param {number} [width] - Width.
   * @param {number} [height] - Height.
   * @param {object} [options] - Options with `state`, `emptySymbol`, `emptyState`.
   * @returns {this}
   */
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
    return this.applyFn(
      x,
      y,
      width,
      height,
      (x, y, cell) =>
        cell
          ? {symbol: cell.symbol, state: combineStates(state, cell.state)}
          : {symbol: emptySymbol, state: combineStates(state, emptyState)},
      options
    );
  }

  /** Combines a state after existing cell states (applied state overrides cell properties).
   * @param {number|object} x - Left column, or options if filling the entire panel.
   * @param {number} [y] - Top row.
   * @param {number} [width] - Width.
   * @param {number} [height] - Height.
   * @param {object} [options] - Options with `state`, `emptySymbol`, `emptyState`.
   * @returns {this}
   */
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
    return this.applyFn(
      x,
      y,
      width,
      height,
      (x, y, cell) =>
        cell
          ? {symbol: cell.symbol, state: combineStates(cell.state, state)}
          : {symbol: emptySymbol, state: combineStates(emptyState, state)},
      options
    );
  }

  /** Clears (nullifies) cells in a rectangular region.
   * @param {number} [x=0] - Left column.
   * @param {number} [y=0] - Top row.
   * @param {number} [width] - Width.
   * @param {number} [height] - Height.
   * @param {object} [options] - Options.
   * @returns {this}
   */
  clear(x, y, width, height, options) {
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

    return this.applyFn(x, y, width, height, () => null, options);
  }

  /** Pads the left side with `n` empty columns.
   * @param {number} n
   * @returns {this}
   */
  padLeft(n) {
    if (n <= 0) return this;

    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i],
        padding = new Array(n).fill(null);
      this.box[i] = row ? padding.concat(row) : padding;
    }
    return this;
  }

  /** Pads the right side with `n` empty columns.
   * @param {number} n
   * @returns {this}
   */
  padRight(n) {
    if (n <= 0) return this;

    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i],
        padding = new Array(n).fill(null);
      this.box[i] = row ? row.concat(padding) : padding;
    }
    return this;
  }

  /** Pads left and right sides with empty cells.
   * @param {number} n - Left columns.
   * @param {number} m - Right columns.
   * @returns {this}
   */
  padLeftRight(n, m) {
    if (n <= 0) return this.padRight(m);
    if (m <= 0) return this.padLeft(n);

    for (let i = 0; i < this.height; ++i) {
      const row = this.box[i];
      this.box[i] = row ? new Array(n).fill(null).concat(row, new Array(m).fill(null)) : new Array(n + m).fill(null);
    }
    return this;
  }

  /** Pads the top with `n` empty rows.
   * @param {number} n
   * @returns {this}
   */
  padTop(n) {
    if (n <= 0) return this;

    const pad = new Array(n);
    for (let i = 0; i < n; ++i) pad[i] = new Array(this.width).fill(null);
    this.box = pad.concat(this.box);

    return this;
  }

  /** Pads the bottom with `n` empty rows.
   * @param {number} n
   * @returns {this}
   */
  padBottom(n) {
    if (n <= 0) return this;

    const pad = new Array(n);
    for (let i = 0; i < n; ++i) pad[i] = new Array(this.width).fill(null);
    this.box = this.box.concat(pad);

    return this;
  }

  /** Pads top and bottom with empty rows.
   * @param {number} n - Top rows.
   * @param {number} m - Bottom rows.
   * @returns {this}
   */
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

  /** Pads the panel using CSS-style shorthand (top, right, bottom, left).
   * @param {number} t - Top (or all sides if only argument).
   * @param {number} [r] - Right.
   * @param {number} [b] - Bottom.
   * @param {number} [l] - Left.
   * @returns {this}
   */
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

  /** Removes `n` columns starting at column `x`.
   * @param {number} x - Start column.
   * @param {number} n - Number of columns to remove.
   * @returns {this}
   */
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

  /** Removes `n` rows starting at row `y`.
   * @param {number} y - Start row.
   * @param {number} n - Number of rows to remove.
   * @returns {this}
   */
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

  /** Resizes the panel horizontally.
   * @param {number} newWidth - New width.
   * @param {'left'|'center'|'right'} [align='right'] - Alignment when adding/removing columns.
   * @returns {this}
   */
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
          ? this.removeColumns(0, half).removeColumns(newWidth, -diff - half)
          : this.padLeft(half).padRight(diff - half);
      }
    }
    // right
    return diff < 0 ? this.removeColumns(newWidth, -diff) : this.padRight(diff);
  }

  /** Resizes the panel vertically.
   * @param {number} newHeight - New height.
   * @param {'top'|'center'|'bottom'} [align='bottom'] - Alignment when adding/removing rows.
   * @returns {this}
   */
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
          ? this.removeRows(0, half).removeRows(newHeight, -diff - half)
          : this.padTop(half).padBottom(diff - half);
      }
    }
    // bottom
    return diff < 0 ? this.removeRows(newHeight, -diff) : this.padBottom(diff);
  }

  /** Resizes the panel in both dimensions.
   * @param {number} newWidth - New width.
   * @param {number} newHeight - New height.
   * @param {'left'|'center'|'right'} [horizontal='right'] - Horizontal alignment.
   * @param {'top'|'center'|'bottom'} [vertical='bottom'] - Vertical alignment.
   * @returns {this}
   */
  resize(newWidth, newHeight, horizontal = 'right', vertical = 'bottom') {
    if (!this.height) return this.padBottom(newHeight).padRight(newWidth);

    return newHeight < this.height
      ? this.resizeV(newHeight, vertical).resizeH(newWidth, horizontal)
      : this.resizeH(newWidth, horizontal).resizeV(newHeight, vertical);
  }

  /** Inserts `n` empty columns at position `x`.
   * @param {number} x - Insert position.
   * @param {number} n - Number of columns.
   * @returns {this}
   */
  insertColumns(x, n) {
    // normalize arguments
    if (n <= 0) return this;
    if (x > this.width) x = this.width;
    else if (x < 0) x = 0;

    const padding = new Array(n).fill(null);
    for (const row of this.box) row.splice(x, 0, ...padding);
    return this;
  }

  /** Inserts `n` empty rows at position `y`.
   * @param {number} y - Insert position.
   * @param {number} n - Number of rows.
   * @returns {this}
   */
  insertRows(y, n) {
    // normalize arguments
    if (n <= 0) return this;
    if (y > this.height) y = this.height;
    else if (y < 0) y = 0;

    const rows = new Array(n);
    for (let i = 0; i < n; ++i) rows[i] = new Array(this.width).fill(null);
    this.box.splice(y, 0, ...rows);
    return this;
  }

  /** Appends another panel below this one.
   * @param {Panel} panel - Panel to append.
   * @param {object} [options] - Options.
   * @param {'left'|'center'|'right'} [options.align='left'] - Horizontal alignment.
   * @returns {this}
   */
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

  /** Appends another panel to the right of this one.
   * @param {Panel} panel - Panel to append.
   * @param {object} [options] - Options.
   * @param {'top'|'center'|'bottom'} [options.align='top'] - Vertical alignment.
   * @returns {this}
   */
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

  /** Returns a new Panel that is the transpose of this one (rows become columns).
   * @returns {Panel}
   */
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

  /** Returns a new Panel rotated 90° clockwise.
   * @returns {Panel}
   */
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

  /** Returns a new Panel rotated 90° counter-clockwise.
   * @returns {Panel}
   */
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

  /** Flips the panel horizontally (mirrors left-right) in place.
   * @returns {this}
   */
  flipH() {
    for (const row of this.box) row.reverse();
    return this;
  }

  /** Flips the panel vertically (mirrors top-bottom) in place.
   * @returns {this}
   */
  flipV() {
    this.box.reverse();
    return this;
  }
}

addAliases(Panel, {combineState: 'combineStateAfter', toPanel: 'clone'});

/** Alias for `Panel.make()`. Creates a Panel from various input types.
 * @type {typeof Panel.make}
 */
export const toPanel = Panel.make;

export default Panel;
