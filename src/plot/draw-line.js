// Drawing lines using Bresenham's line algorithm
// The canonic version from https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm

/** Draws a line on a Bitmap using Bresenham's line algorithm.
 * @param {import('./bitmap.js').Bitmap} bmp - The bitmap to draw on.
 * @param {number} x0 - Start x coordinate.
 * @param {number} y0 - Start y coordinate.
 * @param {number} x1 - End x coordinate.
 * @param {number} y1 - End y coordinate.
 * @param {number} [value=1] - Bit value: positive to set, 0 to clear, negative to toggle.
 */
export const drawLine = (bmp, x0, y0, x1, y1, value = 1) => {
  const dx = Math.abs(x1 - x0),
    sx = x0 < x1 ? 1 : -1,
    dy = -Math.abs(y1 - y0),
    sy = y0 < y1 ? 1 : -1;
  for (let error = dx + dy; ; ) {
    bmp.setBit(x0, y0, value);
    if (x0 == x1 && y0 == y1) break;
    const e2 = 2 * error;
    if (e2 >= dy) {
      if (x0 == x1) break;
      error += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      if (y0 == y1) break;
      error += dx;
      y0 += sy;
    }
  }
};

export default drawLine;
