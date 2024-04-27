import drawChart from '../../src/charts/bars/plain.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

const bright = style.bright;

const symbol = '#',
  customTheme = [
    {state: bright.magenta, symbol: symbol},
    {state: bright.cyan, symbol: symbol},
    {state: bright.yellow, symbol: symbol},
    {state: bright.blue, symbol: symbol},
    {state: bright.green, symbol: symbol}
  ];
customTheme.empty = {symbol: '.'};

console.log('Stacked bars + custom theme with an ASCII art and an empty fill:');
draw(
  drawChart(
    [
      [0],
      [25],
      [50],
      [75]
    ],
    50,
    {theme: customTheme, maxValue: 100}
  )
);
