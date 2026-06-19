import blockFrac from '../../src/charts/columns/block-frac.js';
import plain from '../../src/charts/columns/plain.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

// 5 bins, three of them zero.
const data = [0, 1, 0, 2, 0];
const theme = [{colorState: style.brightCyan.getState()}];

// plain — correct: keeps all 5 slots (zero bins are empty columns).
console.log('plain [0, 1, 0, 2, 0] — expected 5 columns:');
draw(plain(data, 4, {theme}));

// block-frac — correct: keeps all 5 slots (zero bins are empty columns).
console.log('\nblock-frac [0, 1, 0, 2, 0] — expected 5 columns:');
draw(blockFrac(data, 4, {theme, rectSize: 0.875}));
