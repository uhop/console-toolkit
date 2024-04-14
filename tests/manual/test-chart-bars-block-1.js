import drawChart from '../../src/charts/bars/block-grouped.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

const customTheme = [
  {colorState: style.brightMagenta.getState()},
  {colorState: style.brightCyan.getState()},
  {colorState: style.brightYellow.getState()},
  {colorState: style.brightBlue.getState()},
  {colorState: style.brightGreen.getState()}
];

console.log('Grouped bars (no bottom border):');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {theme: customTheme, b: 0}
  )
);
