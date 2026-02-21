import {SymbolRange} from './utils.js';

/** Transcode tables for Unicode number styles and embellishments. */
export const transcodeTables: {
  circled: SymbolRange;
  parens: SymbolRange;
  dots: SymbolRange;
  doubleCircled: SymbolRange;
  bold: SymbolRange;
  doubleStruck: SymbolRange;
  sansSerif: SymbolRange;
  sansSerifBold: SymbolRange;
  mono: SymbolRange;
  commas: SymbolRange;
  roman: SymbolRange;
  romanLower: SymbolRange;
  dingbatsCircledSansSerif: SymbolRange;
  dingbatsNegativeCircled: SymbolRange;
  dingbatsNegativeCircledSansSerif: SymbolRange;
  superscript: SymbolRange;
  subscript: SymbolRange;
};

/** Transcodes a string of digits to a Unicode number style.
 * @param s - The digit string to transcode.
 * @param name - Style name (key of `transcodeTables`) or a SymbolRange.
 * @param options - Options.
 * @returns The transcoded string.
 */
export function transcode(s: string, name: string | SymbolRange, options?: {missing?: string}): string;

/** Replaces digit-punctuation pairs with Unicode enclosed digits.
 * @param s - The string containing digits with commas/dots.
 * @param options - Options for surrounding text.
 * @returns The string with Unicode punctuation replacements.
 */
export function numberPunctuation(s: string, options?: {addBefore?: string; addAfter?: string}): string;

/** Converts scientific notation to Unicode superscript exponent form.
 * @param s - The number string in scientific notation (e.g., '1.5e10').
 * @param options - Options.
 * @returns The formatted string with Unicode superscripts.
 */
export function numberExponent(s: string, options?: {useSpecialMinus?: boolean}): string;
