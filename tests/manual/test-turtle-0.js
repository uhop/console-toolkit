import Turtle from '../../src/turtle/Turtle.js';
import styleUnicode from '../../src/themes/lines/unicode.js';
import styleAsciiRounded from '../../src/themes/lines/ascii-rounded.js';
import drawLineArt from '../../src/turtle/draw-line-art.js';
import {draw} from './utils.js';

const turtle1 = new Turtle(5, 5);
// draw single line border
turtle1.forward(4).right().forward(4).right().forward(4).right().forward(4);
// draw middle cross with double lines
turtle1.setTheme(2).set(2, 0).moveDown(4).set(0, 2).moveRight(4);

const turtle2 = new Turtle(5, 5);
// draw single line border
turtle2.forward(4).right().forward(4).right().forward(4).right().forward(4);
// draw horizontal double lines
turtle2.set(2, 0).moveDown(4).setTheme(2).set(0, 0).moveRight(4).set(0, 2).moveRight(4).set(0, 4).moveRight(4);

draw(drawLineArt(turtle1, styleUnicode), drawLineArt(turtle2, styleUnicode), drawLineArt(turtle2, styleAsciiRounded));
