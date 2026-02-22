import Box from './box.js';
import {LineTheme} from './themes/utils.js';

/** Options for `drawBlock()` and `drawFrame()`. */
export interface DrawBlockOptions {
  /** Sub-theme for the top border (defaults to `hTheme`, then `theme`, then `1`). */
  top?: number;
  /** Sub-theme for the bottom border (defaults to `hTheme`, then `theme`, then `1`). */
  bottom?: number;
  /** Sub-theme for the left border (defaults to `vTheme`, then `theme`, then `1`). */
  left?: number;
  /** Sub-theme for the right border (defaults to `vTheme`, then `theme`, then `1`). */
  right?: number;
  /** Sub-theme for vertical borders (left and right). Defaults to `theme`, then `1`. */
  vTheme?: number;
  /** Sub-theme for horizontal borders (top and bottom). Defaults to `theme`, then `1`. */
  hTheme?: number;
  /** Sub-theme for all borders (default: `1`). */
  theme?: number;
  /** Fill character for the interior. `drawBlock()` defaults to the theme's `f` property or space; `drawFrame()` defaults to space. */
  symbol?: string;
}

/** Draws a filled rectangular block using a block theme.
 * The interior is filled with a symbol from the theme's `f` property, or space by default.
 * @param width - Interior width in columns.
 * @param height - Interior height in rows.
 * @param blockTheme - Block theme object defining border characters.
 * @param options - Drawing options.
 * @returns A Box containing the drawn block.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-draw-block}
 */
export function drawBlock(
  width: number,
  height: number,
  blockTheme: LineTheme,
  options?: DrawBlockOptions
): Box;
/** Draws a rectangular frame using a block theme. Same as `drawBlock()` but defaults the interior fill to space if `symbol` is not specified.
 * @param width - Interior width in columns.
 * @param height - Interior height in rows.
 * @param blockTheme - Block theme object defining border characters.
 * @param options - Drawing options.
 * @returns A Box containing the drawn frame.
 */
export function drawFrame(
  width: number,
  height: number,
  blockTheme: LineTheme,
  options?: DrawBlockOptions
): Box;

export default drawBlock;
