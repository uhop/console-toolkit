import {drawChart} from '../../src/charts/bars/plain-grouped.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

const customTheme = [
    {state: style.brightMagenta.getState(), symbol: '='},
    {state: style.brightCyan.getState(), symbol: '='},
    {state: style.brightYellow.getState(), symbol: '='},
    {state: style.brightBlue.getState(), symbol: '='},
    {state: style.brightGreen.getState(), symbol: '='}
  ];

draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {theme: customTheme}
  )
);
