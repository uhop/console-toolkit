// Drawing lines using Bresenham's line algorithm
// The canonic version from https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm

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
