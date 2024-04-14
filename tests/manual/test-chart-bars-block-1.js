import drawChart from '../../src/charts/bars/block-grouped.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

const customTheme = [
  {state: style.brightMagenta.getState()},
  {state: style.brightCyan.getState()},
  {state: style.brightYellow.getState()},
  {state: style.brightBlue.getState()},
  {state: style.brightGreen.getState()}
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
