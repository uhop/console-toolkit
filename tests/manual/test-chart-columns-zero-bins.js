import plain from '../../src/charts/columns/plain.js';
import block from '../../src/charts/columns/block.js';
import blockFrac from '../../src/charts/columns/block-frac.js';
import plainGrouped from '../../src/charts/columns/plain-grouped.js';
import blockGrouped from '../../src/charts/columns/block-grouped.js';
import blockFracGrouped from '../../src/charts/columns/block-frac-grouped.js';
import fracGrouped from '../../src/charts/columns/frac-grouped.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

// 5 bins, three of them zero — every renderer should keep all 5 column slots.
const data = [0, 1, 0, 2, 0];
const theme = [{colorState: style.brightCyan.getState()}];

const stacked = [
  ['plain', plain, {theme}],
  ['block', block, {theme}],
  ['block-frac', blockFrac, {theme, rectSize: 0.875}]
];
for (const [name, fn, options] of stacked) {
  console.log(`columns/${name} [0, 1, 0, 2, 0] — expected 5 columns:`);
  draw(fn(data, 4, options));
  console.log();
}

const grouped = [
  ['plain-grouped', plainGrouped, {theme}],
  ['block-grouped', blockGrouped, {theme}],
  ['block-frac-grouped', blockFracGrouped, {theme, rectSize: 0.875}],
  ['frac-grouped', fracGrouped, {theme}]
];
for (const [name, fn, options] of grouped) {
  console.log(`columns/${name} [[0, 1, 0, 2, 0]] — expected 5 columns:`);
  draw(fn([data], 4, options));
  console.log();
}
