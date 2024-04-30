import Turtle from './turtle.js';
import draw from './draw-unicode.js';

Turtle.prototype.toBox = function (options) {
  return draw(this, options);
};
Turtle.prototype.toStrings = function (options) {
  return this.toBox(options).toStrings();
};

export {Turtle, draw};
export default Turtle;
