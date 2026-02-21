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

/** Draws a filled rectangular block using a block theme.
 * The interior is filled with a symbol from the theme's `f` property, or space by default.
 * @param {number} width - Interior width in columns.
 * @param {number} height - Interior height in rows.
 * @param {object} blockTheme - Block theme object defining border characters.
 * @param {object} [options] - Drawing options.
 * @param {number} [options.top] - Sub-theme for the top border (defaults to `hTheme`, then `theme`, then `1`).
 * @param {number} [options.bottom] - Sub-theme for the bottom border (defaults to `hTheme`, then `theme`, then `1`).
 * @param {number} [options.left] - Sub-theme for the left border (defaults to `vTheme`, then `theme`, then `1`).
 * @param {number} [options.right] - Sub-theme for the right border (defaults to `vTheme`, then `theme`, then `1`).
 * @param {number} [options.vTheme] - Sub-theme for vertical borders (left and right). Defaults to `theme`, then `1`.
 * @param {number} [options.hTheme] - Sub-theme for horizontal borders (top and bottom). Defaults to `theme`, then `1`.
 * @param {number} [options.theme] - Sub-theme for all borders (default: `1`).
 * @param {string} [options.symbol] - Fill character for the interior. Defaults to the theme's `f` property or space.
 * @returns {import('./box.js').Box} A Box containing the drawn block.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-draw-block}
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

/** Draws a rectangular frame using a block theme. Same as `drawBlock()` but defaults the interior fill to space if `symbol` is not specified.
 * @param {number} width - Interior width in columns.
 * @param {number} height - Interior height in rows.
 * @param {object} blockTheme - Block theme object defining border characters.
 * @param {object} [options] - Drawing options (same as `drawBlock()`).
 * @returns {import('./box.js').Box} A Box containing the drawn frame.
 */
export const drawFrame = (width, height, blockTheme, options) => {
  if (!options?.symbol) options = {...options, symbol: ' '};
  return drawBlock(width, height, blockTheme, options);
};

export default drawBlock;
