/** Direction index for left-pointing arrows. */
export const LEFT = 0,
  /** Direction index for up-pointing arrows. */
  UP = 1,
  /** Direction index for right-pointing arrows. */
  RIGHT = 2,
  /** Direction index for down-pointing arrows. */
  DOWN = 3;

const toSymbol = (...args) => args.map(x => (typeof x == 'number' ? String.fromCodePoint(x) : x));
const makeArrows = codePoint => toSymbol(codePoint, codePoint + 1, codePoint + 2, codePoint + 3);
const makeArrowsH = codePoint => toSymbol(codePoint, ' ', codePoint + 1, ' ');

// Arrows

/** Simple arrows [left, up, right, down]. */
export const simple = makeArrows(0x2190);
/** Arrows with stroke [left, up, right, down]. */
export const withStroke = makeArrowsH(0x219a);
/** Wave arrows [left, up, right, down]. */
export const wave = makeArrowsH(0x219c);
/** Two-headed arrows [left, up, right, down]. */
export const twoHeaded = makeArrows(0x219e);
/** Arrows with tail [left, up, right, down]. */
export const withTail = makeArrowsH(0x21a2);
/** Arrows from bar [left, up, right, down]. */
export const fromBar = makeArrows(0x21a4);
/** Arrows with loop [left, up, right, down]. */
export const withLoop = makeArrowsH(0x21ab);
/** Double arrows [left, up, right, down]. */
export const double = makeArrows(0x21d0);
/** Triple arrows [left, up, right, down]. */
export const triple = makeArrowsH(0x21da);
/** Squiggle arrows [left, up, right, down]. */
export const squiggle = makeArrowsH(0x21dc);
/** Dashed arrows [left, up, right, down]. */
export const dashed = makeArrows(0x21e0);
/** Arrows to bar [left, up, right, down]. */
export const toBar = makeArrowsH(0x21e4);
/** White (outline) arrows [left, up, right, down]. */
export const white = makeArrows(0x21e6);
/** Arrows with vertical stroke [left, up, right, down]. */
export const withVStroke = makeArrowsH(0x21f7);
/** Arrows with double vertical stroke [left, up, right, down]. */
export const withDoubleVStroke = makeArrowsH(0x21fa);
/** Open-headed arrows [left, up, right, down]. */
export const openHeaded = makeArrowsH(0x21fd);

/** Arrows with barb up [left, up, right, down]. */
export const withBarbUp = toSymbol(0x21bc, 0x21be, 0x21c1, 0x21c3);
/** Arrows with barb down [left, up, right, down]. */
export const withBarbDown = toSymbol(0x21bd, 0x21bf, 0x21c0, 0x21c2);
/** Double arrows with stroke [left, up, right, down]. */
export const doubleWithStroke = toSymbol(0x21cd, ' ', 0x21cf, ' ');
