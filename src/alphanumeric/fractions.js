export const fractions = [
  [1, 7, '\u2150'],
  [1, 9, '\u2151'],
  [1, 10, '\u2152'],
  [1, 3, '\u2153'],
  [2, 3, '\u2154'],
  [1, 5, '\u2155'],
  [2, 5, '\u2156'],
  [3, 5, '\u2157'],
  [4, 5, '\u2158'],
  [1, 6, '\u2159'],
  [5, 6, '\u215A'],
  [1, 8, '\u215B'],
  [3, 8, '\u215C'],
  [5, 8, '\u215D'],
  [7, 8, '\u215E'],
  [0, 3, '\u2189'],
  [1, 4, '\u00BC'],
  [1, 2, '\u00BD'],
  [3, 4, '\u00BE']
]
  .map(x => ({numerator: x[0], denominator: x[1], symbol: x[2], value: x[0] / x[1]}))
  .sort((a, b) => a.value - b.value);

const pick = denominator => fractions.filter(x => !(denominator % x.denominator));

export const thirds = pick(3);
export const quarters = [{numerator: 0, denominator: 4, symbol: '0', value: 0}, ...pick(4)];
export const fifths = [{numerator: 0, denominator: 5, symbol: '0', value: 0}, ...pick(5)];
export const sixths = pick(6);
export const eighths = [{numerator: 0, denominator: 8, symbol: '0', value: 0}, ...pick(8)];

export {quarters as fourths};

const binarySearch = (sortedArray, lessFn, from = 0, to = sortedArray.length) => {
  let i = from,
    j = to;
  while (j - i > 0) {
    const m = (i + j) >> 1;
    if (lessFn(sortedArray[m])) i = m + 1;
    else j = m;
  }
  return j;
};

const one = {value: 1, symbol: '1'};

const findSymbol = (fractions, value, useFractionForZero) => {
  if (value < 0) return '';
  let int = Math.floor(value);
  value -= int;

  let index = binarySearch(fractions, x => x.value < value);

  let chosen = fractions[0];
  if (index === 0) return useFractionForZero && chosen.symbol !== '0' ? (int || '') + chosen.symbol : String(int);

  const upper = index === fractions.length ? one : fractions[index],
    lower = fractions[index - 1];

  if (upper.value - value < value - lower.value) {
    chosen = upper;
  } else {
    chosen = lower;
    --index;
  }

  if (index === 0) return useFractionForZero && chosen.symbol !== '0' ? (int || '') + chosen.symbol : String(int);
  if (chosen.symbol === '1') return String(int + 1);
  if (chosen.symbol === '0') return String(int);

  return (int || '') + chosen.symbol;
};

export const getFraction = (value, useFractionForZero) => findSymbol(fractions, value, useFractionForZero);
export const getThirds = (value, useFractionForZero) => findSymbol(thirds, value, useFractionForZero);
export const getQuarters = (value, useFractionForZero) => findSymbol(quarters, value, useFractionForZero);
export const getFifths = (value, useFractionForZero) => findSymbol(fifths, value, useFractionForZero);
export const getSixths = (value, useFractionForZero) => findSymbol(sixths, value, useFractionForZero);
export const getEighths = (value, useFractionForZero) => findSymbol(eighths, value, useFractionForZero);

export {getQuarters as getFourths};
