import style from '../../src/style.js';

console.log('Hello, ' + style.bold.bright.cyan.text('bold bright cyan') + '! We love you!');
console.log('Hello, ' + style.add('This is BOLD BRIGHT CYAN: \x1B[1;96m').text('bold bright cyan') + '! We love you!');
console.log('Hello, ' + style.add(style.bold.bright.cyan).text('bold bright cyan') + '! We love you!');
