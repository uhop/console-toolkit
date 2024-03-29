export const getLength = (matcher, s) = String(s).replace(matcher, '').length;

// The line symbols are indexed in this order: tmb
// t is top
// m is middle
// b is bottom

const lineSymbols = ['t', 'm', 'b', 'h', 'v'];

export const populateTableSymbols = (tableSymbols, tableDefinition, hLineStyle, vLineStyle) => {
  const symbolWidth = tableDefinition.w || [1, 1, 1];
  for (let i = 0; i < 3; ++i) {
    const y = lineSymbols[i],
      yM = y + vLineStyle,
      definition = tableDefinition[y];
    for (let start = 0, j = 0; j < 3; ++j) {
      const width = symbolWidth[j],
        symbol = definition.substring(start, start + width),
        x = lineSymbols[j];
      tableSymbols[x + hLineStyle + yM] = symbol;
      start += width;
    }
  }
  for (let start = 0, j = 0; j < 3; ++j) {
    const width = symbolWidth[j],
      symbol = tableDefinition.v.substring(start, start + width),
      x = lineSymbols[j];
    tableSymbols['v' + vLineStyle + x] = symbol;
    start += width;
  }
  tableSymbols['h' + hLineStyle] = tableDefinition.h;
  return tableSymbols;
};

// A table definition matrix should define six properties:
//   - 't': top row (3 symbols),
//   - 'm': middle row (3 symbols),
//   - 'b': bottom row (3 symbols),
//   - 'v': vertical separators (3 symbols),
//   - 'h': a horizontal separator (1 symbol),
//   - 'w': an numeric array that defines width of every corresponding symbol (default: [1,1,1]).
// t/m/b/v lines should have the same width for a corresponding symbol.
// h should be one character long (visually).

// Each table symbol is defined like that: 'xNyM', where:
// x and y are of 'tmb', x is for a horizontal dimension, y is for a vertical one.
// N and M are line styles (numbers or characters).
// Example: they can be 1 or 2 for a line style (single/double).

// A table defines horizontal and vertical symbols: hN and vMx.
// N and M are line styles. See above.
// x is of 'tmb' as before. h is 'h'. v is 'v'.
