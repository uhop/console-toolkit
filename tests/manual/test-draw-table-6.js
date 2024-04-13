import {draw as drawTable} from '../../src/table/draw-borders.js';
import lineTheme from '../../src/themes/lines/unicode.js';
import {draw} from './utils.js';

const box1 = drawTable(lineTheme, [1, 1, 1, 1, 2, 1, 2], [1, 1, 1, 1, 2, 1, 2]);

const box2 = drawTable(lineTheme, [1, 1, 1, 1, 2, 1, 2], [1, 1, 1, 1, 2, 1, 2], {
  skip: [
    {x: 1, y: 1, width: 3, height: 1},
    {x: 1, y: 3, width: 1, height: 3},
    {x: 3, y: 3, width: 3, height: 1}
  ]
});

const box3 = drawTable(lineTheme, [1, 1, 1, 1, 2, 1, 2], [1, 1, 1, 1, 2, 1, 2], {
  skip: [
    {x: 1, y: 1, width: 3, height: 1},
    {x: 5, y: 1, width: 1, height: 3},
    {x: 3, y: 5, width: 3, height: 1},
    {x: 1, y: 3, width: 1, height: 3}
  ]
});

draw(box1, box2, box3);
