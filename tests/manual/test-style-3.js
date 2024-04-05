import style from '../../src/style.js';

console.log(`Hello, ${style.fg.bright.cyan.bg.grayscale(64).overline}world!`);
console.log(`Still cyan until ${style.reset.all}now.`);
