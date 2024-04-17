import Box from '../../src/Box.js';
import drawChart from '../../src/charts/bars/plain-grouped.js';
import {draw} from './utils.js';

console.log('Butterfly bars:');
draw(
  Box.make(
    drawChart([[2, 4, 3]], 20, {reverse: true}),
    {align: 'right'}
  ),
  drawChart([[2, 4, 3]], 20)
);
