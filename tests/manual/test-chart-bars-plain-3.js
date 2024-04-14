import drawChart from '../../src/charts/bars/plain-grouped.js';
import style, {c} from '../../src/style.js';
import {draw} from './utils.js';
import Panel from '../../src/Panel.js';

const labelStyle = style.bold.bright.white,
  customTheme = [
    {state: labelStyle.bg.red.getState(), symbol: ' '},
    {state: labelStyle.bg.green.getState(), symbol: ' '},
    {state: labelStyle.bg.blue.getState(), symbol: ' '},
    {state: labelStyle.bg.magenta.getState(), symbol: ' '},
    {state: labelStyle.bg.yellow.getState(), symbol: ' '},
    {state: labelStyle.bg.cyan.getState(), symbol: ' '}
  ];

const panel = Panel.fromBox(drawChart([[40, 10, 30, 20]], 50, {theme: customTheme})).put(1, 0, [
  '40%',
  '10%',
  c`{{inverse}}30%`,
  '20%'
]);

console.log('Some hypothetic distribution:');
draw(panel);
