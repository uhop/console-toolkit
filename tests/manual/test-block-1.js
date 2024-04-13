import {drawFrame} from '../../src/draw-block.js';
import lineTheme from '../../src/themes/lines/unicode.js';
import {draw} from './utils.js';

draw(
  drawFrame(4, 2, lineTheme),
  drawFrame(4, 2, lineTheme, {theme: 2}),
  drawFrame(4, 2, lineTheme, {hTheme: 2}),
  drawFrame(4, 2, lineTheme, {bottom: 2, right: 2})
);
