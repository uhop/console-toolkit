// import {log} from '../../src/show.js';
import Style from '../../src/style.js';

console.log(`Hello, ${new Style().black.bgBrightCyan.underline}world!`);
console.log(`Still cyan until ${new Style().reset.all}now.`);
