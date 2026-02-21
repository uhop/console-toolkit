import Box from '../box.js';
import Turtle from './turtle.js';

export interface DrawLineArtOptions {
  ignore?: string;
}

/** Draws a Turtle's path as line art using a line theme. */
export function draw(turtle: Turtle, lineTheme: Record<string, any>, options?: DrawLineArtOptions): Box;

export default draw;
