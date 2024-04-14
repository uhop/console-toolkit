import drawChart from '../../src/charts/bars/plain-grouped.js';
import {draw} from './utils.js';

console.log('Grouped bars:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50
  )
);
