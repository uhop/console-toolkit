import test from 'tape-six';

import {draw} from '../src/table/index.js';
import {style} from '../src/line-styles/unicode-rounded.js';

test('Draw a table with skip rectangles', async t => {
  await t.test('Round table with two merged cells', t => {
    const box = draw(
      style,
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [
        {x: 1, y: 5, width: 3, height: 1},
        {x: 1, y: 1, width: 3, height: 3}
      ]
    );

    t.equal(box.length, 7);
    t.equal(box[0].length, 7);

    t.deepEqual(box, ['╭───┬─╮', '│   │ │', '│   ├─┤', '│   │ │', '├───┼─┤', '│   │ │', '╰───┴─╯']);
  });

  await t.test('Double lines outside, single lines inside', t => {
    const box = draw(
      style,
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [
        {x: 1, y: 1, width: 2, height: 1},
        {x: 1, y: 2, width: 1, height: 2},
        {x: 3, y: 3, width: 3, height: 3}
      ]
    );

    t.equal(box.length, 7);
    t.equal(box[0].length, 7);

    t.deepEqual(box, ['╭───┬─╮', '│   │ │', '│ ╭─┴─┤', '│ │   │', '├─┤   │', '│ │   │', '╰─┴───╯']);
  });
});
