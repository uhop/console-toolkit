import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/table/style-unicode.js';
import {draw} from './utils.js';

const box1 = drawTable(style, [1, 1, 1, 1, 2, 1, 2], [1, 1, 1, 1, 2, 1, 2]);

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

draw(box1, box2, box3);