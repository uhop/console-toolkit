import {compareDifference} from '../../src/alphanumeric/number-formatters.js';

const showDiff = (a, b) => {
  const result = compareDifference(a, b);
  if (result.infinity) return console.log(Math.min(a, b), 'is INFINITELY smaller than', Math.max(a, b));
  if (result.equality) return console.log(Math.min(a, b), 'is practically EQUAL to', Math.max(a, b));
  if (result.percentage)
    return console.log(Math.min(a, b), 'is smaller than', Math.max(a, b), 'by', result.percentage + '%');
  if (result.ratio) return console.log(Math.min(a, b), 'is smaller than', Math.max(a, b), 'by', result.ratio, 'times');
  if (result.magnitude)
    return console.log(
      Math.min(a, b),
      'is smaller than',
      Math.max(a, b),
      'by',
      result.magnitude,
      'orders of magnitude'
    );
  console.log(Math.min(a, b), 'and', Math.max(a, b), 'cannot be compared');
};

showDiff(1, 1.000001);
showDiff(1, Infinity);
showDiff(1, 1.5);
showDiff(1, 2);
showDiff(1, Math.E);
showDiff(1, Math.PI);
showDiff(1, 5);
showDiff(1, 10);
showDiff(1, 20);
showDiff(1, 50);
showDiff(1, 100);
showDiff(1, 200);
showDiff(1, 500);
showDiff(1, 1000);
showDiff(1, 2000);
showDiff(1, 5000);
showDiff(1, 10000);
showDiff(1, 20000);
showDiff(1, 50000);
