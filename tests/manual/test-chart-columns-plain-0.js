import drawChart from '../../src/charts/columns/plain.js';
import {draw} from './utils.js';
import style from '../../src/style.js';
import {shadeMedium} from '../../src/symbols.js';

console.log('Trivial columns:');
draw(drawChart([5, 10, 2, 7], 10));

console.log('Stacked columns:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10
  )
);

const bright = style.bright;

const symbol1 = '*',
  customTheme1 = [
    {colorState: bright.magenta, symbol: symbol1},
    {colorState: bright.cyan, symbol: symbol1},
    {colorState: bright.yellow, symbol: symbol1},
    {colorState: bright.blue, symbol: symbol1},
    {colorState: bright.green, symbol: symbol1}
  ];

console.log('Stacked columns + custom theme + init state:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {theme: customTheme1, initState: style.inverse}
  )
);

const symbol2 = shadeMedium,
  customTheme2 = [
    {colorState: bright.magenta, symbol: symbol2},
    {colorState: bright.cyan, symbol: symbol2},
    {colorState: bright.yellow, symbol: symbol2},
    {colorState: bright.blue, symbol: symbol2},
    {colorState: bright.green, symbol: symbol2}
  ];

console.log('Stacked columns + custom theme with a shadow symbol + init state:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {theme: customTheme2, initState: style.bg.white}
  )
);

const symbol3 = '=',
  customTheme3 = [
    {state: bright.magenta, symbol: symbol3},
    {state: bright.cyan, symbol: symbol3},
    {state: bright.yellow, symbol: symbol3},
    {state: bright.blue, symbol: symbol3},
    {state: bright.green, symbol: symbol3}
  ];

console.log('Stacked columns + custom theme with an ASCII art:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {theme: customTheme3}
  )
);
