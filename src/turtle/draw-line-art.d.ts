import Box from '../box.js';
import Turtle from './turtle.js';
import {LineTheme} from '../themes/utils.js';

/** Options for `draw()`. */
export interface DrawLineArtOptions {
  /** Character to use for ignored (empty) cells. */
  ignore?: string;
}

/** Draws a Turtle's path as line art using a line theme.
 * @param turtle - The Turtle instance.
 * @param lineTheme - Line theme object defining line characters.
 * @param options - Draw options.
 * @returns A Box containing the drawn line art.
 */
export function draw(turtle: Turtle, lineTheme: LineTheme, options?: DrawLineArtOptions): Box;

export default draw;
