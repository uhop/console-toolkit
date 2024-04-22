import test from 'tape-six';

import lineTheme from '../src/themes/lines/unicode.js';
import {draw as drawBorders} from '../src/table/index.js';
import {Turtle, draw as drawTurtle} from '../src/turtle/index.js';
import drawLineArt from '../src/turtle/draw-line-art.js';

test('Turtle', async t => {
  await t.test('Draw an axis', t => {
    const turtle = new Turtle(5, 1).markHalfDown().forward(2).markHalfUp().forward(2).markHalfDown(),
      axis = drawLineArt(turtle, lineTheme);
    t.deepEqual(axis.box, ['┌─┴─┐']);
  });

  await t.test('Compare with table', t => {
    const hTheme = 1,
      vTheme = 1;

    const table = drawBorders(
      lineTheme,
      [vTheme, 1, vTheme, 1, vTheme, 1, vTheme, 1, vTheme, 1, vTheme],
      [hTheme, 1, hTheme, 1, hTheme, 1, hTheme, 1, hTheme, 1, hTheme],
      {
        skip: [{x: 3, y: 3, width: 5, height: 5}]
      }
    );

    const turtle = drawTurtle(
      new Turtle(11, 11)
        .setTheme(hTheme)
        .setDirection(Turtle.RIGHT)
        .set(0, 0)
        .forward(10)
        .set(0, 2)
        .forward(10)
        .set(0, 4)
        .forward(2)
        .setX(8)
        .forward(2)
        .set(0, 6)
        .forward(2)
        .setX(8)
        .forward(2)
        .set(0, 8)
        .forward(10)
        .set(0, 10)
        .forward(10)
        .setTheme(vTheme)
        .setDirection(Turtle.DOWN)
        .set(0, 0)
        .forward(10)
        .set(2, 0)
        .forward(10)
        .set(4, 0)
        .forward(2)
        .setY(8)
        .forward(2)
        .set(6, 0)
        .forward(2)
        .setY(8)
        .forward(2)
        .set(8, 0)
        .forward(10)
        .set(10, 0)
        .forward(10)
    );

    t.deepEqual(turtle.box, table.box);
  });
});
