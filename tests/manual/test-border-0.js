import drawBorder from '../../src/draw-border.js';
import lineStyle from '../../src/line-themes/unicode.js';
import {draw} from './utils.js';

draw(
  drawBorder(4, 2, lineStyle),
  drawBorder(4, 2, lineStyle, {theme: 2}),
  drawBorder(4, 2, lineStyle, {hTheme: 2}),
  drawBorder(4, 2, lineStyle, {bottom: 2, right: 2})
);
