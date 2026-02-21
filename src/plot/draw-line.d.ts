import {Bitmap} from './bitmap.js';

/** Draws a line on a Bitmap using Bresenham's algorithm.
 * @param bmp - The target bitmap.
 * @param x0 - Start X.
 * @param y0 - Start Y.
 * @param x1 - End X.
 * @param y1 - End Y.
 * @param value - Bit value to set (default: 1).
 */
export function drawLine(bmp: Bitmap, x0: number, y0: number, x1: number, y1: number, value?: number): void;

export default drawLine;
