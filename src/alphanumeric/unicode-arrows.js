export const LEFT = 0,
  UP = 1,
  RIGHT = 2,
  DOWN = 3;

const toSymbol = (...args) => args.map(x => (typeof x == 'number' ? String.fromCodePoint(x) : x));
const makeArrows = codePoint => toSymbol(codePoint, codePoint + 1, codePoint + 2, codePoint + 3);
const makeArrowsH = codePoint => toSymbol(codePoint, ' ', codePoint + 1, ' ');

// Arrows

export const simple = makeArrows(0x2190);
export const withStroke = makeArrowsH(0x219a);
export const wave = makeArrowsH(0x219c);
export const twoHeaded = makeArrows(0x219e);
export const withTail = makeArrowsH(0x21a2);
export const fromBar = makeArrows(0x21a4);
export const withLoop = makeArrowsH(0x21ab);
export const double = makeArrows(0x21d0);
export const triple = makeArrowsH(0x21da);
export const squiggle = makeArrowsH(0x21dc);
export const dashed = makeArrows(0x21e0);
export const toBar = makeArrowsH(0x21e4);
export const white = makeArrows(0x21e6);
export const withVStroke = makeArrowsH(0x21f7);
export const withDoubleVStroke = makeArrowsH(0x21fa);
export const openHeaded = makeArrowsH(0x21fd);

export const withBarbUp = toSymbol(0x21bc, 0x21be, 0x21c1, 0x21c3);
export const withBarbDown = toSymbol(0x21bd, 0x21bf, 0x21c0, 0x21c2);
export const doubleWithStroke = toSymbol(0x21cd, ' ', 0x21cf, ' ');
