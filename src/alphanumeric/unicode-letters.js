import {SymbolRange, transcode as internalTranscode} from './utils.js';

const range = (fromCapital, fromSmall) => [
  new SymbolRange(fromCapital, 0, 25, 'A'),
  new SymbolRange(fromSmall, 0, 25, 'a')
];

export const transcodeTables = {
  bold: range('\u{1D400}', '\u{1D41A}'),
  italic: range('\u{1D434}', '\u{1D44E}'),
  boldItalic: range('\u{1D468}', '\u{1D482}'),
  sansSerif: range('\u{1D5A0}', '\u{1D5BA}'),
  sansSerifBold: range('\u{1D5D4}', '\u{1D5EE}'),
  sansSerifItalic: range('\u{1D608}', '\u{1D622}'),
  sansSerifBoldItalic: range('\u{1D63C}', '\u{1D656}'),
  script: range('\u{1D49C}', '\u{1D4B6}'),
  scriptBold: range('\u{1D4D0}', '\u{1D4EA}'),
  fraktur: range('\u{1D504}', '\u{1D51E}'),
  frakturBold: range('\u{1D56C}', '\u{1D586}'),
  mono: range('\u{1D670}', '\u{1D68A}'),
  doubleStruck: range('\u{1D538}', '\u{1D552}')
};

// patches as suggested in https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols

transcodeTables.script[0].overlay = {
  B: '\u{212C}',
  E: '\u{2130}',
  F: '\u{2131}',
  H: '\u{210B}',
  I: '\u{2110}',
  L: '\u{2112}',
  M: '\u{2133}',
  R: '\u{211B}'
};
transcodeTables.fraktur[0].overlay = {C: '\u{212D}', H: '\u{210C}', I: '\u{2111}', R: '\u{211C}', Z: '\u{2128}'};
transcodeTables.doubleStruck[0].overlay = {
  C: '\u{2102}',
  H: '\u{210D}',
  N: '\u{2115}',
  P: '\u{2119}',
  Q: '\u{211A}',
  R: '\u{211D}',
  Z: '\u{2124}'
};

transcodeTables.italic[1].overlay = {h: '\u{210E}'};
transcodeTables.script[1].overlay = {e: '\u{212F}', g: '\u{210A}', o: '\u{2134}'};

// API

export const transcode = (s, name, options) => {
  let tables = typeof name == 'string' ? transcodeTables[name] : name;
  if (!tables) throw new Error(`There is no transcode table "${name}"`);
  return internalTranscode(s, tables, options);
};
