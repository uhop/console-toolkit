import {tableSymbols} from './utils.js';

export const verifyAxis = (axis, silent) => {
  if (!Array.isArray(axis) || axis.length < 3 || !(axis.length & 1)) {
    if (silent) return false;
    throw new TypeError('An axis should be an array of an odd size bigger than 2.');
  }
  return axis.every((value, index) => {
    if (index & 1) {
      if (isNaN(value) || value < 0) {
        if (silent) return false;
        throw new TypeError(`Value #${index} should be a non-negative integer.`);
      }
      return true;
    }
    if (value != 1 && value != 2) {
      if (silent) return false;
      throw new TypeError(`Value #${index} should be 1 or 2.`);
    }
    return true;
  });
};

export const draw = (xAxis, yAxis, symbol = ' ') => {
  verifyAxis(xAxis);
  verifyAxis(yAxis);
  return yAxis
    .map((y, row) => {
      if (row & 1) {
        if (y < 1) return [];
        const line = xAxis.map((x, column) => (column & 1 ? symbol.repeat(x) : tableSymbols['v' + x])).join('');
        return y == 1 ? line : new Array(y).fill(line);
      }
      const ySymbol = (row == 0 ? 't' : row + 1 == yAxis.length ? 'b' : 'm');
      return xAxis
        .map((x, column) => {
          if (column & 1) {
            return tableSymbols['h' + y].repeat(x);
          }
          const xSymbol = (column == 0 ? 't' : column + 1 == xAxis.length ? 'b' : 'm');
          return tableSymbols[xSymbol + y + ySymbol + x];
        })
        .join('');
    })
    .flat(1);
};
