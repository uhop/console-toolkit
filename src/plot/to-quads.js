import Box from '../box.js';
import {quadrants} from '../symbols.js';

/** Converts a Bitmap to a Box using Unicode quadrant characters (2x2 pixels per character).
 * Provides higher resolution representation than `toBox()`.
 * @param {import('./bitmap.js').Bitmap} bmp - The bitmap to convert.
 * @returns {import('../box.js').Box} A Box with quadrant characters.
 */
export const toQuads = bmp => {
  const result = [],
    rowSize = Math.floor((bmp.width + 1) / 2),
    accumulator = new Array(rowSize).fill(0);
  for (let k = 0, kBase = 0; k < bmp.lineCount; ++k, kBase += bmp.blockHeight) {
    const iLimit = Math.min(bmp.blockHeight, bmp.height - kBase);
    for (let i = 0; i < iLimit; ++i) {
      for (let j = 0, jBase = 0; j < bmp.lineSize; ++j, jBase += bmp.blockWidth) {
        const index = k * bmp.lineSize + j,
          word = bmp.bitmap[index],
          mLimit = Math.min(bmp.blockWidth, bmp.width - jBase);
        let mask = 1 << (bmp.blockWidth * i);
        for (let m = 0; m < mLimit; ++m, mask <<= 1) {
          accumulator[(jBase + m) >> 1] += word & mask ? ((kBase + i) & 1 ? 4 : 1) << ((jBase + m) & 1) : 0;
        }
      }
      if ((kBase + i) & 1) {
        result.push(accumulator.map(i => quadrants[i]).join(''));
        if (kBase + i + 1 < bmp.height) accumulator.fill(0);
      }
    }
  }
  if (bmp.height & 1) {
    result.push(accumulator.map(i => quadrants[i]).join(''));
  }
  return new Box(result, true);
};

export default toQuads;
