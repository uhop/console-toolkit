import {addAlias} from './meta.js';
import {getLength, clipStrings, toStrings} from './strings.js';

/** A rectangular text container where all strings have equal display width.
 * Provides methods for padding, stacking, clipping, and flipping.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-box}
 */
export class Box {
  /** Creates a new Box.
   * @param {Box|string|string[]|*} s - Input data. If a Box, it is copied. If `normalized` is true, the array is used as-is.
   * @param {boolean} [normalized=false] - If true, assumes strings are already equal width and takes ownership of the array.
   */
  constructor(s, normalized) {
    if (s instanceof Box) {
      this.box = [...s.box]; // copy
    } else {
      this.box = Array.isArray(s) && normalized ? s : Box.make(s).box;
    }
  }

  /** The display width of the box (length of the first string, or 0 if empty). */
  get width() {
    return this.box.length ? getLength(this.box[0]) : 0;
  }
  /** The number of rows in the box. */
  get height() {
    return this.box.length;
  }

  /** Creates a Box from various input types.
   * @param {*} s - Input: Box, object with toBox()/toPanel(), function, string, array, etc.
   * @param {object} [options] - Options.
   * @param {string} [options.symbol=' '] - The padding character.
   * @param {'left'|'l'|'right'|'r'|'center'|'c'} [options.align='left'] - Alignment for shorter strings.
   * @returns {Box} A new Box instance.
   */
  static make(s, options) {
    main: for (;;) {
      switch (typeof s) {
        case 'function':
          for (let i = 0; i < 10 && typeof s == 'function'; ++i) s = s();
          if (typeof s == 'function') s = String(s);
          continue main;
        case 'object':
          if (s instanceof Box) return s.clone();
          if (typeof s?.toBox == 'function') return s.toBox(options);
          if (typeof s?.toPanel == 'function') return s.toPanel().toBox(options);
          break;
      }
      s = toStrings(s);
      break main;
    }

    if (s.length <= 1) return new Box(s, true);

    const {symbol = ' ', align = 'left'} = options || {},
      widths = s.map(s => getLength(s)),
      width = widths.reduce((a, b) => (a > b ? a : b), 0);
    switch (align) {
      case 'left':
      case 'l':
        return new Box(
          s.map((s, i) => s + symbol.repeat(width - widths[i])),
          true
        );
      case 'right':
      case 'r':
        return new Box(
          s.map((s, i) => symbol.repeat(width - widths[i]) + s),
          true
        );
    }
    // center
    return new Box(
      s.map((s, i) => {
        const n = width - widths[i];
        if (!n) return s;
        const half = n >> 1,
          padding = symbol.repeat(half);
        return padding + s + padding + (n & 1 ? symbol : '');
      }),
      true
    );
  }

  /** Creates a blank Box filled with a symbol.
   * @param {number} width - The width of the box.
   * @param {number} height - The height of the box.
   * @param {string} [symbol=' '] - The fill character.
   * @returns {Box} A new blank Box.
   */
  static makeBlank(width, height, symbol = ' ') {
    return new Box(height <= 0 ? [] : new Array(height).fill(symbol.repeat(width)), true);
  }

  /** Returns the underlying array of strings.
   * @returns {string[]} The box content.
   */
  toStrings() {
    return this.box;
  }

  /** Creates a shallow copy of this Box.
   * @returns {Box} A new Box with the same content.
   */
  clone() {
    return new Box(this);
  }

  /** Clips all strings to a given display width.
   * @param {number} width - The maximum display width.
   * @param {object} [options] - Options passed to `clip()`.
   * @returns {Box} A new clipped Box.
   */
  clip(width, options) {
    return Box.make(clipStrings(this.box, width, options));
  }

  // padding

  /** Pads the box on both left and right sides.
   * @param {number} left - Left padding amount.
   * @param {number} right - Right padding amount.
   * @param {string} [symbol=' '] - The padding character.
   * @returns {Box} A new padded Box.
   */
  padLeftRight(left, right, symbol = ' ') {
    const paddingLeft = symbol.repeat(left),
      paddingRight = symbol.repeat(right);
    return new Box(
      this.box.map(s => paddingLeft + s + paddingRight),
      true
    );
  }

  /** Pads the box on both top and bottom sides.
   * @param {number} top - Top padding amount (number of rows).
   * @param {number} bottom - Bottom padding amount (number of rows).
   * @param {string} [symbol=' '] - The padding character.
   * @returns {Box} A new padded Box.
   */
  padTopBottom(top, bottom, symbol = ' ') {
    const padding = symbol.repeat(this.width);
    return new Box([...new Array(top).fill(padding), ...this.box, ...new Array(bottom).fill(padding)], true);
  }

  /** Pads the box on the right side.
   * @param {number} n - Right padding amount.
   * @param {string} [symbol=' '] - The padding character.
   * @returns {Box} A new padded Box.
   */
  padRight(n, symbol = ' ') {
    const padding = symbol.repeat(n);
    return new Box(
      this.box.map(s => s + padding),
      true
    );
  }

  /** Pads the box on the left side.
   * @param {number} n - Left padding amount.
   * @param {string} [symbol=' '] - The padding character.
   * @returns {Box} A new padded Box.
   */
  padLeft(n, symbol = ' ') {
    const padding = symbol.repeat(n);
    return new Box(
      this.box.map(s => padding + s),
      true
    );
  }

