import Turtle from '../../src/turtle/Turtle.js';
import style from '../../src/line-styles/unicode.js';
import drawLineArt from '../../src/turtle/draw-line-art.js';
import {draw} from './utils.js';

const turtle = new Turtle(5, 5);
// draw single line border
turtle.forward(4).right().forward(4).right().forward(4).right().forward(4);
// draw middle cross with double lines
turtle.setTheme(2).set(2, 0).moveDown(4).set(0, 2).moveRight(4);

draw(drawLineArt(turtle, style));
