import Box from '../box.js';
import {Bitmap} from './bitmap.js';

/** Converts a Bitmap to a Box using Unicode quadrant characters (2x2 pixels per character).
 * @param bmp - The source bitmap.
 * @returns A Box representation using quadrant characters.
 */
export function toQuads(bmp: Bitmap): Box;

export default toQuads;
