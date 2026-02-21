import Box from '../box.js';
import { Bitmap } from './bitmap.js';

/** Converts a Bitmap to a Box using Unicode quadrant characters (2x2 pixels per character). */
export function toQuads(bmp: Bitmap): Box;

export default toQuads;
