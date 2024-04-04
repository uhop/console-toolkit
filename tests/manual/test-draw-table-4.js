import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/table/style-ascii.js';
import {draw} from './utils.js';

const box1 = drawTable(style, [1, 5, 1, 3, 1], [1, 1, 1, 1, 1]);
const box2 = drawTable(style, [1, 5, 1, 3, 1], [1, 1, 0, 1, 2]);

draw(box1, box2);
