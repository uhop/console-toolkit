import drawBorder from '../../src/draw-border.js';
import lineTheme from '../../src/line-themes/unicode.js';
import {draw} from './utils.js';

draw(
  drawBorder(4, 2, lineTheme),
  drawBorder(4, 2, lineTheme, {theme: 2}),
  drawBorder(4, 2, lineTheme, {hTheme: 2}),
  drawBorder(4, 2, lineTheme, {bottom: 2, right: 2})
);
