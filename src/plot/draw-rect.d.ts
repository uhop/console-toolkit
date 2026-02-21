import {Bitmap} from './bitmap.js';

/** Draws a filled rectangle on a Bitmap.
 * @param bmp - The target bitmap.
 * @param x0 - Left X.
 * @param y0 - Top Y.
 * @param x1 - Right X.
 * @param y1 - Bottom Y.
 * @param value - Bit value to set (default: 1).
 */
export function drawRect(bmp: Bitmap, x0: number, y0: number, x1: number, y1: number, value?: number): void;

export default drawRect;
