import test from 'tape-six';

import {formatNumber} from '../src/alphanumeric/number-formatters.js';
import {numberPunctuation} from '../src/alphanumeric/unicode-numbers.js';
import {toRoman, toRomanUnicode, toRomanLowerUnicode} from '../src/alphanumeric/roman.js';

test('Alphanumeric', async t => {
  await t.test('format number', t => {
    const n = 123456789.123456123456,
      s = formatNumber(n, {decimals: 6}),
      p = numberPunctuation(s);

    t.equal(s, '123,456,789.123456');
    t.equal(p, '12🄄 45🄇 78⒐ 123456');
  });

  await t.test('Roman numbers', t => {
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

  await t.test('Roman numbers (Unicode)', t => {
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

  await t.test('Roman numbers (Unicode) the lower case', t => {
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
});
