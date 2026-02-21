import Box from './box.js';

export interface DrawBlockOptions {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  vTheme?: number;
  hTheme?: number;
  theme?: number;
  symbol?: string;
}

/** Draws a rectangular block using a block theme.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-draw-block}
 */
export function drawBlock(
  width: number,
  height: number,
  blockTheme: Record<string, any>,
  options?: DrawBlockOptions
): Box;
/** Draws a rectangular frame (block with space fill) using a block theme. */
export function drawFrame(
  width: number,
  height: number,
  blockTheme: Record<string, any>,
  options?: DrawBlockOptions
): Box;

export default drawBlock;
