import Box from '../box.js';
import Turtle from './turtle.js';

export interface DrawLineArtOptions {
  ignore?: string;
}

export function draw(turtle: Turtle, lineTheme: Record<string, any>, options?: DrawLineArtOptions): Box;

export default draw;
