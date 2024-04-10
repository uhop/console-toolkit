import Turtle from '../../src/turtle/Turtle.js';
import style from '../../src/line-styles/unicode.js';
import drawUnicode from '../../src/turtle/draw-unicode.js';
import {draw} from './utils.js';

const turtle1 = new Turtle(5, 5);
// draw single line border
turtle1.forward(4).right().forward(4).right().forward(4).right().forward(4);
// draw middle cross with double lines
turtle1.setTheme(2).set(2, 0).moveDown(4).set(0, 2).moveRight(4);

const turtle2 = new Turtle(5, 5);
// draw single line border
turtle2.forward(4).right().forward(4).right().forward(4).right().forward(4);
// draw middle cross with double lines
turtle2.setTheme(2).set(2, 0).moveDown(4).set(0, 2).moveRight(4);
// overrides some lines
turtle2.setTheme(1).set(2, 0).moveDown(2).set(0, 2).moveRight(2);

draw(drawUnicode(turtle1), drawUnicode(turtle2));
