import Box from '../box.js';

/** A rectangular region to skip when drawing borders (merged cell area). */
export interface SkipRect {
  /** Left column. */
  x: number;
  /** Top row. */
  y: number;
  /** Width in columns. */
  width: number;
  /** Height in rows. */
  height: number;
}

/** Options for `draw()`. */
export interface DrawOptions {
  /** Rectangular regions to skip (merged cells). */
  skip?: SkipRect[];
  /** Fill symbol for cell interiors (default: ' '). */
  symbol?: string;
}

/** Draws table borders based on a line theme and axis definitions.
 * @param lineTheme - Line theme object defining border characters.
 * @param hAxis - Horizontal axis pattern. @param vAxis - Vertical axis pattern.
 * @param options - Draw options.
 * @returns A Box containing the drawn borders.
 */
export function draw(
  lineTheme: Record<string, any>,
  hAxis: (string | number)[],
  vAxis: (string | number)[],
  options?: DrawOptions
): Box;

export default draw;
