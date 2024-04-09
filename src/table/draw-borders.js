import Box from '../Box.js';

// An axis structure is an array:
//   - every even element is a drawing style defined by a table style
//     - if it is falsy (e.g., 0), the line is skipped
//   - every odd element is a cell size in symbols not less than 0

// A skip structure:
//   - an array of rectangles
//   - a rectangle is a structure: {x, y, width, height} in terms of axes' indices.
//     - x and y are inclusive
//     - width and height are exclusive

const isSkipped = (skip, x, y) => {
  for (const rect of skip) {
    if (rect.x <= x && x < rect.x + rect.width && rect.y <= y && y < rect.y + rect.height) return true;
  }
  return false;
};

const LEFT = 8,
  RIGHT = 4,
  UP = 2,
  DOWN = 1,
  ALL = 15;

const getLineIndex = (axis, i) => i == 0 ? 2 : i == axis.length - 1 ? 1 : 0;

const getIndex = (hAxis, vAxis, skip, x, y) => {
  let index = 0;
  // use geometry
  if (x & 1) {
    index |= UP | DOWN; // skip up + down
  } else if (x == 0) {
    index |= LEFT; // skip left
  } else if (x == hAxis.length - 1) {
    index |= RIGHT; // skip right
  }
  if (y & 1) {
    index |= LEFT | RIGHT; // skip left + right
  } else if (y == 0) {
    index |= UP; // skip up
  } else if (y == vAxis.length - 1) {
    index |= DOWN; // skip down
  }
  // use the skip list
  if (!(index & LEFT) && isSkipped(skip, x - 1, y)) index |= LEFT;
  if (!(index & RIGHT) && isSkipped(skip, x + 1, y)) index |= RIGHT;
  if (!(index & UP) && isSkipped(skip, x, y - 1)) index |= UP;
  if (!(index & DOWN) && isSkipped(skip, x, y + 1)) index |= DOWN;
  if (index != ALL && isSkipped(skip, x, y)) index = ALL;
  // return required indices
  return {index, hIndex: getLineIndex(hAxis, x), vIndex: getLineIndex(vAxis, y)};
};

const drawRow = (tableStyle, hAxis, vAxis, skip, symbol, y, i) =>
  hAxis
    .map((x, j) => {
      if (!x) return '';
      const {index, hIndex, vIndex} = getIndex(hAxis, vAxis, skip, j, i);
      if (j & 1) {
        if (i & 1 || index == ALL) return symbol.repeat(x);
        if (!tableStyle['h_' + y]) throw new TypeError(`Style has no "h_${y}" property`);
        return tableStyle['h_' + y][vIndex].repeat(x);
      }
      if (i & 1) {
        if (index == ALL) {
          if (!tableStyle['w_' + x]) throw new TypeError(`Style has no "w_${x}" property`);
          return symbol.repeat(tableStyle['w_' + x]);
        }
        if (!tableStyle['v_' + x]) throw new TypeError(`Style has no "v_${x}" property`);
        return tableStyle['v_' + x][hIndex];
      }
      if (index == ALL) {
        if (!tableStyle['w_' + x]) throw new TypeError(`Style has no "w_${x}" property`);
        return symbol.repeat(tableStyle['w_' + x]);
      }
      if (!tableStyle['t_' + y + '_' + x]) throw new TypeError(`Style has no "t_${y}_${x}" property`);
      return tableStyle['t_' + y + '_' + x][index];
    })
    .join('');

export const draw = (tableStyle, hAxis, vAxis, skip = [], symbol = ' ') =>
  new Box(
    vAxis
      .map((y, i) => {
        if (!y) return [];
        if (i & 1) {
          const row = drawRow(tableStyle, hAxis, vAxis, skip, symbol, y, i);
          return y == 1 ? row : new Array(y).fill(row);
        }
        return drawRow(tableStyle, hAxis, vAxis, skip, symbol, y, i);
      })
      .flat(1),
    true
  );

export default draw;
