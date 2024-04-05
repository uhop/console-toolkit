import style, {s, RESET_STATE} from '../../src/style.js';
import {show} from './utils.js';

console.log(s`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(s`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(s(RESET_STATE)`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
