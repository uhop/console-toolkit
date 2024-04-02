import {getLength} from '../ansi/utils.js';

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
