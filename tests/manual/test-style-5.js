// import {log} from '../../src/show.js';
import Style from '../../src/style.js';

console.log(
  `Colors: ${new Style().bold.bright.white.bg.red.text('red')}, ${new Style().bold.bright.white.bg.green.text(
    'green'
  )}, ${new Style().bold.bright.white.bg.blue.text('blue')}.`
);
