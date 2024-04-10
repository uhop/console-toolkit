import Box from '../Box.js';

const symbols =
  ' ╵╹╶└┖╺┕┗' +
  '╷│╿┌├┞┍┝┡' +
  '╻╽┃┎┟┠┏┢┣' +
  '╴┘┚─┴┸╼┶┺' +
  '┐┤┦┬┼╀┮┾╄' +
  '┒┧┨┰╁╂┲╆╊' +
  '╸┙┛╾┵┹━┷┻' +
  '┑┥┩┭┽╃┯┿╇' +
  '┓┪┫┱╅╉┳╈╋';

const arcs = {4: '╰', 12: '╭', 28: '╯', 36: '╮'};

const getIndex = cell => (cell ? (((+cell.l || 0) * 3 + (+cell.d || 0)) * 3 + (+cell.r || 0)) * 3 + (+cell.u || 0) : 0);

export const draw = (turtle, {ignore = ' ', useArcs} = {}) =>
  new Box(
    turtle.cells.map(row =>
      row
        .map(cell => {
          const index = getIndex(cell);
          if (isNaN(index) || index < 0 || index >= symbols.length)
            throw new Error('Wrong theme. It can be either 1 or 2');
          return index ? (useArcs ? arcs[index] || symbols[index] : symbols[index]) : ignore;
        })
        .join('')
    ),
    true
  );

export default draw;