  /** Pads the box on the top side.
   * @param {number} n - Top padding amount (number of rows).
   * @param {string} [symbol=' '] - The padding character.
   * @returns {Box} A new padded Box.
   */
  padTop(n, symbol = ' ') {
    const padding = symbol.repeat(this.width);
    return new Box([...new Array(n).fill(padding), ...this.box], true);
  }

  /** Pads the box on the bottom side.
   * @param {number} n - Bottom padding amount (number of rows).
   * @param {string} [symbol=' '] - The padding character.
   * @returns {Box} A new padded Box.
   */
  padBottom(n, symbol = ' ') {
    const padding = symbol.repeat(this.width);
    return new Box([...this.box, ...new Array(n).fill(padding)], true);
  }

  /** Pads the box on all sides (CSS padding order: top, right, bottom, left).
   * - `pad(t)` → equal padding on all sides.
   * - `pad(t, r)` → top/bottom = t, left/right = r.
   * - `pad(t, r, b)` → top = t, left/right = r, bottom = b.
   * - `pad(t, r, b, l)` → individual padding.
   * @param {number} t - Top padding.
   * @param {number|string} [r] - Right padding or symbol.
   * @param {number|string} [b] - Bottom padding or symbol.
   * @param {number|string} [l] - Left padding or symbol.
   * @param {string} [symbol=' '] - The padding character.
   * @returns {Box} A new padded Box.
   */
  pad(t, r, b, l, symbol = ' ') {
    // implemented the CSS padding order
    if (typeof r != 'number') {
      symbol = r || symbol;
      r = b = l = t;
    } else if (typeof b != 'number') {
      symbol = b || symbol;
      l = r;
      b = t;
    } else if (typeof l != 'number') {
      symbol = l || symbol;
      l = r;
    }
    return this.padLeftRight(l, r, symbol).padTopBottom(t, b, symbol);
  }

  // removing

  /** Removes rows from the box.
   * @param {number} y - The starting row index.
   * @param {number} n - The number of rows to remove.
   * @returns {Box} A new Box with rows removed.
   */
  removeRows(y, n) {
    const result = [...this.box];
    result.splice(y, n);
    return new Box(result, true);
  }

  // stack

  /** Stacks another box below this one.
   * @param {*} box - The box to add at the bottom.
   * @param {object} [options] - Options.
   * @param {string} [options.symbol=' '] - The padding character for width alignment.
   * @param {'left'|'l'|'right'|'r'|'center'|'c'} [options.align='left'] - Horizontal alignment if widths differ.
   * @returns {Box} A new combined Box.
   */
  addBottom(box, {symbol = ' ', align = 'left'} = {}) {
    let a = this,
      b = toBox(box);
    const diff = a.width - b.width;
    if (diff) {
      const d = Math.abs(diff);
      let x = diff < 0 ? a : b;
      switch (align) {
        case 'left':
        case 'l':
          x = x.padRight(d, symbol);
          break;
        case 'right':
        case 'r':
          x = x.padLeft(d, symbol);
          break;
        default: // center
          const half = d >> 1;
          x = x.padLeftRight(half, half + (d & 1 ? 1 : 0), symbol);
          break;
      }
      a = diff < 0 ? x : a;
      b = diff < 0 ? b : x;
    }
    return new Box([...a.box, ...b.box], true);
  }

  /** Stacks another box to the right of this one.
   * @param {*} box - The box to add on the right.
   * @param {object} [options] - Options.
   * @param {string} [options.symbol=' '] - The padding character for height alignment.
   * @param {'top'|'t'|'bottom'|'b'|'center'|'c'} [options.align='top'] - Vertical alignment if heights differ.
   * @returns {Box} A new combined Box.
   */
  addRight(box, {symbol = ' ', align = 'top'} = {}) {
    box = toBox(box);
    const ah = this.height,
      bh = box.height;
    if (ah == bh)
      return new Box(
        this.box.map((s, i) => s + box.box[i]),
        true
      );

    let t = 0,
      b = 0;
    const diff = Math.abs(ah - bh);
    switch (align) {
      case 'top':
      case 't':
        t = 0;
        b = diff;
        break;
      case 'bottom':
      case 'b':
        t = diff;
        b = 0;
        break;
      default: // center
        const half = diff >> 1;
        t = half;
        b = half + (diff & 1 ? 1 : 0);
        break;
    }

    const result = [];

    if (ah < bh) {
      const padding = symbol.repeat(this.width);
      for (let i = 0; i < t; ++i) {
        result.push(padding + box.box[i]);
      }
      for (let i = 0; i < ah; ++i) {
        result.push(this.box[i] + box.box[i + t]);
      }
      for (let i = ah + t; i < bh; ++i) {
        result.push(padding + box.box[i]);
      }
    } else {
      const padding = symbol.repeat(box.width);
      for (let i = 0; i < t; ++i) {
        result.push(this.box[i] + padding);
      }
      for (let i = 0; i < bh; ++i) {
        result.push(this.box[i + t] + box.box[i]);
      }
      for (let i = bh + t; i < ah; ++i) {
        result.push(this.box[i] + padding);
      }
    }

    return new Box(result, true);
  }

  // flipping

  /** Flips the box vertically (reverses the row order).
   * @returns {Box} A new vertically flipped Box.
   */
  flipV() {
    return new Box(this.box.toReversed(), true);
  }
}

addAlias(Box, 'toBox', 'clone');

/** Alias for `Box.make()`. Converts its argument to a Box.
 * @type {typeof Box.make}
 */
export const toBox = Box.make;

export default Box;
