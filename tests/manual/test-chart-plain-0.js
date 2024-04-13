import {drawChart} from '../../src/charts/bars/plain.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

draw(drawChart([5, 10, 2, 7], 50));

console.log();
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

console.log();
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {theme: customTheme1}
  )
);

const symbol = '\u{2591}',
  customTheme2 = [
    {colorState: style.brightMagenta.getState(), symbol},
    {colorState: style.brightCyan.getState(), symbol},
    {colorState: style.brightYellow.getState(), symbol},
    {colorState: style.brightBlue.getState(), symbol},
    {colorState: style.brightGreen.getState(), symbol}
  ];

console.log();
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {theme: customTheme2, state: style.bg.white.getState()}
  )
);

const customTheme3 = [
    {state: style.brightMagenta.getState(), symbol: '='},
    {state: style.brightCyan.getState(), symbol: '='},
    {state: style.brightYellow.getState(), symbol: '='},
    {state: style.brightBlue.getState(), symbol: '='},
    {state: style.brightGreen.getState(), symbol: '='}
  ];

console.log();
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
