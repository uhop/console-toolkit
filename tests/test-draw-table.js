import test from 'tape-six';

import {draw} from '../src/table/draw-borders.js';
import lineTheme from '../src/line-themes/unicode.js';

test('Draw a table', async t => {
  await t.test('Single lines', t => {
    const box = draw(lineTheme, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);

    t.equal(box.height, 4);
    t.equal(box.width, 4);

    t.deepEqual(box.box, ['┌─┬┐', '│ ││', '├─┼┤', '└─┴┘']);
  });

  await t.test('Double lines outside, single lines inside', t => {
    const box = draw(lineTheme, [2, 1, 1, 0, 2], [2, 1, 1, 0, 2]);

    t.equal(box.height, 4);
    t.equal(box.width, 4);

    t.deepEqual(box.box, ['╔═╤╗', '║ │║', '╟─┼╢', '╚═╧╝']);
  });

  await t.test('Single lines outside, double lines inside', t => {
    const box = draw(lineTheme, [1, 1, 2, 0, 1], [1, 1, 2, 0, 1]);

    t.equal(box.height, 4);
    t.equal(box.width, 4);

    t.deepEqual(box.box, ['┌─╥┐', '│ ║│', '╞═╬╡', '└─╨┘']);
  });

  await t.test('Mix of single and double lines', t => {
    const box = draw(lineTheme, [1, 1, 2, 0, 2], [1, 1, 2, 0, 2]);

    t.equal(box.height, 4);
    t.equal(box.width, 4);

    t.deepEqual(box.box, ['┌─╥╖', '│ ║║', '╞═╬╣', '╘═╩╝']);
  });
});
