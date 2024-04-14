import {drawRealHeightBlock} from '../../src/draw-block-frac.js';
import {draw} from './utils.js';

draw(
  drawRealHeightBlock(2, 2, true),
  drawRealHeightBlock(2, 2.001, true),
  drawRealHeightBlock(2, 2.125, true),
  drawRealHeightBlock(2, 2.25, true),
  drawRealHeightBlock(2, 2.375, true),
  drawRealHeightBlock(2, 2.5, true),
  drawRealHeightBlock(2, 2.625, true),
  drawRealHeightBlock(2, 2.75, true),
  drawRealHeightBlock(2, 2.875, true),
  drawRealHeightBlock(2, 2.999, true),
  drawRealHeightBlock(2, 3, true)
);
