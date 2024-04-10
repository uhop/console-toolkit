import {formatNumber} from '../../src/alphanumeric/number-formatters.js';
import {numberPunctuation} from '../../src/alphanumeric/unicode-numbers.js';

const sample = 123456789.123456;

console.log(sample);
console.log(formatNumber(sample, {decimals: 6}));
console.log(numberPunctuation(formatNumber(sample, {decimals: 6})));
