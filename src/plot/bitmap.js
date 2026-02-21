import Box from '../box.js';
import {addAlias} from '../meta.js';
import {fullBlock} from '../symbols.js';

/** A bitmap image using a compact bit-packed representation.
 * Supports setting/getting individual bits and converting to a Box for console display.
 */
export class Bitmap {
  /** Creates a new Bitmap.
   * @param {number} width - The width in pixels.
   * @param {number} height - The height in pixels.
   * @param {number} [blockWidth=5] - The width of each internal block (blockWidth * blockHeight <= 32).
   * @param {number} [blockHeight=5] - The height of each internal block.
   */
  constructor(width, height, blockWidth = 5, blockHeight = 5) {
    // parameters check
    width = Math.round(width);
    if (isNaN(width) || width <= 0) throw new Error(`Width should be a positive integer instead of "${width}"`);
    height = Math.round(height);
    if (isNaN(width) || height <= 0) throw new Error(`Height should be a positive integer instead of "${height}"`);
    blockWidth = Math.round(blockWidth);
    if (isNaN(width) || blockWidth <= 0)
      throw new Error(`Block width should be a positive integer instead of "${blockWidth}"`);
    blockHeight = Math.round(blockHeight);
    if (isNaN(width) || blockHeight <= 0)
      throw new Error(`Block height should be a positive integer instead of "${blockHeight}"`);
    if (isNaN(width) || blockWidth * blockHeight > 32)
      throw new Error("Multiplication of 'blockWidth' and 'blockHeight' should be equal or less than 32");

    this.width = width;
    this.height = height;
    this.blockWidth = blockWidth;
    this.blockHeight = blockHeight;

    // create a bitmap
    this.lineSize = Math.floor(this.width / this.blockWidth);
    if (this.width % this.blockWidth) ++this.lineSize;
    this.lineCount = Math.floor(this.height / this.blockHeight);
    if (this.height % this.blockHeight) ++this.lineCount;
    this.bitmap = new Array(this.lineCount * this.lineSize).fill(0);
  }

  verifyPos(x, y) {
    if (x < 0 || x >= this.width) throw new Error(`X is out of bounds: "${x}`);
    if (y < 0 || y >= this.height) throw new Error(`Y is out of bounds: "${y}`);
    return this;
  }

  getWordIndex(x, y) {
    const line = Math.floor(y / this.blockHeight),
      linePos = Math.floor(x / this.blockWidth);
    return line * this.lineSize + linePos;
  }

  getWordMask(x, y) {
    const shiftX = x % this.blockWidth,
      shiftY = y % this.blockHeight;
    return 1 << (shiftX + this.blockWidth * shiftY);
  }

  /** Gets the value of a bit at the given position.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @returns {number} Non-zero if the bit is set, 0 otherwise.
   */
  getBit(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
    const index = this.getWordIndex(x, y),
      mask = this.getWordMask(x, y);
    return this.bitmap[index] & mask;
  }

  /** Sets or clears a bit at the given position.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @param {number} [value=1] - Positive to set, 0 to clear, negative to toggle.
   * @returns {this}
   */
  setBit(x, y, value = 1) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return this;
    const index = this.getWordIndex(x, y),
      mask = this.getWordMask(x, y);
    this.bitmap[index] =
      value > 0 ? this.bitmap[index] | mask : value < 0 ? this.bitmap[index] ^ mask : this.bitmap[index] & ~mask;
    return this;
  }

  /** Clears the entire bitmap.
   * @param {boolean} [value=false] - If true, sets all bits; if false, clears all bits.
   * @returns {this}
   */
  clear(value) {
    this.bitmap.fill(value ? ~0 : 0);
    return this;
  }

  // toBox(one = fullBlock, zero = ' ') {
  //   // this algorithm is trivial, and not very efficient
  //   const result = [];
  //   for (let i = 0; i < this.height; ++i) {
  //     let row = '';
  //     for (let j = 0; j < this.width; ++j) row += this.getBit(j, i) ? one : zero;
  //     result.push(row);
  //   }
  //   return result;
  // }

  /** Converts the bitmap to a Box for console display.
   * @param {string} [one=fullBlock] - Character for set bits.
   * @param {string} [zero=' '] - Character for unset bits.
   * @returns {import('../box.js').Box} A Box representation of the bitmap.
   */
  toBox(one = fullBlock, zero = ' ') {
    const result = [];
    for (let k = 0, kBase = 0; k < this.lineCount; ++k, kBase += this.blockHeight) {
      const iLimit = Math.min(this.blockHeight, this.height - kBase);
      for (let i = 0; i < iLimit; ++i) {
        let row = '';
        for (let j = 0, jBase = 0; j < this.lineSize; ++j, jBase += this.blockWidth) {
          const index = k * this.lineSize + j,
            word = this.bitmap[index],
            mLimit = Math.min(this.blockWidth, this.width - jBase);
          let mask = 1 << (this.blockWidth * i);
          for (let m = 0; m < mLimit; ++m, mask <<= 1) {
            row += word & mask ? one : zero;
          }
        }
        result.push(row);
      }
    }
    return new Box(result, true);
  }
}

addAlias(Bitmap, 'set', 'setBit');

export default Bitmap;
