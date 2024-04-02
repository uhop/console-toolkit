// import {log} from '../../src/show.js';
import style from '../../src/style.js';

console.log(`Hello, ${style.fg.bright.cyan.bg.gray(64).overline}world!`);
console.log(`Still cyan until ${style.reset.all}now.`);
