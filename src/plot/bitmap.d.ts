import Box from '../box.js';

/** A bitmap for drawing pixels, stored as a compact bit-packed array.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-plot}
 */
export class Bitmap {
  /** Width in pixels. */
  width: number;
  /** Height in pixels. */
  height: number;
  /** Width of a character block in pixels (default: 2). */
  blockWidth: number;
  /** Height of a character block in pixels (default: 4). */
  blockHeight: number;
  /** Number of words per line. */
  lineSize: number;
  /** Number of lines. */
  lineCount: number;
  /** The underlying bit-packed array. */
  bitmap: number[];

  /**
   * @param width - Width in pixels.
   * @param height - Height in pixels.
   * @param blockWidth - Pixels per character column (default: 2).
   * @param blockHeight - Pixels per character row (default: 4).
   */
  constructor(width: number, height: number, blockWidth?: number, blockHeight?: number);

  /** Verifies that (x, y) is within bounds.
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @returns This Bitmap.
   * @throws If out of bounds.
   */
  verifyPos(x: number, y: number): this;
  /** Returns the word index for the given position.
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @returns The word index.
   */
  getWordIndex(x: number, y: number): number;
  /** Returns the bit mask for the given position.
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @returns The bit mask.
   */
  getWordMask(x: number, y: number): number;

  /** Gets the bit value at (x, y).
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @returns 1 if set, 0 if clear.
   */
  getBit(x: number, y: number): number;
  /** Sets the bit value at (x, y).
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @param value - Bit value (default: 1).
   * @returns This Bitmap.
   */
  setBit(x: number, y: number, value?: number): this;
  /** Alias for `setBit`. */
  set: Bitmap['setBit'];

  /** Clears the bitmap.
   * @param value - If true, set all bits; if false, clear all (default: false).
   * @returns This Bitmap.
   */
  clear(value?: boolean): this;

  /** Converts the bitmap to a Box using the given characters.
   * @param one - Character for set bits (default: full block).
   * @param zero - Character for clear bits (default: space).
   * @returns A Box representation.
   */
  toBox(one?: string, zero?: string): Box;
}

export default Bitmap;
