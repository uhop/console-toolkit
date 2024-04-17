import Bitmap from '../../src/plot/index.js';
import {draw} from './utils.js';

const bmp1 = new Bitmap(7, 7).line(0, 0, 6, 6).line(0, 6, 6, 0).rect(1, 1, 5, 5, -1),
  bmp2 = new Bitmap(7, 7).rect(1, 1, 5, 5).line(0, 0, 6, 6, -1).line(0, 6, 6, 0, -1),
  bmp3 = new Bitmap(7, 7).rect(1, 1, 5, 5).line(3, 0, 3, 6, -1).line(0, 3, 6, 3, -1),
  bmp4 = new Bitmap(7, 7).line(3, 0, 3, 6).line(0, 3, 6, 3).rect(1, 1, 5, 5, -1);

draw(bmp1.toQuads(), bmp2.toQuads(), bmp3.toQuads(), bmp4.toQuads());
