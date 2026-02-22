import {Bitmap} from './bitmap.js';

/** Draws a filled rectangle on a Bitmap.
 * @param bmp - The target bitmap.
 * @param x0 - First corner x coordinate.
 * @param y0 - First corner y coordinate.
 * @param x1 - Opposite corner x coordinate.
 * @param y1 - Opposite corner y coordinate.
 * @param value - Bit value to set (default: 1).
 */
export function drawRect(bmp: Bitmap, x0: number, y0: number, x1: number, y1: number, value?: number): void;

export default drawRect;
