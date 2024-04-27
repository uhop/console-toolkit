import drawChart from '../../src/charts/columns/block.js';
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

console.log('Normalized stacked columns (no right border):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {maxValue: -1, r: 0}
  )
);

console.log('Normalized stacked columns (no top border):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {maxValue: -1, t: 0}
  )
);
