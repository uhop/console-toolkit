import Box from './Box.js';

export const drawRect = (
  width,
  height,
  lineStyle,
  {top, bottom, left, right, vTheme, hTheme, theme, symbol = ' '} = {}
) => {
  // decode options
  top ??= hTheme ?? theme ?? 1;
  bottom ??= hTheme ?? theme ?? 1;
  left ??= vTheme ?? theme ?? 1;
  right ??= vTheme ?? theme ?? 1;

  return new Box(
    [
      lineStyle['t_' + top + '_' + left][5] +
        lineStyle['h_' + top][1].repeat(width) +
        lineStyle['t_' + top + '_' + right][9],
      ...new Array(height).fill(lineStyle['v_' + left][1] + symbol.repeat(width) + lineStyle['v_' + right][2]),
      lineStyle['t_' + bottom + '_' + left][6] +
        lineStyle['h_' + bottom][2].repeat(width) +
        lineStyle['t_' + bottom + '_' + right][10]
    ],
    true
  );
};

export default drawRect;
