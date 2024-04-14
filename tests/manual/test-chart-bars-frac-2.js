import drawChart from '../../src/charts/bars/block-frac.js';
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

console.log('Normalized stacked bars (rectSize = 0.125):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {maxValue: -1, rectSize: 0.125}
  )
);

console.log('Normalized stacked bars (rectSize = 0.875):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {maxValue: -1, rectSize: 0.875}
  )
);
