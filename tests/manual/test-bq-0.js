import style, {s} from '../../src/style.js';
import {show} from './utils.js';

console.log('Hello, ' + style.bold.bright.cyan.text('bold bright cyan') + '! We love you!');
console.log(s`Hello, {{bold.bright.cyan}}bold bright cyan{{reset.all}}! We love you!`);
console.log(s`Hello, {{save.bold.bright.cyan}}bold bright cyan{{restore}}! We love you!`);
console.log(s`Hello, {{save}}${t => t.bold.bright.cyan}bold bright cyan{{restore}}! We love you!`);
console.log(s`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);

show(s`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
