import {addAlias} from './meta.js';
import {getLength, clipStrings, toStrings} from './strings.js';

export class Box {
  constructor(s, normalized) {
    if (s instanceof Box) {
      this.box = [...s.box]; // copy
    } else {
      this.box = Array.isArray(s) && normalized ? s : Box.make(s).box;
    }
  }

  get width() {
    return this.box.length ? getLength(this.box[0]) : 0;
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
      width = Math.max(0, ...widths);
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

  static makeBlank(width, height, symbol = ' ') {
    return new Box(height <= 0 ? [] : new Array(height).fill(symbol.repeat(width)), true);
  }

  toStrings() {
    return this.box;
  }

  clone() {
    return new Box(this);
  }

  clip(width, options) {
    return Box.make(clipStrings(this.box, width, options));
  }

  // padding

  padLeftRight(left, right, symbol = ' ') {
    const paddingSmall = symbol.repeat(Math.min(left, right)),
      paddingLarge = paddingSmall + symbol.repeat(Math.max(left - right, right - left));
    return new Box(
      left < right
        ? this.box.map(s => paddingSmall + s + paddingLarge)
        : this.box.map(s => paddingLarge + s + paddingSmall),
      true
    );
  }

  padTopBottom(top, bottom, symbol = ' ') {
    const padding = symbol.repeat(this.width);
    return new Box([...new Array(top).fill(padding), ...this.box, ...new Array(bottom).fill(padding)], true);
  }

  padRight(n, symbol = ' ') {
    const padding = symbol.repeat(n);
    return new Box(
      this.box.map(s => s + padding),
      true
    );
  }

  padLeft(n, symbol = ' ') {
    const padding = symbol.repeat(n);
    return new Box(
      this.box.map(s => padding + s),
      true
    );
  }

  padTop(n, symbol = ' ') {
    const padding = symbol.repeat(this.width);
    return new Box([...new Array(n).fill(padding), ...this.box], true);
  }

  padBottom(n, symbol = ' ') {
    const padding = symbol.repeat(this.width);
    return new Box([...this.box, ...new Array(n).fill(padding)], true);
  }

  pad(t, r, b, l, symbol = ' ') {
    // implemented the CSS padding order
    if (typeof r != 'number') {
      symbol = r;
      r = b = l = t;
    } else if (typeof b != 'number') {
      symbol = b;
      l = r;
      b = t;
    } else if (typeof l != 'number') {
      symbol = l;
      l = r;
    }
    return this.padLeftRight(l, r, symbol).padTopBottom(t, b, symbol);
  }

  // removing

  removeRows(y, n) {
    const result = [...this.box];
    result.splice(y, n);
    return new Box(result, true);
  }

  // stack

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
          x = x.padLeftRight(half, half + (d & 1 ? 1 : 0));
          break;
      }
      a = diff < 0 ? x : a;
      b = diff < 0 ? b : x;
    }
    return new Box([...a.box, ...b.box], true);
  }

  addRight(box, {symbol = ' ', align = 'top'} = {}) {
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

  flipV() {
    // return new Box(this.box.toReversed(), true);
    return new Box([...this.box].reverse(), true);
  }
}

addAlias(Box, 'toBox', 'clone');

export const toBox = Box.make;

export default Box;
