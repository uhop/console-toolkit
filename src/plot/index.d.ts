import {Bitmap} from './bitmap.js';
import {drawLine} from './draw-line.js';
import {drawRect} from './draw-rect.js';
import {toQuads} from './to-quads.js';
import Box from '../box.js';

declare module './bitmap.js' {
  interface Bitmap {
    line(x0: number, y0: number, x1: number, y1: number, value?: number): Bitmap;
    rect(x0: number, y0: number, x1: number, y1: number, value?: number): Bitmap;
    toQuads(): Box;
    toStrings(): string[];
  }
}

export {Bitmap, drawLine, drawRect, toQuads};
export default Bitmap;
