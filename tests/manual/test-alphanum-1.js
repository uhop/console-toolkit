import {toRoman, toRomanUnicode, toRomanLowerUnicode} from '../../src/alphanumeric/roman.js';

const samples = [1300, 1500, 1600, 1700, 1800, 1812, 1900, 1912, 1990, 2000, 2001, 2002, 2010, 2020, 2022, 2024];

const interleave = s => [...s].reduce((acc, value, index) => acc + (index ? ' ' : '') + value, '');

const result = [];
for (let i = 1; i <= 13; ++i) {
  result.push(i + ' = ' + toRoman(i) + ' = ' + interleave(toRomanUnicode(i)));
}
console.log(result.join(', '));

for (const sample of samples) {
  console.log(sample, '=', toRoman(sample).toLowerCase(), '=', interleave(toRomanLowerUnicode(sample)));
}
