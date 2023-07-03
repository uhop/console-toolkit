import {draw as drawTable} from '../../src/table.js';

const draw = box => box.forEach(line => console.log(line));

const box1 = drawTable([1, 1, 1], [1, 1, 1]);
draw(box1);

const box2 = drawTable([2, 1, 2], [2, 1, 2]);
draw(box2);

const box3 = drawTable([1, 1, 2], [1, 1, 2]);
draw(box3);

const box4 = drawTable([2, 1, 1], [2, 1, 1]);
draw(box4);
