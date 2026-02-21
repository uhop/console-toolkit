import Turtle from './turtle.js';
import {draw} from './draw-unicode.js';
import Box from '../box.js';

declare module './turtle.js' {
  interface Turtle {
    /** Draws the turtle's path as a Box using Unicode box-drawing characters.
     * @param options - Draw options.
     * @returns A Box containing the drawn path.
     */
    toBox(options?: {ignore?: string; useArcs?: boolean}): Box;
    /** Draws the turtle's path as a string array using Unicode box-drawing characters.
     * @param options - Draw options.
     * @returns Array of strings.
     */
    toStrings(options?: {ignore?: string; useArcs?: boolean}): string[];
  }
}

export {Turtle, draw};
export default Turtle;
