import drawChart from '../../src/charts/columns/block-frac.js';
import {draw} from './utils.js';

console.log('Normalized stacked columns:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {maxValue: -1}
  )
);

console.log('Normalized stacked columns (rectSize = 0.125):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {maxValue: -1, rectSize: 0.125}
  )
);

console.log('Normalized stacked columns (rectSize = 0.875):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {maxValue: -1, rectSize: 0.875}
  )
);
