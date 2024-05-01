import {compareDifference} from '../../src/alphanumeric/number-formatters.js';

const showDiff = (a, b) => {
  const result = compareDifference(a, b),
    smaller = result.less ? 'smaller' : 'bigger';
  if (result.infinity) return console.log(a, 'is INFINITELY', smaller, 'than', b);
  if (result.equality) return console.log(a, 'is practically EQUAL to', b);
  if (result.percentage)
    return console.log(a, 'is', smaller, 'than', b, 'by', result.percentage + '%');
  if (result.ratio)
    return console.log(a, 'is', smaller, 'than', b, 'by', result.ratio + 'x');
  if (result.magnitude)
    return console.log(
      a,
      'is',
      smaller,
      'than',
      b,
      'by',
      result.magnitude,
      'orders of magnitude'
    );
  console.log(a, 'and', b, 'cannot be compared');
};

showDiff(1.000001, 1);
showDiff(Infinity, 1);
showDiff(1.5, 1);
showDiff(2, 1);
showDiff(Math.E, 1);
showDiff(Math.PI, 1);
showDiff(5, 1);

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
