import Box from '../box.js';
import Turtle from './turtle.js';

export interface DrawUnicodeOptions {
  ignore?: string;
  useArcs?: boolean;
}

export function draw(turtle: Turtle, options?: DrawUnicodeOptions): Box;

export default draw;
