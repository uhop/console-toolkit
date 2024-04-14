import drawChart from '../../src/charts/bars/plain.js';
import {draw} from './utils.js';
import style from '../../src/style.js';
import {shadeMedium} from '../../src/symbols.js';

console.log('Trivial bars:');
draw(drawChart([5, 10, 2, 7], 50));

console.log('Stacked bars:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50
  )
);

const customTheme1 = [
  {colorState: style.brightMagenta.getState(), symbol: '*'},
  {colorState: style.brightCyan.getState(), symbol: '*'},
  {colorState: style.brightYellow.getState(), symbol: '*'},
  {colorState: style.brightBlue.getState(), symbol: '*'},
  {colorState: style.brightGreen.getState(), symbol: '*'}
];

console.log('Stacked bars + custom theme + init state:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {theme: customTheme1, initState: style.inverse.getState()}
  )
);

const symbol = shadeMedium,
  customTheme2 = [
    {colorState: style.brightMagenta.getState(), symbol},
    {colorState: style.brightCyan.getState(), symbol},
    {colorState: style.brightYellow.getState(), symbol},
    {colorState: style.brightBlue.getState(), symbol},
    {colorState: style.brightGreen.getState(), symbol}
  ];

console.log('Stacked bars + custom theme with a shadow symbol + init state:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {theme: customTheme2, initState: style.bg.white.getState()}
  )
);

const customTheme3 = [
  {state: style.bright.magenta.getState(), symbol: '='},
  {state: style.bright.cyan.getState(), symbol: '='},
  {state: style.bright.yellow.getState(), symbol: '='},
  {state: style.bright.blue.getState(), symbol: '='},
  {state: style.bright.green.getState(), symbol: '='}
];

console.log('Stacked bars + custom theme with an ASCII art:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {theme: customTheme3}
  )
);
