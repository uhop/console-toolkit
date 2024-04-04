import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/table/style-ascii-fancy.js';

const draw = box => box.forEach(line => console.log(line));

const box1 = drawTable(style, ['g', 1, 'g', 1, 'g', 1, 'g'], ['g', 1, 'g', 1, 'g', 1, 'g']);
draw(box1);

const box2 = drawTable(
  style,
  ['g', 1, 'g', 1, 'g', 1, 'g'],
  ['g', 1, 'g', 1, 'g', 1, 'g'],
  [
    {x: 1, y: 5, width: 3, height: 1},
    {x: 1, y: 1, width: 3, height: 3}
  ]
);
draw(box2);
