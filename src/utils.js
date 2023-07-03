export const findEscSequence = /\x1B(?:\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E]|[\x20-\x2F]*[\x30-\x7E])/g;
export const getLength = str => String(str).replace(findEscSequence, '').length;

// The line symbols are indexed in this order: tmb
// t is top
// m is middle
// b is bottom

// The matrix to define a table is 9 symbols (3x3).
// Each symbol is defined like that: 'xNyM', where:
// x and y are of 'tmb', x is for a horizontal dimension, y is for a vertical one.
// N and M are numbers. They can be 1 or 2 for a line style (single/double).

const table11 = ['┌┬┐', '├┼┤', '└┴┘'],
  table12 = ['╓╥╖', '╟╫╢', '╙╨╜'],
  table21 = ['╒╤╕', '╞╪╡', '╘╧╛'],
  table22 = ['╔╦╗', '╠╬╣', '╚╩╝'],
  h1 = '─',
  h2 = '═',
  v1 = '│',
  v2 = '║',
  lineSymbols = ['t', 'm', 'b'];

export const tableSymbols = {h1, h2, v1, v2},
  symbolParams = {[h1]: {n: 1, m: 0}, [h2]: {n: 2, m: 0}, [v1]: {n: 0, m: 1}, [v2]: {n: 0, m: 2}};

const splitTable = (table, n, m) => {
  for (let i = 0; i < 3; ++i) {
    const y = lineSymbols[i],
      yM = y + m;
    for (let j = 0; j < 3; ++j) {
      const symbol = table[i][j],
        x = lineSymbols[j];
      tableSymbols[x + n + yM] = symbol;
      symbolParams[symbol] = {x, y, n, m};
    }
  }
};
splitTable(table11, 1, 1);
splitTable(table12, 1, 2);
splitTable(table21, 2, 1);
splitTable(table22, 2, 2);
