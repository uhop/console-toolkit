import {ClipOptions} from './strings/clip.js';
import {StringsInput} from './strings.js';

/** Options for `Box.make()`. */
export interface BoxMakeOptions {
  /** Padding character (default: ' '). */
  symbol?: string;
  /** Horizontal alignment for shorter strings (default: 'left'). */
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

/** Options for `Box.addBottom()`. */
export interface AddBottomOptions {
  /** Padding character (default: ' '). */
  symbol?: string;
  /** Horizontal alignment (default: 'left'). */
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

/** Options for `Box.addRight()`. */
export interface AddRightOptions {
  /** Padding character (default: ' '). */
  symbol?: string;
  /** Vertical alignment (default: 'top'). */
  align?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c';
}

/** A rectangular text container that normalizes string arrays so all lines have the same display width.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-box}
 */
export class Box {
  /** The array of strings representing the box content. */
  box: string[];

  /** Creates a Box from a string, string array, or another Box.
   * @param s - Input data: a Box (copied), a string array, or a string.
   * @param normalized - If true, assume strings are already equal width.
   */
  constructor(s: Box | string | string[], normalized?: boolean);

  /** The display width of the box in columns. */
  readonly width: number;
  /** The number of lines in the box. */
  readonly height: number;

  /** Creates a Box from various input types.
   * @param s - Input: Box, object with `toBox()`/`toPanel()`, function, string, or string array.
   * @param options - Make options.
   * @returns A new Box instance.
   */
  static make(s: StringsInput, options?: BoxMakeOptions): Box;
  /** Creates a blank Box filled with a symbol.
   * @param width - Width in columns.
   * @param height - Height in rows.
   * @param symbol - Fill character (default: ' ').
   * @returns A new blank Box.
   */
  static makeBlank(width: number, height: number, symbol?: string): Box;

  /** Returns the box content as a string array.
   * @returns The array of strings.
   */
  toStrings(): string[];
  /** Returns a clone of this Box.
   * @returns A new Box copy.
   */
  toBox(): Box;
  /** Creates a copy of this Box.
   * @returns A new Box copy.
   */
  clone(): Box;
  /** Clips the box to a given width.
   * @param width - Maximum display width.
   * @param options - Clip options.
   * @returns A new clipped Box.
   */
  clip(width: number, options?: ClipOptions): Box;

  /** Pads the left and right sides with a symbol.
   * @param left - Left padding columns.
   * @param right - Right padding columns.
   * @param symbol - Pad character.
   * @returns A new padded Box.
   */
  padLeftRight(left: number, right: number, symbol?: string): Box;
  /** Pads the top and bottom with a symbol.
   * @param top - Top padding rows.
   * @param bottom - Bottom padding rows.
   * @param symbol - Pad character.
   * @returns A new padded Box.
   */
  padTopBottom(top: number, bottom: number, symbol?: string): Box;
  /** Pads the right side.
   * @param n - Columns.
   * @param symbol - Pad character.
   * @returns A new padded Box.
   */
  padRight(n: number, symbol?: string): Box;
  /** Pads the left side.
   * @param n - Columns.
   * @param symbol - Pad character.
   * @returns A new padded Box.
   */
  padLeft(n: number, symbol?: string): Box;
  /** Pads the top.
   * @param n - Rows.
   * @param symbol - Pad character.
   * @returns A new padded Box.
   */
  padTop(n: number, symbol?: string): Box;
  /** Pads the bottom.
   * @param n - Rows.
   * @param symbol - Pad character.
   * @returns A new padded Box.
   */
  padBottom(n: number, symbol?: string): Box;
  /** Pads using CSS-style shorthand (top, right, bottom, left).
   * @param t - Top padding.
   * @param r - Right padding (or symbol).
   * @param b - Bottom padding (or symbol).
   * @param l - Left padding (or symbol).
   * @param symbol - Pad character.
   * @returns A new padded Box.
   */
  pad(t: number, r?: number | string, b?: number | string, l?: number | string, symbol?: string): Box;

  /** Removes `n` rows starting at row `y`.
   * @param y - Starting row index.
   * @param n - Number of rows to remove.
   * @returns A new Box with the specified rows removed.
   */
  removeRows(y: number, n: number): Box;

  /** Appends another box below this one.
   * @param box - Input convertible to a Box.
   * @param options - Alignment and padding options.
   * @returns A new combined Box.
   */
  addBottom(box: StringsInput, options?: AddBottomOptions): Box;
  /** Appends another box to the right of this one.
   * @param box - Input convertible to a Box.
   * @param options - Alignment and padding options.
   * @returns A new combined Box.
   */
  addRight(box: StringsInput, options?: AddRightOptions): Box;

  /** Flips the box vertically.
   * @returns A new vertically flipped Box.
   */
  flipV(): Box;
}

/** Alias for `Box.make()`. Creates a Box from various input types.
 * @param s - Input convertible to a Box.
 * @param options - Make options.
 * @returns A new Box instance.
 */
export function toBox(s: StringsInput, options?: BoxMakeOptions): Box;

export default Box;
