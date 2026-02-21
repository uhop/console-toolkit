import Box from '../box.js';
import Turtle from './turtle.js';

/** Options for `draw()`. */
export interface DrawUnicodeOptions {
  /** Character to use for ignored (empty) cells. */
  ignore?: string;
  /** If true, use arc characters for corners instead of sharp corners. */
  useArcs?: boolean;
}

/** Draws a Turtle's path using Unicode box-drawing characters.
 * @param turtle - The Turtle instance.
 * @param options - Draw options.
 * @returns A Box containing the drawn path.
 */
export function draw(turtle: Turtle, options?: DrawUnicodeOptions): Box;

export default draw;
