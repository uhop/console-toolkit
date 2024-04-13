import {c, RESET_STATE} from '../../src/style.js';
import {show} from './utils.js';

console.log(c`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(c`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(c(RESET_STATE)`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(c`Hello, {{save.bold.save.bright.cyan}}bold bright cyan bold! We love you!`);
