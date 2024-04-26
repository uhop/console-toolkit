import drawChart from '../../src/charts/columns/plain-grouped.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const labelStyle = style.bold.bright.white,
  customTheme = [
    {state: labelStyle.bg.red, symbol: ' '},
    {state: labelStyle.bg.green, symbol: ' '},
    {state: labelStyle.bg.blue, symbol: ' '},
    {state: labelStyle.bg.magenta, symbol: ' '},
    {state: labelStyle.bg.yellow, symbol: ' '},
    {state: labelStyle.bg.cyan, symbol: ' '}
  ];

const chart = drawChart([[40, 10, 30, 20]], 10, {theme: customTheme});

console.log('Some hypothetic distribution:');
draw(chart);
