import style from '../../src/style.js';

console.log('Hello, ' + style.cyan.text('cyan') + '! We love you!');

console.log(`Hello, ${style.black.bgBrightCyan.underline}world!`);
console.log(`Still cyan until ${style.reset.all}now.`);
