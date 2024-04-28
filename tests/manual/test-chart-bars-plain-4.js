import Box from '../../src/box.js';
import drawStackedChart from '../../src/charts/bars/plain.js';
import drawGroupedChart from '../../src/charts/bars/plain-grouped.js';
import {draw} from './utils.js';

console.log('Butterfly stacked bars:');
draw(
  Box.make(
    drawStackedChart(
      [
        [2, 1, 2],
        [5, 1, 4],
        [1, 1],
        [3, 1, 3]
      ],
      20,
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
    20
  )
);

console.log('Butterfly grouped bars:');
draw(Box.make(drawGroupedChart([[2, 4, 3]], 20, {reverse: true}), {align: 'right'}), drawGroupedChart([[2, 4, 3]], 20));
