import {c} from '../../src/style.js';
import {show} from './utils.js';

console.log(c`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(c`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(c({initState: {}})`Hello, {{save.bold.save.bright.cyan}}bold bright cyan{{restore}} bold{{restore}}! We love you!`);
show(c`Hello, {{save.bold.save.bright.cyan}}bold bright cyan bold! We love you!`);
show(c({initState: {}})`Hello, {{save.bold.save.bright.cyan}}bold bright cyan bold! We love you!`);
