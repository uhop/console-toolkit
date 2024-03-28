const allowed = {number: 1, string: 1};

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
    if (value && allowed[typeof value] !== 1) {
      if (silent) return false;
      throw new TypeError(`Value #${index} should be falsy, a valid number or a string.`);
    }
    return true;
  });
};

export const draw = (tableStyle, xAxis, yAxis, symbol = ' ') => {
  verifyAxis(xAxis);
  verifyAxis(yAxis);
  return yAxis
    .map((y, row) => {
      if (!y) return [];
      if (row & 1) {
        const line = xAxis
          .map((x, column) => {
            if (!x) return '';
            if (column & 1) return symbol.repeat(x);
            const xSymbol = column == 0 ? 't' : column + 1 == xAxis.length ? 'b' : 'm';
            return tableStyle['v' + x + xSymbol];
          })
          .join('');
        return y == 1 ? line : new Array(y).fill(line);
      }
      const ySymbol = row == 0 ? 't' : row + 1 == yAxis.length ? 'b' : 'm';
      return xAxis
        .map((x, column) => {
          if (!x) return '';
          if (column & 1) return tableStyle['h' + y].repeat(x);
          const xSymbol = column == 0 ? 't' : column + 1 == xAxis.length ? 'b' : 'm';
          return tableStyle[xSymbol + y + ySymbol + x];
        })
        .join('');
    })
    .flat(1);
};

export default draw;
