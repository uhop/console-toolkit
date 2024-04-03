// An axis structure is an array:
//   - every even element is a drawing style defined by a table style
//     - if it is falsy (e.g., 0), the line is skipped
//   - every odd element is a cell size in symbols not less than 0

// TODO: finalize a skip structure.

// A skip structure is a dictionary with keys like "xNyM", where:
//   - "x" and "y" are literals
//   - N is an index in terms of `xAxis`, where to skip a separator
//   - M is an index in terms of `yAxis`, where to skip a separator

// Alternative skip structure:
//   - an array of rectangles
//   - a rectangle is a structure: {x, y, width, height} in terms of axes' indices.
//     - x and y are inclusive
//     - width and height are exclusive

// A table of neighbors for even indices in terms of 'tmbhv'.
// Neighbors are in terms of 'lrud'.
//
// | L | R | U | D | Symbol |
// |---|---|---|---|--------|
// | N | Y | N | Y | tt     |
// | Y | Y | N | Y | mt     |
// | Y | N | N | Y | bt     |

// | N | Y | Y | Y | tm     |
// | Y | Y | Y | Y | mm     |
// | Y | N | Y | Y | bm     |

// | N | Y | Y | N | tb     |
// | Y | Y | Y | N | mb     |
// | Y | N | Y | N | bb     |

// | N | N | N | Y | v      |
// | N | N | Y | Y | v      |
// | N | N | Y | N | v      |

// | N | Y | N | N | h      |
// | Y | Y | N | N | h      |
// | Y | N | N | N | h      |

// | N | N | N | N | symbol |

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
