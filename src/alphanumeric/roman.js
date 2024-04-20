import {transcodeTables} from './unicode-numbers.js';

const {roman, romanLower} = transcodeTables;

const indexL = 12,
  indexC = 13,
  indexD = 14,
  indexM = 15,
  upperICodePoint = roman.get(1).codePointAt(0),
  upperL = String.fromCodePoint(upperICodePoint + indexL),
  upperC = String.fromCodePoint(upperICodePoint + indexC),
  upperD = String.fromCodePoint(upperICodePoint + indexD),
  upperM = String.fromCodePoint(upperICodePoint + indexM),
  lowerICodePoint = romanLower.get(1).codePointAt(0),
  lowerL = String.fromCodePoint(lowerICodePoint + indexL),
  lowerC = String.fromCodePoint(lowerICodePoint + indexC),
  lowerD = String.fromCodePoint(lowerICodePoint + indexD),
  lowerM = String.fromCodePoint(lowerICodePoint + indexM);

const romanGroup = (value, one, five, ten) => {
  if (value <= 3) return one.repeat(value);
  if (value == 4) return one + five;
  if (value <= 8) return five + one.repeat(value - 5);
  return one + ten;
};

export const toRoman = value => {
  value = Math.round(value);
  if (value < 1 || value > 3999)
    throw new Error(`Should be a positive integer not exceeding 3999 instead of "${value}"`);

  const result = [romanGroup(value % 10, 'I', 'V', 'X')];
  value = Math.floor(value / 10);

  while (value) {
    result.push(romanGroup(value % 10, 'X', 'L', 'C'));
    value = Math.floor(value / 10);
    if (!value) break;

    result.push(romanGroup(value % 10, 'C', 'D', 'M'));
    value = Math.floor(value / 10);
    if (!value) break;

    result.push(romanGroup(value % 10, 'M'));
    break;
  }

  return result.reverse().join('');
};

const toRomanUnicodeFn = (roman, L, C, D, M) => value => {
  value = Math.round(value);
  if (value < 1 || value > 3999)
    throw new Error(`Should be a positive integer not exceeding 3999 instead of "${value}"`);

  const result = [];

  while (value) {
    const last2 = value % 100;
    if (last2 <= 12) {
      if (last2) result.push(roman.get(last2));
      value = Math.floor(value / 100);
    } else {
      const digit = value % 10;
      if (digit) result.push(roman.get(digit));
      value = Math.floor(value / 10);
      if (!value) break;

      result.push(romanGroup(value % 10, roman.get(10), L, C));
      value = Math.floor(value / 10);
    }
    if (!value) break;

    result.push(romanGroup(value % 10, C, D, M));
    value = Math.floor(value / 10);
    if (!value) break;

    result.push(romanGroup(value % 10, M));
    break;
  }

  return result.reverse().join('');
};

export const toRomanUnicode = toRomanUnicodeFn(roman, upperL, upperC, upperD, upperM);
export const toRomanLowerUnicode = toRomanUnicodeFn(romanLower, lowerL, lowerC, lowerD, lowerM);
