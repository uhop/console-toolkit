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

const getIndex = (xAxis, yAxis, skip, x, y) => {
  let index = 0;
  // use geometry
  if (x == 0) {
    index |= LEFT; // skip left
  } else if (x == xAxis.length - 1) {
    index |= RIGHT; // skip right
  } else if (x & 1) {
    index |= UP | DOWN; // skip up + down
  }
  if (y == 0) {
    index |= UP; // skip up
  } else if (y == yAxis.length - 1) {
    index |= DOWN; // skip down
  } else if (y & 1) {
    index |= LEFT | RIGHT; // skip left + right
  }
  // use the skip list
  if (!(index & LEFT) && isSkipped(skip, x - 1, y)) index |= LEFT;
  if (!(index & RIGHT) && isSkipped(skip, x + 1, y)) index |= RIGHT;
  if (!(index & UP) && isSkipped(skip, x, y - 1)) index |= UP;
  if (!(index & DOWN) && isSkipped(skip, x, y + 1)) index |= DOWN;
  if (index != ALL && isSkipped(skip, x, y)) index = ALL;
  return index;
};

const drawRow = (tableStyle, xAxis, yAxis, skip, symbol, y, i) =>
  xAxis
    .map((x, j) => {
      if (!x) return '';
      const index = getIndex(xAxis, yAxis, skip, j, i);
      if (j & 1) {
        if ((i & 1) || index == ALL) return symbol.repeat(x);
        return tableStyle['_h_' + y].repeat(x);
      }
      if (i & 1) {
        if (index == ALL) return symbol.repeat(tableStyle['_w_' + x]);
        return tableStyle['_v_' + x][index - 12];
      }
      if (index == ALL) return symbol.repeat(tableStyle['_w_' + y]);
      return tableStyle[y + '_' + x][index];
    })
    .join('');

export const draw = (tableStyle, xAxis, yAxis, skip = [], symbol = ' ') =>
  yAxis
    .map((y, i) => {
      if (!y) return [];
      if (i & 1) {
        const row = drawRow(tableStyle, xAxis, yAxis, skip, symbol, y, i);
        return y == 1 ? row : new Array(y).fill(row);
      }
      return drawRow(tableStyle, xAxis, yAxis, skip, symbol, y, i);
    })
    .flat(1);

export default draw;
