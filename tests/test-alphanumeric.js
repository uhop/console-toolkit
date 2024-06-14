import test from 'tape-six';

import {abbrNumber, formatInteger, formatNumber, simplifyExponent} from '../src/alphanumeric/number-formatters.js';
import {numberPunctuation} from '../src/alphanumeric/unicode-numbers.js';
import {toRoman, toRomanUnicode, toRomanLowerUnicode} from '../src/alphanumeric/roman.js';

test('Alphanumeric', t => {
  t.test('format integer', t => {
    t.equal(formatInteger(1), '1');
    t.equal(formatInteger(12), '12');
    t.equal(formatInteger(123), '123');
    t.equal(formatInteger(1234), '1,234');
    t.equal(formatInteger(12345), '12,345');
    t.equal(formatInteger(123456), '123,456');
    t.equal(formatInteger(1234567), '1,234,567');
    t.equal(formatInteger(12345678), '12,345,678');
    t.equal(formatInteger(123456789), '123,456,789');
    t.equal(formatInteger(-123456789), '-123,456,789');
    t.equal(formatInteger(123456789, {keepSign: true}), '+123,456,789');
    t.equal(formatInteger(-123456789, {keepSign: true}), '-123,456,789');
  });

  t.test('format number', t => {
    const n = 123456789.123456123456,
      s = formatNumber(n, {decimals: 6}),
      p = numberPunctuation(s);

    t.equal(s, '123,456,789.123456');
    t.equal(p, '12🄄 45🄇 78⒐ 123456');
  });

  t.test('Roman numbers', t => {
    const values = [1300, 1500, 1600, 1700, 1800, 1812, 1900, 1912, 1990, 2000, 2001, 2002, 2010, 2020, 2022, 2024],
      result = [
        'MCCC',
        'MD',
        'MDC',
        'MDCC',
        'MDCCC',
        'MDCCCXII',
        'MCM',
        'MCMXII',
        'MCMXC',
        'MM',
        'MMI',
        'MMII',
        'MMX',
        'MMXX',
        'MMXXII',
        'MMXXIV'
      ];

    for (const [i, x] of Object.entries(values)) {
      t.equal(toRoman(x), result[i]);
    }
  });

  t.test('Roman numbers (Unicode)', t => {
    const values = [1300, 1500, 1600, 1700, 1800, 1812, 1900, 1912, 1990, 2000, 2001, 2002, 2010, 2020, 2022, 2024],
      result = [
        'ⅯⅭⅭⅭ',
        'ⅯⅮ',
        'ⅯⅮⅭ',
        'ⅯⅮⅭⅭ',
        'ⅯⅮⅭⅭⅭ',
        'ⅯⅮⅭⅭⅭⅫ',
        'ⅯⅭⅯ',
        'ⅯⅭⅯⅫ',
        'ⅯⅭⅯⅩⅭ',
        'ⅯⅯ',
        'ⅯⅯⅠ',
        'ⅯⅯⅡ',
        'ⅯⅯⅩ',
        'ⅯⅯⅩⅩ',
        'ⅯⅯⅩⅩⅡ',
        'ⅯⅯⅩⅩⅣ'
      ];

    for (const [i, x] of Object.entries(values)) {
      t.equal(toRomanUnicode(x), result[i]);
    }
  });

  t.test('Roman numbers (Unicode) the lower case', t => {
    const values = [1300, 1500, 1600, 1700, 1800, 1812, 1900, 1912, 1990, 2000, 2001, 2002, 2010, 2020, 2022, 2024],
      result = [
        'ⅿⅽⅽⅽ',
        'ⅿⅾ',
        'ⅿⅾⅽ',
        'ⅿⅾⅽⅽ',
        'ⅿⅾⅽⅽⅽ',
        'ⅿⅾⅽⅽⅽⅻ',
        'ⅿⅽⅿ',
        'ⅿⅽⅿⅻ',
        'ⅿⅽⅿⅹⅽ',
        'ⅿⅿ',
        'ⅿⅿⅰ',
        'ⅿⅿⅱ',
        'ⅿⅿⅹ',
        'ⅿⅿⅹⅹ',
        'ⅿⅿⅹⅹⅱ',
        'ⅿⅿⅹⅹⅳ'
      ];

    for (const [i, x] of Object.entries(values)) {
      t.equal(toRomanLowerUnicode(x), result[i]);
    }
  });

  t.test('abbreviate numbers', t => {
    t.equal(abbrNumber(1), '1');
    t.equal(abbrNumber(12), '12');
    t.equal(abbrNumber(123), '123');
    t.equal(abbrNumber(1234), '1,234');
    t.equal(abbrNumber(12345), '12k');
    t.equal(abbrNumber(123456), '123k');
    t.equal(abbrNumber(1234567), '1M');
    t.equal(abbrNumber(12345678), '12M');
    t.equal(abbrNumber(123456789), '123M');
    t.equal(abbrNumber(1234567890), '1G');

    t.equal(abbrNumber(1234567890, {decimals: 2}), '1.23G');
    t.equal(abbrNumber(-1234567890, {decimals: 2}), '-1.23G');
    t.equal(abbrNumber(1234567890, {decimals: 2, keepSign: true}), '+1.23G');
    t.equal(abbrNumber(-1234567890, {decimals: 2, keepSign: true}), '-1.23G');

    t.equal(abbrNumber(2_000_000, {decimals: 2}), '2M');
    t.equal(abbrNumber(2_000_000, {decimals: 2, keepFractionAsIs: true}), '2.00M');
  });

  t.test('simplify exponent', t => {
    t.equal(simplifyExponent(1), '1');

    t.equal(simplifyExponent(2e30), '2e30');
    t.equal(simplifyExponent(2e30, {keepExpPlus: true}), '2e+30');

    t.equal((2e30).toPrecision(4), '2.000e+30');
    t.equal(simplifyExponent((2e30).toPrecision(4)), '2e30');
    t.equal(simplifyExponent((2e30).toPrecision(4), {keepExpPlus: true}), '2e+30');

    t.equal((-2e30).toPrecision(4), '-2.000e+30');
    t.equal(simplifyExponent((-2e30).toPrecision(4)), '-2e30');
    t.equal(simplifyExponent((-2e30).toPrecision(4), {keepExpPlus: true}), '-2e+30');
  });
});
