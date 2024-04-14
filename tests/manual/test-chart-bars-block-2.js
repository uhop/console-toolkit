import drawChart from '../../src/charts/bars/block.js';
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

console.log('Normalized stacked bars (no right border):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {maxValue: -1, r: 0}
  )
);

console.log('Normalized stacked bars (no top border):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {maxValue: -1, t: 0}
  )
);
