import {draw as drawTable} from '../../src/table/index.js';
import {style} from '../../src/line-styles/ascii.js';
import {draw} from './utils.js';

const box1 = drawTable(style, [1, 2, 1, 1, 1], [1, 2, 1, 1, 1]);
const box2 = drawTable(style, [1, 2, 1, 1, 1], [1, 2, 2, 1, 2]);

draw(box1, box2);
