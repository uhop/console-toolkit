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

export const draw = (turtle, lineTheme, {ignore = ' '} = {}) => {
  const wCache = {},
    vCache = {},
    hCache = {},
    tCache = {};
  return new Box(
    turtle.cells.map(row =>
      row
        .map(cell => {
          const {skipFlag, hTheme, vTheme, hIndex, vIndex} = getIndex(cell);
          if (skipFlag) return ignore;
          if (!hTheme) {
            let w = wCache[vTheme];
            if (w === undefined) w = wCache[vTheme] = lineTheme['w_' + vTheme];
            if (w !== 1)
              throw new TypeError(`Vertical theme "${vTheme}" should have width of 1 for all vertical elements`);
            let v = vCache[vTheme];
            if (v === undefined) v = vCache[vTheme] = lineTheme['v_' + vTheme];
            if (!v) throw new TypeError(`Style has no "v_${vTheme}" property`);
            return v[vIndex];
          }
          if (!vTheme) {
            let h = hCache[hTheme];
            if (h === undefined) h = hCache[hTheme] = lineTheme['h_' + hTheme];
            if (!h) throw new TypeError(`Style has no "h_${hTheme}" property`);
            return h[hIndex];
          }
          let w = wCache[vTheme];
          if (w === undefined) w = wCache[vTheme] = lineTheme['w_' + vTheme];
          if (w !== 1)
            throw new TypeError(`Vertical theme "${vTheme}" should have width of 1 for all vertical elements`);
          const tKey = hTheme + '_' + vTheme;
          let t = tCache[tKey];
          if (t === undefined) t = tCache[tKey] = lineTheme['t_' + hTheme + '_' + vTheme];
          if (!t) throw new TypeError(`Style has no "t_${hTheme}_${vTheme}" property`);
          return t[4 * hIndex + vIndex];
        })
        .join('')
    ),
    true
  );
};

export default draw;
