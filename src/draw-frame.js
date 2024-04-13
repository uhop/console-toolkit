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

export const drawFrame = (
  width,
  height,
  lineTheme,
  {top, bottom, left, right, vTheme, hTheme, theme, symbol = ' '} = {}
) => {
  // decode options
  top ??= hTheme ?? theme ?? 1;
  bottom ??= hTheme ?? theme ?? 1;
  left ??= vTheme ?? theme ?? 1;
  right ??= vTheme ?? theme ?? 1;
  symbol ??= lineTheme?.f || ' ';

  return new Box(
    [
      lineTheme['t_' + top + '_' + left][LT] +
        lineTheme['h_' + top][T].repeat(width) +
        lineTheme['t_' + top + '_' + right][RT],
      ...new Array(height).fill(lineTheme['v_' + left][L] + symbol.repeat(width) + lineTheme['v_' + right][R]),
      lineTheme['t_' + bottom + '_' + left][LB] +
        lineTheme['h_' + bottom][B].repeat(width) +
        lineTheme['t_' + bottom + '_' + right][RB]
    ],
    true
  );
};

export default drawFrame;
