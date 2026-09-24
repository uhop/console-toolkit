/** Anything with a `text()` method, such as a `Style` from `console-toolkit/style.js`. */
export interface TextStyler {
  /** Wraps a string in styling.
   * @param s - The string to style.
   * @returns The styled string.
   */
  text(s: string): string;
}

/** Options for {@link drawProgressBar}. */
export interface ProgressBarOptions {
  /** Character for the filled part (default: `fullBlock`). Fractional cells use 1/8th blocks only with the default. */
  fill?: string;
  /** Character for the unfilled track (default: `shadeLight`, ░). */
  track?: string;
  /** Style applied to the filled part (default: none). */
  fillStyle?: TextStyler;
  /** Style applied to the track (default: none). */
  trackStyle?: TextStyler;
}

/** Draws a one-line progress bar exactly `width` cells wide.
 * @param fraction - Completed fraction, clamped to [0, 1]; a non-finite value draws an empty bar.
 * @param width - Width in cells.
 * @param options - Characters and styles.
 * @returns The bar as a string (with SGR sequences when styles are given).
 */
export function drawProgressBar(fraction: number, width: number, options?: ProgressBarOptions): string;

export default drawProgressBar;
