import {SymbolRange} from './utils.js';

export const transcodeTables = {
  arabicIndic: new SymbolRange('٠'),
  arabicIndicExtended: new SymbolRange('۰'),
  tamil: new SymbolRange('௦', 0, 10),
  nko: new SymbolRange('߀'),
  devanagari: new SymbolRange('०'),
  bengali: new SymbolRange('০'),
  gurmukhi: new SymbolRange('੦'),
  gujarati: new SymbolRange('૦'),
  oriya: new SymbolRange('୦'),
  telugu: new SymbolRange('౦'),
  kannada: new SymbolRange('೦'),
  malayalam: new SymbolRange('൦', 0, 10),
  thai: new SymbolRange('๐'),
  lao: new SymbolRange('໐'),
  myanmar: new SymbolRange('၀'),
  myanmarShan: new SymbolRange('႐'),
  ethiopic: new SymbolRange('፩', 1, 10),
  khmer: new SymbolRange('០'),
  mongolian: new SymbolRange('᠐'),
  limbu: new SymbolRange('᥆'),
  balinese: new SymbolRange('᭐'),
  sundanese: new SymbolRange('᮰'),
  lepcha: new SymbolRange('᱀'),
  vai: new SymbolRange('꘠'),
  saurashtra: new SymbolRange('꣐'),
  javanese: new SymbolRange('꧐'),
  cham: new SymbolRange('꩐'),
  osmanya: new SymbolRange('𐒠'),
  kharoshthi: new SymbolRange('𐩀', 1, 4),
  rumi: new SymbolRange('𐹠', 1, 10),
  brahmi: new SymbolRange('𑁦'),
  brahmiNumbers: new SymbolRange('𑁒', 1, 10),
  chakma: new SymbolRange('𑄶'),
  sharada: new SymbolRange('𑇐'),
  khudawadi: new SymbolRange('𑋰'),
  newa: new SymbolRange('𑑐'),
  tirhuta: new SymbolRange('𑓐'),
  modi: new SymbolRange('𑙐'),
  takri: new SymbolRange('𑛀'),
  ahom: new SymbolRange('𑜰', 0, 10),
  bhaiksuki: new SymbolRange('𑱐'),
  bhaiksukiNumbers: new SymbolRange('𑱚', 1, 10),
  // kawi: new SymbolRange('𑽐'),
  mro: new SymbolRange('𖩠'),
  // tangsa: new SymbolRange('𖫀'),
  medefaidrin: new SymbolRange('𖺀', 0, 19),
  wancho: new SymbolRange('𞋰'),
  adlam: new SymbolRange('𞥐'),
  aegean: new SymbolRange('𐄇', 1, 10),
  palmyren: new SymbolRange('𐡹', 1, 5),
  nabataean: new SymbolRange('𐢧', 1, 4),
  oldPersian: new SymbolRange('𐏑', 1, 2),
  imperialAramaic: new SymbolRange('𐡘', 1, 3),
  meroiticCursive: new SymbolRange('𐧀', 1, 10),
  inscriptionalParthian: new SymbolRange('𐭘', 1, 4),
  inscriptionalPahlavi: new SymbolRange('𐭸', 1, 4),
  psalterPahlavi: new SymbolRange('𐮩', 1, 4),
  oldSogdian: new SymbolRange('𐼝', 1, 5),
  indicSiyaq: new SymbolRange('𞱱', 1, 10),
  indicSiyaqPrefixed: new SymbolRange('𞲣', 1, 9),
  indicSiyaqAlternate: new SymbolRange('𞲱', 1, 2),
  // ottomanSiyaq: new SymbolRange('𞴁', 1, 10),
  // ottomanSiyaqAlternative: new SymbolRange('𞴯', 2, 10),
  copticEpact: new SymbolRange('𐋡', 1, 10)
};
