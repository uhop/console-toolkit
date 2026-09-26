import type {SpinnerDefinition} from '../spinner/spinner.js';

/** Anything with a `text()` method, such as a `Style` from `console-toolkit/style.js`. */
export interface TextStyler {
  /** Wraps a string in styling.
   * @param s - The string to style.
   * @returns The styled string.
   */
  text(s: string): string;
}

/** The glyphs of a progress bar. Every glyph must be one cell wide; presets are in `console-toolkit/progress-bar/skins.js`. */
export interface ProgressBarSkin {
  /** Glyph for a filled cell. */
  fill: string;
  /** Glyphs for a partly filled cell, from least to most filled. Each adds a step per cell (default: none). */
  partials?: string[];
  /** Glyph for an unfilled cell. */
  track: string;
  /** Glyph for the first unfilled cell after a whole number of filled cells (default: none). */
  trackStart?: string;
  /** Glyph for the last filled cell of an unfinished bar without a partial cell (default: none). */
  head?: string;
  /** Left end cap, counted in the width (default: none). */
  left?: string;
  /** Right end cap, counted in the width (default: none). */
  right?: string;
}

/** Options for {@link drawProgressBar}. */
export interface ProgressBarOptions {
  /** Glyphs to draw with (default: the `blocks` skin, `█████▌░░░░`). */
  skin?: ProgressBarSkin;
  /** Style for the filled part, such as `style.green` (default: none). */
  fillStyle?: TextStyler;
  /** Style for the unfilled part, such as `style.white`. A background color also shows behind the partial cell (default: none). */
  trackStyle?: TextStyler;
}

/** Draws a one-line progress bar exactly `width` cells wide. End caps are dropped when they would not fit.
 * @param fraction - Completed fraction, clamped to [0, 1]; a non-finite value draws an empty bar.
 * @param width - Width in cells.
 * @param options - Skin and styles.
 * @returns The bar as a string (with SGR sequences when styles are given).
 */
export function drawProgressBar(fraction: number, width: number, options?: ProgressBarOptions): string;

/** Options for {@link makeIndeterminateBar}. */
export interface IndeterminateBarOptions extends ProgressBarOptions {
  /** Length of the moving segment in cells (default: a quarter of the bar, at least 1). */
  segment?: number;
  /** `'bounce'` moves the segment back and forth; `'loop'` slides it through and wraps around (default: `'bounce'`). */
  motion?: 'bounce' | 'loop';
}

/** Makes a spinner definition for work with no known total: a segment of the skin's `fill` moving across its `track`, one cell a frame.
 * Pass it to `Spinner` from `console-toolkit/spinner`. Uses the skin's `fill`, `track`, `left`, and `right`.
 * @param width - Width in cells, end caps included.
 * @param options - Skin, styles, segment length, and motion.
 * @returns Frames, plus an empty bar for `notStarted` and a full bar for `finished`.
 * @throws RangeError when `motion` is not `'bounce'` or `'loop'`.
 */
export function makeIndeterminateBar(width: number, options?: IndeterminateBarOptions): Required<SpinnerDefinition>;

export default drawProgressBar;
