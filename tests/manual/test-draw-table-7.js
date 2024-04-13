import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineStyle from '../../src/line-themes/ascii-girder.js';
import {draw} from './utils.js';

const box1 = drawTable(lineStyle, [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1]);

const box2 = drawTable(lineStyle, [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], {
  skip: [
    {x: 3, y: 5, width: 3, height: 1},
    {x: 1, y: 1, width: 3, height: 3}
  ]
});

draw(box1, box2);
