import {SymbolRange} from './utils.js';

export const transcodeTables = {
  // Enclosed Alphanumeric
  circled: new SymbolRange('①', 1, 20),
  parens: new SymbolRange('⑴', 1, 20),
  dots: new SymbolRange('⒈', 1, 20),
  doubleCircled: new SymbolRange('⓵', 1),

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
  dingbatsNegativeCircledSansSerif: new SymbolRange('➊', 1, 10)
};

// const numbersWithDots = ['🄀'];
// fill(numbersWithDots, '⒈', 1, 20);

// API

const zeroCode = '0'.charCodeAt(0);

export const numberPunctuation = s =>
  s.replace(/(\d)([\,\.])/g, (_, d, p) => transcodeTables[p === '.' ? 'dots' : 'commas'].transcode(d) + ' ');

export const transcode = (s, name, {missing} = {}) => {
  const table = typeof name == 'string' ? transcodeTables[name] : name;
  if (!table) throw new Error(`There is no transcode table "${name}"`);
  if (typeof table.transcode == 'function') return table.transcode(s, missing);
  return s.replace(/./g, missing ? m => table[m] || missing : m => table[m] || m);
};
