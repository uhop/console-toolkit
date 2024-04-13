import halfBlock from '../../src/themes/blocks/unicode-half.js';
import drawBlock from '../../src/draw-block.js';
import {draw} from './utils.js';

console.log('All sides:');
draw(drawBlock(3, 0, halfBlock));
console.log('No top:');
draw(drawBlock(3, 0, halfBlock, {top: 0}));
console.log('No bottom:');
draw(drawBlock(3, 0, halfBlock, {bottom: 0}));
console.log('No left:');
draw(drawBlock(3, 0, halfBlock, {left: 0}));
console.log('No right:');
draw(drawBlock(3, 0, halfBlock, {right: 0}));
console.log('No left and right:');
draw(drawBlock(3, 0, halfBlock, {left: 0, right: 0}));
