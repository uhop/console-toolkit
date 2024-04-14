import drawChart from '../../src/charts/bars/block-frac.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

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
    50,
    {rectSize: 0.75}
  )
);

const customTheme1 = [
  {colorState: style.brightMagenta.getState()},
  {colorState: style.brightCyan.getState()},
  {colorState: style.brightYellow.getState()},
  {colorState: style.brightBlue.getState()},
  {colorState: style.brightGreen.getState()}
];

console.log('Stacked bars + custom theme:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    50,
    {theme: customTheme1, rectSize: 0.875}
  )
);
