import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/table/style-ascii.js';

const draw = box => box.forEach(line => console.log(line));

const box1 = drawTable(style, [1, 2, 1, 1, 1], [1, 2, 1, 1, 1]);
draw(box1);

console.log(' ');

const box4 = drawTable(style, [1, 2, 1, 1, 1], [1, 2, 2, 1, 2]);
draw(box4);
