import Bitmap from './bitmap.js';
import drawLine from './draw-line.js';
import drawRect from './draw-rect.js';
import toQuads from './to-quads.js';

// patch Bitmap

/** Draws a line on this bitmap.
 * @param {number} x0 - Start X.
 * @param {number} y0 - Start Y.
 * @param {number} x1 - End X.
 * @param {number} y1 - End Y.
 * @param {number} [value=1] - Bit value.
 * @returns {this}
 */
Bitmap.prototype.line = function (...args) {
  drawLine(this, ...args);
  return this;
};
/** Draws a filled rectangle on this bitmap.
 * @param {number} x0 - First corner x coordinate.
 * @param {number} y0 - First corner y coordinate.
 * @param {number} x1 - Opposite corner x coordinate.
 * @param {number} y1 - Opposite corner y coordinate.
 * @param {number} [value=1] - Bit value.
 * @returns {this}
 */
Bitmap.prototype.rect = function (...args) {
  drawRect(this, ...args);
  return this;
};
/** Converts this bitmap to a Box using quadrant characters.
 * @returns {import('../box.js').default}
 */
Bitmap.prototype.toQuads = function () {
  return toQuads(this);
};
/** Converts this bitmap to a string array via `toBox()`.
 * @returns {string[]}
 */
Bitmap.prototype.toStrings = function () {
  return this.toBox().toStrings();
};

export {Bitmap, drawLine, drawRect, toQuads};
export default Bitmap;
