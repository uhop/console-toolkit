import Box from '../box.js';

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

const BEFORE = 1,
  AFTER = 2,
  BOTH = 3;

const getLineIndex = (axis, i) => (i == 0 ? BEFORE : i == axis.length - 1 ? AFTER : 0);

const getIndex = (hAxis, vAxis, skip, x, y) => {
  let hIndex = getLineIndex(hAxis, x),
    vIndex = getLineIndex(vAxis, y),
    skipFlag = false;

  if (skip?.length) {
    // use the skip list
    if (isSkipped(skip, x, y)) {
      skipFlag = true;
    } else if (!(x & 1) && !(y & 1)) {
      if (isSkipped(skip, x - 1, y)) hIndex |= BEFORE;
      if (isSkipped(skip, x + 1, y)) hIndex |= AFTER;
      if (isSkipped(skip, x, y - 1)) vIndex |= BEFORE;
      if (isSkipped(skip, x, y + 1)) vIndex |= AFTER;
      if (hIndex == BOTH && vIndex == BOTH) skipFlag = true;
    }
  }

  return {hIndex, vIndex, skipFlag};
};

const drawRow = (lineTheme, hAxis, vAxis, skip, symbol, y, i) =>
  hAxis
    .map((x, j) => {
      if (!x) return '';
      const {skipFlag, hIndex, vIndex} = getIndex(hAxis, vAxis, skip, j, i);

      if (skipFlag) return symbol.repeat(j & 1 ? x : lineTheme['w_' + x]);

      if (j & 1) {
        if (i & 1) return symbol.repeat(x);
        if (!lineTheme['h_' + y]) throw new TypeError(`Style has no "h_${y}" property`);
        return lineTheme['h_' + y][vIndex].repeat(x);
      }
      if (i & 1) {
        if (!lineTheme['v_' + x]) throw new TypeError(`Style has no "v_${x}" property`);
        return lineTheme['v_' + x][hIndex];
      }

      if (!lineTheme['t_' + y + '_' + x]) throw new TypeError(`Style has no "t_${y}_${x}" property`);
      return lineTheme['t_' + y + '_' + x][4 * hIndex + vIndex];
    })
    .join('');

/** Draws table borders using a line theme and axis definitions.
 * @param {object} lineTheme - The line theme defining border characters.
 * @param {(string|number)[]} hAxis - Horizontal axis definition (alternating style/size values).
 * @param {(string|number)[]} vAxis - Vertical axis definition (alternating style/size values).
 * @param {object} [options] - Options.
 * @param {{x: number, y: number, width: number, height: number}[]} [options.skip=[]] - Rectangles to skip (for merged cells).
 * @param {string} [options.symbol=' '] - Fill character for cell interiors.
 * @returns {import('../box.js').Box} A Box with the drawn borders.
 */
export const draw = (lineTheme, hAxis, vAxis, {skip = [], symbol = ' '} = {}) =>
  new Box(
    vAxis
      .map((y, i) => {
        if (!y) return [];
        if (i & 1) {
          const row = drawRow(lineTheme, hAxis, vAxis, skip, symbol, y, i);
          return y == 1 ? row : new Array(y).fill(row);
        }
        return drawRow(lineTheme, hAxis, vAxis, skip, symbol, y, i);
      })
      .flat(1),
    true
  );

export default draw;
