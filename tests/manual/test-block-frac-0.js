import {drawRealHeightBlock} from '../../src/draw-block-frac.js';
import {draw} from './utils.js';

draw(
  drawRealHeightBlock(2, 2),
  drawRealHeightBlock(2, 2.001),
  drawRealHeightBlock(2, 2.125),
  drawRealHeightBlock(2, 2.25),
  drawRealHeightBlock(2, 2.375),
  drawRealHeightBlock(2, 2.5),
  drawRealHeightBlock(2, 2.625),
  drawRealHeightBlock(2, 2.75),
  drawRealHeightBlock(2, 2.875),
  drawRealHeightBlock(2, 2.999),
  drawRealHeightBlock(2, 3)
);
