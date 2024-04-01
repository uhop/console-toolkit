// import {log} from '../../src/show.js';
import Style from '../../src/style.js';

console.log(`Hello, ${new Style().cyan}world!`);
console.log(`Still cyan until ${new Style().resetAll}now.`);
