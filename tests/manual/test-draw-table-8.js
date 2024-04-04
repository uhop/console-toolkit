import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/table/style-unicode.js';

const draw = box => box.forEach(line => console.log(line));

const box1 = drawTable(style, ['r', 1, 'r', 1, 'r', 1, 'r'], ['r', 1, 'r', 1, 'r', 1, 'r']);
draw(box1);

const box2 = drawTable(
  style,
  ['r', 1, 'r', 1, 'r', 1, 'r'],
  ['r', 1, 'r', 1, 'r', 1, 'r'],
  [
    {x: 1, y: 5, width: 3, height: 1},
    {x: 1, y: 1, width: 3, height: 3}
  ]
);
draw(box2);
