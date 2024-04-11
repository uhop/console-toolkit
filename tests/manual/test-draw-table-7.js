import {draw as drawTable} from '../../src/table/draw-borders.js';
import {style} from '../../src/line-styles/ascii-girder.js';
import {draw} from './utils.js';

const box1 = drawTable(style, ['g', 1, 'g', 1, 'g', 1, 'g'], ['g', 1, 'g', 1, 'g', 1, 'g']);

const box2 = drawTable(style, ['g', 1, 'g', 1, 'g', 1, 'g'], ['g', 1, 'g', 1, 'g', 1, 'g'], {
  skip: [
    {x: 3, y: 5, width: 3, height: 1},
    {x: 1, y: 1, width: 3, height: 3}
  ]
});

draw(box1, box2);
