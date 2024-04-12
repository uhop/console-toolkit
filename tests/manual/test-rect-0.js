import drawRect from '../../src/rect.js';
import lineStyle from '../../src/line-styles/unicode.js';
import {draw} from './utils.js';

draw(
  drawRect(4, 2, lineStyle),
  drawRect(4, 2, lineStyle, {theme: 2}),
  drawRect(4, 2, lineStyle, {hTheme: 2}),
  drawRect(4, 2, lineStyle, {bottom: 2, right: 2})
);
