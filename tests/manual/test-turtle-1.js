import Turtle from '../../src/turtle/Turtle.js';
import lineTheme from '../../src/line-themes/unicode-rounded.js';
import drawLineArt from '../../src/turtle/draw-line-art.js';
import Panel from '../../src/Panel.js';
import {draw} from './utils.js';

const turtle = new Turtle(5, 1).markHalfDown().forward(2).markHalfUp().forward(2).markHalfDown(),
  branch = drawLineArt(turtle, lineTheme),
  panel = new Panel(7, 5)
    .put(2, 1, branch)
    .put(4, 0, '2')
    .put(2, 2, '4')
    .put(6, 2, '5')
    .put(0, 3, branch)
    .put(0, 4, '1')
    .put(4, 4, '3');

draw(panel);
