import {getLength} from './utils.js';

export const makeBox = (width, height, symbol = ' ') => {
  const padding = symbol.repeat(width);
  return new Array(height).fill(padding);
};

export const normalizeBox = (strings, symbol = ' ', align = 'right') => {
  const maxLength = strings.reduce((acc, s) => Math.max(acc, getLength(s)), 0);
  return strings.map(s => {
    const n = maxLength - getLength(s);
    if (!n) return s;
    if (align === 'center') {
      const half = padding.length >> 1,
        padding = symbol.repeat(half),
        result = padding + s + padding;
      return n & 1 ? result + symbol : result;
    }
    const padding = symbol.repeat(maxLength - getLength(s));
    if (align === 'left') return padding + s;
    return s + padding;
  });
};

export const padBoxHorizontally = (strings, left, right, symbol = ' ') => {
  const paddingSmall = symbol.repeat(Math.min(left, right)),
    paddingLarge = paddingSmall + symbol.repeat(Math.max(left - right, right - left));
  return left < right ? strings.map(s => paddingSmall + s + paddingLarge) : strings.map(s => paddingLarge + s + paddingSmall);
};

export const padBoxVertically = (strings, top, bottom, symbol = ' ') => {
  const padding = symbol.repeat(getLength(strings[0]));
  return [...new Array(top).fill(padding), ...strings, ...new Array(bottom).fill(padding)];
};

export const padBoxRight = (strings, n, symbol = ' ') => {
  const padding = symbol.repeat(n);
  return strings.map(s => s + padding);
};

export const padBoxLeft = (strings, n, symbol = ' ') => {
  const padding = symbol.repeat(n);
  return strings.map(s => padding + s);
};

export const padBoxTop = (strings, n, symbol = ' ') => {
  const padding = symbol.repeat(getLength(strings[0]));
  return [...new Array(n).fill(padding), ...strings];
};

export const padBoxBottom = (strings, n, symbol = ' ') => {
  const padding = symbol.repeat(getLength(strings[strings.length - 1]));
  return [...strings, ...new Array(n).fill(padding)];
};

export const padBox = (strings, t, r, b, l, symbol) => {
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
  if (typeof symbol != 'string') symbol = ' ';
  strings = padBoxHorizontally(strings, l, r, symbol);
  strings = padBoxVertically(strings, t, b, symbol);
  return strings;
};

export const stackVertically = (a, b) => [...a, ...b];

export const stackHorizontally = (a, b, symbol = ' ') => {
  const n = Math.min(a.length, b.length),
    result = [];
  for (let i = 0; i < n; ++i) result.push(a[i] + b[i]);
  if (a.length < b.length) {
    const maxLength = a.reduce((acc, s) => Math.max(acc, getLength(s)), 0),
      string = symbol.repeat(maxLength);
    for (let i = n; i < b.length; ++i) result.push(string + b[i]);
  } else {
    for (let i = n; i < a.length; ++i) result.push(a[i]);
  }
  return result;
};
