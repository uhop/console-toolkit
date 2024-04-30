import drawChart from '../../src/charts/bars/plain-grouped.js';
import style, {c} from '../../src/style.js';
import {draw} from './utils.js';
import Panel from '../../src/panel.js';

const labelStyle = style.bold.bright.white,
  customTheme = [
    {state: labelStyle.bg.red, symbol: ' '},
    {state: labelStyle.bg.green, symbol: ' '},
    {state: labelStyle.bg.blue, symbol: ' '},
    {state: labelStyle.bg.magenta, symbol: ' '},
    {state: labelStyle.bg.yellow, symbol: ' '},
    {state: labelStyle.bg.cyan, symbol: ' '}
  ];

const panel = Panel.make(drawChart([[40, 10, 30, 20]], 50, {theme: customTheme})).put(1, 0, [
  '40%',
  '10%',
  c`{{inverse}}30%`,
  '20%'
]);

console.log('Some hypothetic distribution:');
draw(panel);
