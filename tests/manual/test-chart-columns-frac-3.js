import Box from '../../src/box.js';
import drawStackedChart from '../../src/charts/columns/block-frac.js';
import drawGroupedChart from '../../src/charts/columns/block-frac-grouped.js';
import {draw} from './utils.js';

console.log('Butterfly stacked columns:');
draw(
  Box.make(
    drawStackedChart(
      [
        [2, 1, 2],
        [5, 1, 4],
        [1, 1],
        [3, 1, 3]
      ],
      10,
      {reverse: true}
    ),
    {align: 'right'}
  ),
  drawStackedChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10
  )
);

console.log('Butterfly grouped columns:');
draw(Box.make(drawGroupedChart([[2, 4, 3]], 10, {reverse: true}), {align: 'right'}), drawGroupedChart([[2, 4, 3]], 10));
