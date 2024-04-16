import Bitmap from '../../src/plot/index.js';
import {draw} from './utils.js';

const bmp = new Bitmap(15, 7)
  .line(0, 0, 30, 6)
  .line(0, 6, 30, 0)
  .set(0, 3)
  .set(1, 2)
  .set(1, 4)
  .rect(13, 0, 14, 0)
  .rect(13, 6, 14, 6);
draw(bmp.toQuads());
