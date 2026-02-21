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

/** Draws a rectangular block using a block theme.
 * The interior is filled with a symbol (from the theme or space by default).
 * @param {number} width - The interior width of the block.
 * @param {number} height - The interior height of the block.
 * @param {object} blockTheme - The block theme defining border characters.
 * @param {object} [options] - Options.
 * @param {number} [options.top] - Sub-theme for the top border (defaults to hTheme, then theme, then 1).
 * @param {number} [options.bottom] - Sub-theme for the bottom border.
 * @param {number} [options.left] - Sub-theme for the left border.
 * @param {number} [options.right] - Sub-theme for the right border.
 * @param {number} [options.vTheme] - Sub-theme for vertical borders (left and right).
 * @param {number} [options.hTheme] - Sub-theme for horizontal borders (top and bottom).
 * @param {number} [options.theme] - Sub-theme for all borders.
 * @param {string} [options.symbol] - Fill character for the interior.
 * @returns {import('./box.js').Box} A Box with the drawn block.
 */
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

/** Draws a frame (block with space-filled interior) using a block theme.
 * Same as `drawBlock()` but forces the interior fill to space if not specified.
 * @param {number} width - The interior width of the frame.
 * @param {number} height - The interior height of the frame.
 * @param {object} blockTheme - The block theme defining border characters.
 * @param {object} [options] - Same options as `drawBlock()`.
 * @returns {import('./box.js').Box} A Box with the drawn frame.
 */
export const drawFrame = (width, height, blockTheme, options) => {
  if (!options?.symbol) options = {...options, symbol: ' '};
  return drawBlock(width, height, blockTheme, options);
};

export default drawBlock;
