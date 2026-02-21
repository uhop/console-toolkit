import { SymbolRange } from './utils.js';

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

export function transcode(s: string, name: string | SymbolRange, options?: { missing?: string }): string;

export function numberPunctuation(s: string, options?: { addBefore?: string; addAfter?: string }): string;

export function numberExponent(s: string, options?: { useSpecialMinus?: boolean }): string;
