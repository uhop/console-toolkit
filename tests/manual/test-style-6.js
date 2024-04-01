// import {log} from '../../src/show.js';
import Style from '../../src/style.js';

const log = s => console.log(s.replace(/\x1B/g, '\\x1B'));

console.log(
  `Colors: ${new Style().bold.bright.white.bg
    .trueColor(221, 17, 17)
    .text(' rgb(221, 17, 17) ')}${new Style().bold.bright.white.bg
    .hexTrueColor(0xdd1111)
    .text(' hex(0xdd1111) ')}${new Style().bold.bright.white.bg.rgb256(221, 17, 17).text(' rgb256(221, 17, 17) ')}.`
);
