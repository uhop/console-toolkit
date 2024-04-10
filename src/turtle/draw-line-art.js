import Box from '../Box.js';

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

export const draw = (turtle, lineStyle, ignore = ' ') =>
  new Box(
    turtle.cells.map(row =>
      row.map(cell => {
        const {skipFlag, hTheme, vTheme, hIndex, vIndex} = getIndex(cell);
        if (skipFlag) return ignore;
        if (!hTheme) {
          if (!lineStyle['v_' + vTheme]) throw new TypeError(`Style has no "v_${vTheme}" property`);
          return lineStyle['v_' + vTheme][vIndex];
        }
        if (!vTheme) {
          if (!lineStyle['h_' + hTheme]) throw new TypeError(`Style has no "h_${hTheme}" property`);
          return lineStyle['h_' + hTheme][hIndex];
        }
        if (!lineStyle['t_' + hTheme + '_' + vTheme])
          throw new TypeError(`Style has no "t_${hTheme}_${vTheme}" property`);
        return lineStyle['t_' + hTheme + '_' + vTheme][4 * hIndex + vIndex];
      }).join('')
    ),
    true
  );

export default draw;
