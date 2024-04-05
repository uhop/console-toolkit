import style from '../../src/style.js';

const log = s => console.log(s.replace(/\x1B/g, '\\x1B'));

console.log(
  `Colors: ${style.bold.bright.white.bg.rgb(221, 17, 17).text(' rgb(221, 17, 17) ')}${style.bold.bright.white.bg
    .hexTrueColor(0xdd1111)
    .text(' hex(0xdd1111) ')}${style.bold.bright.white.bg.rgb256(221, 17, 17).text(' rgb256(221, 17, 17) ')}.`
);
