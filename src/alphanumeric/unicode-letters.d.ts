import {SymbolRange} from './utils.js';

/** Transcode tables for mathematical and decorative letter styles. */
export const transcodeTables: {
  bold: SymbolRange[];
  italic: SymbolRange[];
  boldItalic: SymbolRange[];
  sansSerif: SymbolRange[];
  sansSerifBold: SymbolRange[];
  sansSerifItalic: SymbolRange[];
  sansSerifBoldItalic: SymbolRange[];
  script: SymbolRange[];
  scriptBold: SymbolRange[];
  fraktur: SymbolRange[];
  frakturBold: SymbolRange[];
  mono: SymbolRange[];
  doubleStruck: SymbolRange[];
  parens: SymbolRange[];
  circled: SymbolRange[];
  squared: SymbolRange[];
  negativeCircled: SymbolRange[];
  negativeSquared: SymbolRange[];
  regionalIndicators: SymbolRange[];
};

/** Transcodes a string to a Unicode letter style.
 * @param s - The string to transcode.
 * @param name - Style name (key of `transcodeTables`) or an array of SymbolRanges.
 * @param options - Options.
 * @returns The transcoded string.
 */
export function transcode(s: string, name: string | SymbolRange[], options?: {missing?: string}): string;
