// import {log} from '../../src/show.js';
import Style from '../../src/style.js';

console.log(`Hello, ${new Style().brightCyan}world!`);
console.log(`Still cyan until ${new Style().reset.all}now.`);
