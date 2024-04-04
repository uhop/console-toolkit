import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/table/style-unicode.js';

const draw = box => box.forEach(line => console.log(line));

const box1 = drawTable(style, [1, 1, 1, 1, 2, 1, 2], [1, 1, 1, 1, 2, 1, 2]);
draw(box1);

const box2 = drawTable(
  style,
  [1, 1, 1, 1, 2, 1, 2],
  [1, 1, 1, 1, 2, 1, 2],
  [
    {x: 1, y: 1, width: 3, height: 1},
    {x: 1, y: 3, width: 1, height: 3},
    {x: 3, y: 3, width: 3, height: 1}
  ]
);
draw(box2);

const box3 = drawTable(
  style,
  [1, 1, 1, 1, 2, 1, 2],
  [1, 1, 1, 1, 2, 1, 2],
  [
    {x: 1, y: 1, width: 3, height: 1},
    {x: 5, y: 1, width: 1, height: 3},
    {x: 3, y: 5, width: 3, height: 1},
    {x: 1, y: 3, width: 1, height: 3}
  ]
);
draw(box3);
