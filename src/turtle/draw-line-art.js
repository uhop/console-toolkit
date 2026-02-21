import Box from '../box.js';

const BEFORE = 1,
  AFTER = 2,
  BOTH = 3;

const getIndex = cell => {
  if (!cell) return {skipFlag: true};

  const hTheme = cell.l || cell.r,
    vTheme = cell.u || cell.d,
    hIndex = (cell.l ? 0 : BEFORE) | (cell.r ? 0 : AFTER),
    vIndex = (cell.u ? 0 : BEFORE) | (cell.d ? 0 : AFTER),
    skipFlag = hIndex == BOTH && vIndex == BOTH;
  return {skipFlag, hTheme, vTheme, hIndex, vIndex};
};

/** Draws a Turtle's path as line art using a line theme.
 * @param {import('./turtle.js').Turtle} turtle - The turtle to draw.
 * @param {object} lineTheme - The line theme defining border characters.
 * @param {object} [options] - Options.
 * @param {string} [options.ignore=' '] - Character for empty cells.
 * @returns {import('../box.js').Box} A Box with the rendered line art.
 */
export const draw = (turtle, lineTheme, {ignore = ' '} = {}) =>
  new Box(
    turtle.cells.map(row =>
      row
        .map(cell => {
          const {skipFlag, hTheme, vTheme, hIndex, vIndex} = getIndex(cell);
          if (skipFlag) return ignore;
          if (!hTheme) {
            if (lineTheme['w_' + vTheme] !== 1)
              throw new TypeError(`Vertical theme "${vTheme}" should have width of 1 for all vertical elements`);
            if (!lineTheme['v_' + vTheme]) throw new TypeError(`Style has no "v_${vTheme}" property`);
            return lineTheme['v_' + vTheme][vIndex];
          }
          if (!vTheme) {
            if (!lineTheme['h_' + hTheme]) throw new TypeError(`Style has no "h_${hTheme}" property`);
            return lineTheme['h_' + hTheme][hIndex];
          }
          if (lineTheme['w_' + vTheme] !== 1)
            throw new TypeError(`Vertical theme "${vTheme}" should have width of 1 for all vertical elements`);
          if (!lineTheme['t_' + hTheme + '_' + vTheme])
            throw new TypeError(`Style has no "t_${hTheme}_${vTheme}" property`);
          return lineTheme['t_' + hTheme + '_' + vTheme][4 * hIndex + vIndex];
        })
        .join('')
    ),
    true
  );

export default draw;
