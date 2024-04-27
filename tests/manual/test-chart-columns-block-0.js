import drawChart from '../../src/charts/columns/block.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

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

const customTheme1 = [
  {colorState: style.brightMagenta.getState()},
  {colorState: style.brightCyan.getState()},
  {colorState: style.brightYellow.getState()},
  {colorState: style.brightBlue.getState()},
  {colorState: style.brightGreen.getState()}
];

console.log('Stacked columns + custom theme:');
draw(
  drawChart(
    [
      [2, 1, 2],
      [5, 1, 4],
      [1, 1],
      [3, 1, 3]
    ],
    10,
    {theme: customTheme1}
  )
);
