import drawChart from '../../src/charts/columns/plain-grouped.js';
import {draw} from './utils.js';

console.log('Grouped columns:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10
  )
);
