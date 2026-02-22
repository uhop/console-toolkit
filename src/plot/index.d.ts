import {Bitmap} from './bitmap.js';
import {drawLine} from './draw-line.js';
import {drawRect} from './draw-rect.js';
import {toQuads} from './to-quads.js';
import Box from '../box.js';

declare module './bitmap.js' {
  interface Bitmap {
    /** Draws a line on this bitmap.
     * @param x0 - Start X.
     * @param y0 - Start Y.
     * @param x1 - End X.
     * @param y1 - End Y.
     * @param value - Bit value.
     * @returns This Bitmap.
     */
    line(x0: number, y0: number, x1: number, y1: number, value?: number): Bitmap;
    /** Draws a filled rectangle on this bitmap.
     * @param x0 - First corner x coordinate.
     * @param y0 - First corner y coordinate.
     * @param x1 - Opposite corner x coordinate.
     * @param y1 - Opposite corner y coordinate.
     * @param value - Bit value.
     * @returns This Bitmap.
     */
    rect(x0: number, y0: number, x1: number, y1: number, value?: number): Bitmap;
    /** Converts this bitmap to a Box using quadrant characters.
     * @returns A Box.
     */
    toQuads(): Box;
    /** Converts this bitmap to a string array via `toBox()`.
     * @returns Array of strings.
     */
    toStrings(): string[];
  }
}

export {Bitmap, drawLine, drawRect, toQuads};
export default Bitmap;
