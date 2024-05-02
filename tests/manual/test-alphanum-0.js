import {formatNumber, simplifyExponent} from '../../src/alphanumeric/number-formatters.js';
import {numberPunctuation, numberExponent} from '../../src/alphanumeric/unicode-numbers.js';

const sample1 = 123456789.123456;

console.log(sample1);
console.log(formatNumber(sample1, {decimals: 6}));
console.log(numberPunctuation(formatNumber(sample1, {decimals: 6})));

const sample2 = 1.23456789e33;
console.log();
console.log(sample2);
console.log(numberExponent(sample2));

const sample3 = -1.23456789e33;
console.log();
console.log(sample3);
console.log(numberExponent(sample3));

const sample4 = -1.23456789e33;
console.log();
console.log(sample4);
console.log(numberExponent(sample4, {useSpecialMinus: true}));

const sample5 = 1.23456789e-33;
console.log();
console.log(sample5);
console.log(numberExponent(sample5));

const sample6 = (1.2e33).toPrecision(4);
console.log();
console.log(sample6);
console.log(simplifyExponent(sample6));
console.log(simplifyExponent(sample6, {keepExpPlus: true}));
console.log(numberExponent(sample6));
console.log(numberExponent(simplifyExponent(sample6)));
console.log(numberExponent(simplifyExponent(sample6, {keepExpPlus: true})));
