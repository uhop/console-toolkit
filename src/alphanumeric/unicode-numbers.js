import {SymbolRange, transcode as internalTranscode} from './utils.js';
import {minus, multiplication, superscriptPlus, superscriptMinus} from '../symbols.js';

/** Transcode tables for Unicode number styles and embellishments. */
export const transcodeTables = {
  // Enclosed Alphanumeric
  circled: new SymbolRange('①', 1, 20),
  parens: new SymbolRange('⑴', 1, 20),
  dots: new SymbolRange('⒈', 1, 20),
  doubleCircled: new SymbolRange('⓵', 1, 10),

  // Mathematical Alphanumeric Symbols
  bold: new SymbolRange('𝟎'),
  doubleStruck: new SymbolRange('𝟘'),
  sansSerif: new SymbolRange('𝟢'),
  sansSerifBold: new SymbolRange('𝟬'),
  mono: new SymbolRange('𝟶'),

  // Enclosed Alphanumeric Supplement
  commas: new SymbolRange('🄁'),

  // Number Forms
  roman: new SymbolRange('Ⅰ', 1, 12),
  romanLower: new SymbolRange('ⅰ', 1, 12),

  // Dingbats
  dingbatsCircledSansSerif: new SymbolRange('➀', 1, 10),
  dingbatsNegativeCircled: new SymbolRange('❶', 1, 10),
  dingbatsNegativeCircledSansSerif: new SymbolRange('➊', 1, 10),

  // Superscripts and Subscripts
  superscript: new SymbolRange('⁰'),
  subscript: new SymbolRange('₀')
};

// patches

const circled_21_35 = new SymbolRange('\u{3251}', 21, 35),
  circled_36_50 = new SymbolRange('\u{32B1}', 36, 50);
circled_36_50.overlay = {0: '\u{24EA}'};
circled_21_35.overlay = circled_36_50;
transcodeTables.circled.overlay = circled_21_35;

transcodeTables.dots.overlay = {0: '🄀'};

const negativeCircled_11_20 = new SymbolRange('\u{24EB}', 11, 20);
negativeCircled_11_20.overlay = {0: '\u{24FF}'};
transcodeTables.dingbatsNegativeCircled.overlay = negativeCircled_11_20;

transcodeTables.superscript.overlay = {1: '¹', 2: '²', 3: '³'};

// API

/** Transcodes a string of digits to a Unicode number style.
 * @param {string} s - The digit string to transcode.
 * @param {string|import('./utils.js').SymbolRange} name - Style name (key of `transcodeTables`) or a SymbolRange.
 * @param {object} [options] - Options.
 * @param {string} [options.missing] - Replacement for unmapped characters.
 * @returns {string} The transcoded string.
 */
export const transcode = (s, name, options) => {
  const table = typeof name == 'string' ? transcodeTables[name] : name;
  if (!table) throw new Error(`There is no transcode table "${name}"`);
  return internalTranscode(s, table, options);
};

/** Replaces digit-punctuation pairs with Unicode enclosed digits.
 * @param {string} s - The string containing digits with commas/dots.
 * @param {object} [options] - Options for surrounding text.
 * @param {string} [options.addBefore=''] - String to add before a digit.
 * @param {string} [options.addAfter=' '] - String to add after a digit.
 * @returns {string} The string with Unicode punctuation replacements.
 */
export const numberPunctuation = (s, {addBefore = '', addAfter = ' '} = {}) =>
  s.replace(
    /(\d)([\,\.])/g,
    (_, d, p) => addBefore + transcodeTables[p === '.' ? 'dots' : 'commas'].transcode(d) + addAfter
  );

/** Converts scientific notation to Unicode superscript exponent form.
 * @param {string} s - The number string in scientific notation (e.g., '1.5e10').
 * @param {object} [options] - Options.
 * @param {boolean} [options.useSpecialMinus] - If true, use a special math minus symbol.
 * @returns {string} The formatted string with Unicode superscripts.
 */
export const numberExponent = (s, {useSpecialMinus} = {}) => {
  const r = /^([+-]?)([^e]+)e([+-]?)(.+)$/i.exec(s);
  return r
    ? (r[1] === '-' && useSpecialMinus ? minus : r[1]) +
        r[2] +
        multiplication +
        '10' +
        (r[3] === '+' ? superscriptPlus : r[3] === '-' ? superscriptMinus : r[3]) +
        transcode(r[4], transcodeTables.superscript)
    : s;
};
