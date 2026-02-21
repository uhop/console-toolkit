import Box from '../box.js';

/** A bitmap for drawing pixels, stored as a compact bit-packed array.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-plot}
 */
export class Bitmap {
  width: number;
  height: number;
  blockWidth: number;
  blockHeight: number;
  lineSize: number;
  lineCount: number;
  bitmap: number[];

  constructor(width: number, height: number, blockWidth?: number, blockHeight?: number);

  verifyPos(x: number, y: number): this;
  getWordIndex(x: number, y: number): number;
  getWordMask(x: number, y: number): number;

  /** Gets the bit value at (x, y). */
  getBit(x: number, y: number): number;
  /** Sets the bit value at (x, y). */
  setBit(x: number, y: number, value?: number): this;
  set: Bitmap['setBit'];

  /** Clears the bitmap. */
  clear(value?: boolean): this;

  /** Converts the bitmap to a Box using the given characters. */
  toBox(one?: string, zero?: string): Box;
}

export default Bitmap;
