import {ClipOptions} from './strings/clip.js';

/** Options for `Box.make()`. */
export interface BoxMakeOptions {
  symbol?: string;
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

/** Options for `Box.addBottom()`. */
export interface AddBottomOptions {
  symbol?: string;
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

/** Options for `Box.addRight()`. */
export interface AddRightOptions {
  symbol?: string;
  align?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c';
}

/** A rectangular text container that normalizes string arrays so all lines have the same display width.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-box}
 */
export class Box {
  /** The array of strings representing the box content. */
  box: string[];

  /** Creates a Box from a string, string array, or another Box.
   * @param s - Input data.
   * @param normalized - If true, skip normalization.
   */
  constructor(s: Box | string | string[] | any, normalized?: boolean);

  /** The display width of the box in columns. */
  readonly width: number;
  /** The number of lines in the box. */
  readonly height: number;

  /** Creates a Box from various input types. */
  static make(s: any, options?: BoxMakeOptions): Box;
  /** Creates a blank Box filled with a symbol. */
  static makeBlank(width: number, height: number, symbol?: string): Box;

  /** Returns the box content as a string array. */
  toStrings(): string[];
  /** Returns a clone of this Box. */
  toBox(): Box;
  /** Creates a deep copy of this Box. */
  clone(): Box;
  /** Clips the box to a given width. */
  clip(width: number, options?: ClipOptions): Box;

  /** Pads the left and right sides with a symbol. */
  padLeftRight(left: number, right: number, symbol?: string): Box;
  /** Pads the top and bottom with a symbol. */
  padTopBottom(top: number, bottom: number, symbol?: string): Box;
  /** Pads the right side. */
  padRight(n: number, symbol?: string): Box;
  /** Pads the left side. */
  padLeft(n: number, symbol?: string): Box;
  /** Pads the top. */
  padTop(n: number, symbol?: string): Box;
  /** Pads the bottom. */
  padBottom(n: number, symbol?: string): Box;
  /** Pads using CSS-style shorthand (top, right, bottom, left). */
  pad(t: number, r?: number | string, b?: number | string, l?: number | string, symbol?: string): Box;

  /** Removes `n` rows starting at row `y`. */
  removeRows(y: number, n: number): Box;

  /** Appends another box below this one. */
  addBottom(box: any, options?: AddBottomOptions): Box;
  /** Appends another box to the right of this one. */
  addRight(box: any, options?: AddRightOptions): Box;

  /** Flips the box vertically. */
  flipV(): Box;
}

export function toBox(s: any, options?: BoxMakeOptions): Box;

export default Box;
