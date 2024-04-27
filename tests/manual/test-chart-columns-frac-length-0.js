import drawChart from '../../src/charts/columns/frac-grouped.js';
import {draw} from './utils.js';
import style from '../../src/style.js';

const customTheme = [
  {colorState: style.brightMagenta.getState()},
  {colorState: style.brightCyan.getState()},
  {colorState: style.brightYellow.getState()},
  {colorState: style.brightBlue.getState()},
  {colorState: style.brightGreen.getState()}
];

console.log('Grouped columns with real size:');
draw(drawChart([[5.1, 5.2, 5.3, 5.4, 5.5, 11.6, 11.7, 11.8, 11.9, 3, 12]], 10, {theme: customTheme}));
