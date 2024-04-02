import {getLength} from '../ansi/utils.js';

export const makeBox = (width, height, symbol = ' ') => {
  const padding = symbol.repeat(width);
  return new Array(height).fill(padding);
};

export const getWidth = (strings, normalized) => {
  if (normalized) return strings.length ? getLength(strings[0]) : 0;
  return Math.max(0, ...strings.map(s => getLength(s)));
};

export const getHeight = strings => strings.length;

export const normalizeBox = (strings, symbol = ' ', align = 'left') => {
  const width = getWidth(strings);
  switch (align) {
    case 'left':
      return strings.map(s => {
        const n = width - getLength(s);
        return n > 0 ? s + symbol.repeat(n) : s;
      });
    case 'right':
      return strings.map(s => {
        const n = width - getLength(s);
        return n > 0 ? symbol.repeat(n) + s : s;
      });
  }
  // center
  return strings.map(s => {
    const n = width - getLength(s);
    if (!n) return s;
    const half = n >> 1,
      padding = symbol.repeat(half);
    return padding + s + padding + (n & 1 ? symbol : '');
  });
};
