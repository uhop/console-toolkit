import {getLength} from '../ansi/utils.js';

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
