import drawChart from '../../src/charts/columns/block-frac-grouped.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

const customTheme = [
  {colorState: style.brightMagenta.getState()},
  {colorState: style.brightCyan.getState()},
  {colorState: style.brightYellow.getState()},
  {colorState: style.brightBlue.getState()},
  {colorState: style.brightGreen.getState()}
];

console.log('Grouped columns:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {theme: customTheme, rectSize: 0.875}
  )
);
