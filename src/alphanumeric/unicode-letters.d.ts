import { SymbolRange } from './utils.js';

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

export function transcode(s: string, name: string | SymbolRange[], options?: { missing?: string }): string;
