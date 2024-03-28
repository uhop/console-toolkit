import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/table/style-unicode-bold.js';

const draw = box => box.forEach(line => console.log(line));

const box1 = drawTable(style, [1, 1, 1, 0, 1], [1, 1, 1, 0, 1]);
draw(box1);

const box2 = drawTable(style, [2, 1, 1, 0, 2], [2, 1, 1, 0, 2]);
draw(box2);

const box3 = drawTable(style, [1, 1, 2, 0, 1], [1, 1, 2, 0, 1]);
draw(box3);

const box4 = drawTable(style, [1, 1, 2, 0, 2], [1, 1, 2, 0, 2]);
draw(box4);
