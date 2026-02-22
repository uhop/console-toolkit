import Turtle from './turtle.js';
import draw from './draw-unicode.js';

/** Draws the turtle's path as a Box using Unicode box-drawing characters.
 * @param {object} [options] - Draw options.
 * @returns {import('../box.js').default}
 */
Turtle.prototype.toBox = function (options) {
  return draw(this, options);
};
/** Draws the turtle's path as a string array using Unicode box-drawing characters.
 * @param {object} [options] - Draw options.
 * @returns {string[]}
 */
Turtle.prototype.toStrings = function (options) {
  return this.toBox(options).toStrings();
};

export {Turtle, draw};
export default Turtle;
