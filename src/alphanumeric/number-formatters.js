// Initially copied from https://github.com/uhop/nano-bench

const units = ['s', 'ms', 'μs', 'ns', 'ps'],
  unicodeUnits = ['s', '㎳', '㎲', '㎱', '㎰'];

export const prepareTimeFormat = (values, scale = 1, useUnicode) => {
  let mx = -1000,
    mn = 1000;
  for (let i = 0; i < values.length; ++i) {
    const p = Math.floor(Math.log(values[i] / scale) / Math.LN10);
    if (isFinite(p)) {
      if (mx < p) mx = p;
      if (mn > p) mn = p;
    }
  }
  if (mx < mn) mn = mx = -6;
  const digits = Math.max(mx - mn + 1, 2);
  scale = 1 / scale;
  // TODO: get rid of the loop below
  let i = 0;
  for (; mx < 0 && i < units.length - 1; ++i, mx += 3, scale *= 1000);
  return {scale, precision: digits - mx, unit: (useUnicode ? unicodeUnits : units)[i]};
};

export const formatTime = (value, format) => {
  let result = (value * format.scale).toFixed(format.precision);
  if (format.precision > 0 && !format.keepFractionAsIs) result = result.replace(/\.0+$/, '');
  return result + format.unit;
};

const putCommasIn = (s, options) => {
  if (s.length < 4) return s;
  const comma = options?.comma || ',',
    r = s.length % 3;
  return (
    (r ? s.slice(0, r) + comma : '') +
    s
      .slice(r)
      .replace(/(\d{3})/g, '$1' + comma)
      .slice(0, -1)
  );
};

export const formatInteger = (value, options) =>
  isNaN(value)
    ? ''
    : (value < 0 ? '-' : options?.keepSign ? '+' : '') + putCommasIn(Math.abs(value).toFixed(0), options);

export const formatNumber = (value, options) => {
  if (isNaN(value)) return '';
  const decimals = options?.decimals ?? 0;
  let sign = options?.keepSign ? '+' : '';
  if (value < 0) {
    value = -value;
    sign = '-';
  }
  const s = value.toFixed(decimals);
  if (decimals < 1) return sign + putCommasIn(s, options);
  let fraction = s.slice(-decimals);
  if (!options?.keepFractionAsIs) fraction = fraction.replace(/0+$/, '');
  const dot = options?.dot ?? '.';
  return sign + putCommasIn(s.slice(0, -decimals - 1), options) + (fraction ? dot + fraction : '');
};

const exp = [0, 0, 0, 0, 3, 3, 6, 6, 6, 9, 9, 9, 12];
const abbr = '***k**M**G**T';

export const abbrNumber = (value, options) => {
  if (isNaN(value)) return '';
  const decimals = options?.decimals ?? 0;
  let sign = options?.keepSign ? '+' : '';
  if (value < 0) {
    value = -value;
    sign = '-';
  }
  if (value <= 1) {
    let t1 = value.toString(),
      t2 = value.toFixed(decimals);
    return sign + (t1.length < t2.length ? t1 : t2);
  }
  const digits = Math.min(Math.floor(Math.log(value) / Math.LN10), exp.length - 1),
    e = exp[digits],
    s = Math.round(value / Math.pow(10, e - decimals)).toFixed(0);
  if (decimals < 1) return sign + putCommasIn(s, options) + ((e && abbr.charAt(e)) || '');
  let fraction = s.slice(-decimals);
  if (!options?.keepFractionAsIs) fraction = fraction.replace(/0+$/, '');
  const dot = options?.dot ?? '.';
  return (
    sign +
    putCommasIn(s.slice(0, -decimals), options) +
    (fraction ? dot + fraction : '') +
    ((e && abbr.charAt(e)) || '')
  );
};

export const simplifyExponent = (s, {keepExpPlus} = {}) =>
  String(s).replace(new RegExp('\\.?0*e' + (keepExpPlus ? '' : '\\+?'), 'i'), 'e');

export const compareDifference = (a, b) => {
  // works only on positive numbers
  a = Math.abs(a);
  b = Math.abs(b);

  const less = a < b;
  if (!less) [a, b] = [b, a];

  if (a === b) return {less, equality: true};

  const absDiff = b - a,
    diff = absDiff / a;
  if (diff === Infinity) return {less, infinity: true};

  if (diff < 2) {
    const percentage = absDiff / (less ? a : b) * 100;
    if (percentage < 0.001) return {less, equality: true};
    if (percentage < 1) return {less, percentage: formatNumber(percentage, {decimals: 3})};
    if (percentage < 10) return {less, percentage: formatNumber(percentage, {decimals: 2})};
    if (percentage < 100) return {less, percentage: formatNumber(percentage, {decimals: 1})};
    return {less, percentage: formatNumber(percentage, {decimals: 0})};
  }

  const ratio = b / a;

  if (ratio < 10000) {
    if (ratio < 10) return {less, ratio: formatNumber(ratio, {decimals: 2})};
    if (ratio < 100) return {less, ratio: formatNumber(ratio, {decimals: 1})};
    return {less, ratio: formatNumber(ratio, {decimals: 0})};
  }

  return {less, ratio: simplifyExponent(ratio.toPrecision(2))};
};
