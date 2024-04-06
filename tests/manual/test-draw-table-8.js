import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/line-styles/style-unicode-rounded.js';
import {draw} from './utils.js';

const box1 = drawTable(style, [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1]);

const box2 = drawTable(
  style,
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [
    {x: 1, y: 5, width: 3, height: 1},
    {x: 1, y: 1, width: 3, height: 3}
  ]
);

const box3 = drawTable(
  style,
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [
    {x: 1, y: 1, width: 2, height: 1},
    {x: 1, y: 2, width: 1, height: 2},
    {x: 3, y: 3, width: 3, height: 3}
  ]
);

draw(box1, box2, box3);
