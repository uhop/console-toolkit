import plain from '../../src/charts/bars/plain.js';
import block from '../../src/charts/bars/block.js';
import blockFrac from '../../src/charts/bars/block-frac.js';
import plainGrouped from '../../src/charts/bars/plain-grouped.js';
import blockGrouped from '../../src/charts/bars/block-grouped.js';
import blockFracGrouped from '../../src/charts/bars/block-frac-grouped.js';
import fracGrouped from '../../src/charts/bars/frac-grouped.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

// 3 bars, the middle one zero — every renderer should keep all 3 row slots.
const data = [3, 0, 2];
const theme = [{colorState: style.brightCyan.getState()}];

const stacked = [
  ['plain', plain, {theme}],
  ['block', block, {theme}],
  ['block-frac', blockFrac, {theme, rectSize: 0.875}]
];
for (const [name, fn, options] of stacked) {
  console.log(`bars/${name} [3, 0, 2] — expected 3 rows (middle empty):`);
  draw(fn(data, 8, options));
  console.log();
}

const grouped = [
  ['plain-grouped', plainGrouped, {theme}],
  ['block-grouped', blockGrouped, {theme}],
  ['block-frac-grouped', blockFracGrouped, {theme, rectSize: 0.875}],
  ['frac-grouped', fracGrouped, {theme}]
];
for (const [name, fn, options] of grouped) {
  console.log(`bars/${name} [[3, 0, 2]] — expected 3 rows (middle empty):`);
  draw(fn([data], 8, options));
  console.log();
}
