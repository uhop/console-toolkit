import {draw as drawTable} from '../../src/table.js';

const draw = box => box.forEach(line => console.log(line));

const box1 = drawTable([1, 0, 1], [1, 0, 1]);
draw(box1);

const box2 = drawTable([2, 0, 2], [2, 0, 2]);
draw(box2);

const box3 = drawTable([1, 0, 2], [1, 0, 2]);
draw(box3);

const box4 = drawTable([2, 0, 1], [2, 0, 1]);
draw(box4);
