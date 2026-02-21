import Box from '../box.js';

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

/** Draws a Turtle's path using Unicode box-drawing characters.
 * Supports themes 1 (thin) and 2 (thick), and optional arc characters for corners.
 * @param {import('./turtle.js').Turtle} turtle - The turtle to draw.
 * @param {object} [options] - Options.
 * @param {string} [options.ignore=' '] - Character for empty cells.
 * @param {boolean} [options.useArcs] - If true, use rounded arc characters for corners.
 * @returns {import('../box.js').Box} A Box with the rendered Unicode drawing.
 */
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
