const fill = (array, fromSymbol, from, to) => {
  for (let i = from, base = fromSymbol.codePointAt(0) - from; i <= to; ++i) array.push(String.fromCodePoint(base + i));
};

// Enclosed Alphanumeric

const numbersCircled = [undefined];
fill(numbersCircled, '①', 1, 20);

const numbersWithParentheses = [undefined];
fill(numbersWithParentheses, '⑴', 1, 20);

const numbersWithDots = ['🄀'];
fill(numbersWithDots, '⒈', 1, 20);

const digitsDoubleCircled = [undefined];
fill(digitsDoubleCircled, '⓵', 1, 9);

// Mathematical Alphanumeric Symbols

const digitsBold = [];
fill(digitsBold, '𝟎', 0, 9);

const digitsDoubleStruck = [];
fill(digitsDoubleStruck, '𝟘', 0, 9);

const digitsSansSerif = [];
fill(digitsSansSerif, '𝟢', 0, 9);

const digitsSansSerifBold = [];
fill(digitsSansSerifBold, '𝟬', 0, 9);

const digitsMono = [];
fill(digitsMono, '𝟶', 0, 9);

// Enclosed Alphanumeric Supplement

const digitsWithCommas = [];
fill(digitsWithCommas, '🄁', 0, 9);

// Number Forms

const numbersRoman = [undefined];
fill(numbersRoman, 'Ⅰ', 1, 12);

const numbersRomanLower = [undefined];
fill(numbersRomanLower, 'ⅰ', 1, 12);

// Arabic

const digitsArabicIndic = [];
fill(digitsArabicIndic, '٠', 0, 9);

const digitsArabicIndicExtended = [];
fill(digitsArabicIndicExtended, '۰', 0, 9);

// Tamil

const numbersTamil = [];
fill(numbersTamil, '௦', 0, 10);

// API

const zeroCode = '0'.charCodeAt(0);

export const numberPunctuation = s =>
  s.replace(
    /(\d)([\,\.])/g,
    (_, d, p) => (p === '.' ? numbersWithDots : digitsWithCommas)[d.charCodeAt(0) - zeroCode] + ' '
  );

export const transcodeTables = {
  circled: numbersCircled,
  parens: numbersWithParentheses,
  dots: numbersWithDots,
  doubleCircled: digitsDoubleCircled,
  bold: digitsBold,
  doubleStruck: digitsDoubleStruck,
  sansSerif: digitsSansSerif,
  sansSerifBold: digitsSansSerifBold,
  mono: digitsMono,
  commas: digitsWithCommas,
  roman: numbersRoman,
  romanLower: numbersRomanLower,
  arabicIndic: digitsArabicIndic,
  arabicIndicExtended: digitsArabicIndicExtended,
  tamil: numbersTamil
};

export const transcode = (s, name, {missing} = {}) => {
  const table = typeof name == 'string' ? transcodeTables[name] : name;
  if (!table) throw new Error(`There is no transcode table "${name}"`);
  return s.replace(/./g, missing ? m => table[m] || missing : m => table[m] || m);
};
