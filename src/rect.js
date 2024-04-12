import Box from './Box.js';

const getIndex = (h, v) => 4 * h + v;

const T = 1,
  B = 2,
  L = 1,
  R = 2,
  LT = getIndex(L, T),
  RT = getIndex(R, T),
  LB = getIndex(L, B),
  RB = getIndex(R, B);

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
      lineStyle['t_' + top + '_' + left][LT] +
        lineStyle['h_' + top][T].repeat(width) +
        lineStyle['t_' + top + '_' + right][RT],
      ...new Array(height).fill(lineStyle['v_' + left][L] + symbol.repeat(width) + lineStyle['v_' + right][R]),
      lineStyle['t_' + bottom + '_' + left][LB] +
        lineStyle['h_' + bottom][B].repeat(width) +
        lineStyle['t_' + bottom + '_' + right][RB]
    ],
    true
  );
};

export default drawRect;
