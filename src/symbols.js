const generateSequence = (base, from, to) => {
  const result = [];

  let step;
  if (from < to) {
    step = 1;
    ++to; // to make inclusive
  } else {
    step = -1;
    --to; // to make inclusive
  }

  for (let i = from; i != to; i += step) result.push(String.fromCodePoint(base + i));
  return result;
};

// blocks

export const vBlocks8th = [' ', ...generateSequence(0x2581, 0, 7)];
export const hBlocks8th = [' ', ...generateSequence(0x2588, 7, 0, -1)];
export const fullBlock = '\u{2588}';

export const lLine = hBlocks8th[1];
export const rLine = `\u{2595}`;
export const tLine = `\u{2594}`;
export const bLine = vBlocks8th[1];

export const lHalf = hBlocks8th[4];
export const rHalf = `\u{2590}`;
export const tHalf = `\u{2580}`;
export const bHalf = vBlocks8th[4];

export const tlQuadrant = '\u{2598}';
export const blQuadrant = '\u{2596}';
export const trQuadrant = '\u{259D}';
export const brQuadrant = '\u{2597}';

export const tlBrQuadrants = `\u{259A}`;
export const trBlQuadrants = `\u{259E}`;

export const tlNegativeQuadrant = '\u{259F}';
export const blNegativeQuadrant = '\u{259C}';
export const trNegativeQuadrant = '\u{2599}';
export const brNegativeQuadrant = '\u{259B}';

export const quadrants = [
  ' ',
  tlQuadrant,
  trQuadrant,
  tHalf,
  blQuadrant,
  lHalf,
  trBlQuadrants,
  brNegativeQuadrant,
  brQuadrant,
  tlBrQuadrants,
  rHalf,
  blNegativeQuadrant,
  bHalf,
  trNegativeQuadrant,
  tlNegativeQuadrant,
  fullBlock
];

export const quadrant = (tl, tr, bl, br) => quadrants[(tl ? 1 : 0) + (tr ? 2 : 0) + (bl ? 4 : 0) + (br ? 8 : 0)];

// shades

export const shades = [' ', ...generateSequence(0x2591, 0, 2), fullBlock];

export const shadeLight = shades[1];
export const shadeMedium = shades[2];
export const shadeDark = shades[3];

// ellipses

export const hellip = '\u{2026}'; // horizontal ellipsis
export const vellip = '\u{22EE}'; // vertical ellipsis
export const ctdot = '\u{22EF}'; // midline horizontal ellipsis
export const utdot = '\u{22F0}'; // up right diagonal ellipsis
export const dtdot = '\u{22F1}'; // down right diagonal ellipsis

export {hellip as ellipsis};

// math

export const infinity = '\u{221e}';
export const plusMinus = '\u{00B1}';
export const minusPlus = '\u{2213}';
export const tilde = '\u{223C}'
export const minus = '\u{2212}';
export const multiplication = '\u{00D7}';
export const division = '\u{00F7}';
export const product = '\u{220F}';
export const sum = '\u{2211}';
export const forAll = '\u{2200}';
export const exist = '\u{2203}';
export const degree = '\u{00B0}';

export const superscriptPlus = '\u{207A}';
export const superscriptMinus = '\u{207B}';
export const subscriptPlus = '\u{208A}';
export const subscriptMinus = '\u{208B}';
