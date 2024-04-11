import test from 'tape-six';

import lineStyle from '../src/line-styles/unicode.js';
import {draw as drawBorders} from '../src/table/index.js';
import {Turtle, draw as drawTurtle} from '../src/turtle/index.js';

test('Turtle', async t => {
  await t.test('Compare with table', t => {
    const hTheme = 1,
      vTheme = 1;

    const table = drawBorders(
      lineStyle,
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
