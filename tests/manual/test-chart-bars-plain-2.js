import drawChart from '../../src/charts/bars/plain.js';
import {draw} from './utils.js';

console.log('Normalized stacked bars:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {maxValue: -1}
  )
);
