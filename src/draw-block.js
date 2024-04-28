import Box from './box.js';

const getIndex = (h, v) => 4 * h + v;

const T = 1,
  B = 2,
  L = 1,
  R = 2,
  LT = getIndex(L, T),
  RT = getIndex(R, T),
  LB = getIndex(L, B),
  RB = getIndex(R, B);

export const drawBlock = (
  width,
  height,
  blockTheme,
  {top, bottom, left, right, vTheme, hTheme, theme, symbol} = {}
) => {
  // decode options
  top ??= hTheme ?? theme ?? 1;
  bottom ??= hTheme ?? theme ?? 1;
  left ??= vTheme ?? theme ?? 1;
  right ??= vTheme ?? theme ?? 1;
  symbol ??= blockTheme?.f || ' ';

  const topLine = top
      ? (left ? blockTheme['t_' + top + '_' + left][LT] : '') +
        blockTheme['h_' + top][T].repeat(width) +
        (right ? blockTheme['t_' + top + '_' + right][RT] : '')
      : null,
    bottomLine = bottom
      ? (left ? blockTheme['t_' + bottom + '_' + left][LB] : '') +
        blockTheme['h_' + bottom][B].repeat(width) +
        (right ? blockTheme['t_' + bottom + '_' + right][RB] : '')
      : null,
    middleLine =
      (left ? blockTheme['v_' + left][L] : '') + symbol.repeat(width) + (right ? blockTheme['v_' + right][R] : '');

  return new Box(
    [
      topLine === null ? [] : [topLine],
      new Array(height).fill(middleLine),
      bottomLine === null ? [] : [bottomLine]
    ].flat(1),
    true
  );
};

export const drawFrame = (width, height, blockTheme, options) => {
  if (!options?.symbol) options = {...options, symbol: ' '};
  return drawBlock(width, height, blockTheme, options);
}

export default drawBlock;
