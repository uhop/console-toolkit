import Turtle from './turtle.js';
import { draw } from './draw-unicode.js';
import Box from '../box.js';

declare module './turtle.js' {
  interface Turtle {
    toBox(options?: { ignore?: string; useArcs?: boolean }): Box;
    toStrings(options?: { ignore?: string; useArcs?: boolean }): string[];
  }
}

export { Turtle, draw };
export default Turtle;
