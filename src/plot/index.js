import Bitmap from './Bitmap.js';
import drawLine from './draw-line.js';
import drawRect from './draw-rect.js';
import toQuads from './to-quads.js';

// patch Bitmap

Bitmap.prototype.line = function (...args) {
  drawLine(this, ...args);
  return this;
};
Bitmap.prototype.rect = function (...args) {
  drawRect(this, ...args);
  return this;
};
Bitmap.prototype.toQuads = function () {
  return toQuads(this);
};

export {Bitmap, drawLine, drawRect, toQuads};
export default Bitmap;
