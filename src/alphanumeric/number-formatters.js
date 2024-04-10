// Initially copied from https://github.com/uhop/nano-bench

const units = ['s', 'ms', 'μs', 'ns', 'ps'];

export const prepareTimeFormat = (data, scale = 1) => {
  let mx = -1000,
    mn = 1000;
  for (let i = 0; i < data.length; ++i) {
    const p = Math.floor(Math.log(data[i] / scale) / Math.LN10);
    if (isFinite(p)) {
      if (mx < p) {
        mx = p;
      }
      if (mn > p) {
        mn = p;
      }
    }
  }
  if (mx < mn) {
    mn = mx = -6;
  }
  const digits = Math.max(mx - mn + 1, 2);
  scale = 1 / scale;
  // TODO: get rid of the loop below
  let i = 0;
  for (; mx < 0 && i < units.length - 1; ++i, mx += 3, scale *= 1000);
  return {scale, precision: digits - mx, unit: units[i]};
};

export const formatTime = (value, format) => {
  let result = (value * format.scale).toFixed(format.precision);
  if (format.precision > 0) {
    result = result.replace(/\.0+$/, '');
  }
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

export const formatInteger = (n, options) =>
  isNaN(n)
    ? ''
    : (n < 0 ? '-' : options?.explicitSign ? '+' : '') +
      putCommasIn(Math.abs(n).toFixed(0), options);

export const formatNumber = (n, options) => {
  if (isNaN(n)) return '';
  const decimals = options?.decimals ?? 0;
  let sign = options?.explicitSign ? '+' : '';
  if (n < 0) {
    n = -n;
    sign = '-';
  }
  const s = n.toFixed(decimals);
  if (decimals < 1) return sign + putCommasIn(s, options);
  let fraction = s.slice(-decimals);
  if (!options?.keepFractionAsIs) {
    fraction = fraction.replace(/0+$/, '');
  }
  const dot = options?.dot ?? '.';
  return sign + putCommasIn(s.slice(0, -decimals - 1), options) + (fraction ? dot + fraction : '');
};

const exp = [0, 0, 0, 0, 3, 3, 6, 6, 6, 9, 9, 9, 12];
const abbr = '***k**M**G**T';

export const abbrNumber = (n, options) => {
  if (isNaN(n)) return '';
  const decimals = options?.decimals ?? 0;
  let sign = options?.explicitSign ? '+' : '';
  if (n < 0) {
    n = -n;
    sign = '-';
  }
  if (n <= 1) {
    let t1 = n.toString(),
      t2 = n.toFixed(decimals);
    return sign + (t1.length < t2.length ? t1 : t2);
  }
  const digits = Math.min(Math.floor(Math.log(n) / Math.LN10), exp.length - 1),
    e = exp[digits],
    s = Math.round(n / Math.pow(10, e - decimals)).toFixed(0);
  if (decimals < 1) return sign + putCommasIn(s, options) + ((e && abbr.charAt(e)) || '');
  let fraction = s.slice(-decimals);
  if (!options?.keepFractionAsIs) {
    fraction = fraction.replace(/0+$/, '');
  }
  const dot = options?.dot ?? '.';
  return (
    sign +
    putCommasIn(s.slice(0, -decimals), options) +
    (fraction ? dot + fraction : '') +
    ((e && abbr.charAt(e)) || '')
  );
};
