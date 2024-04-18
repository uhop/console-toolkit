import {s} from '../../src/style.js';
import {show} from './utils.js';

console.log(s`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(s`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(s(null)`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(s`Hello, {{save.bold.save.bright.cyan}}bold bright cyan bold! We love you!`);
