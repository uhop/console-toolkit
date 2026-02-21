import Box from './box.js';

/** Options for `drawBlock()` and `drawFrame()`. */
export interface DrawBlockOptions {
  /** Top padding rows. */
  top?: number;
  /** Bottom padding rows. */
  bottom?: number;
  /** Left padding columns. */
  left?: number;
  /** Right padding columns. */
  right?: number;
  /** Vertical theme index. */
  vTheme?: number;
  /** Horizontal theme index. */
  hTheme?: number;
  /** Theme index (sets both vTheme and hTheme). */
  theme?: number;
  /** Fill symbol for the interior. */
  symbol?: string;
}

/** Draws a rectangular block using a block theme.
 * @param width - Width in columns.
 * @param height - Height in rows.
 * @param blockTheme - Block theme object defining border characters.
 * @param options - Drawing options.
 * @returns A Box containing the drawn block.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-draw-block}
 */
export function drawBlock(
  width: number,
  height: number,
  blockTheme: Record<string, any>,
  options?: DrawBlockOptions
): Box;
/** Draws a rectangular frame (block with space fill) using a block theme.
 * @param width - Width in columns.
 * @param height - Height in rows.
 * @param blockTheme - Block theme object defining border characters.
 * @param options - Drawing options.
 * @returns A Box containing the drawn frame.
 */
export function drawFrame(
  width: number,
  height: number,
  blockTheme: Record<string, any>,
  options?: DrawBlockOptions
): Box;

export default drawBlock;
