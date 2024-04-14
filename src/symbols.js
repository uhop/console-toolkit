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
  brQuadrant,
  tlBrQuadrants,
  rHalf,
  blNegativeQuadrant,
  blQuadrant,
  lHalf,
  trBlQuadrants,
  brNegativeQuadrant,
  bHalf,
  trNegativeQuadrant,
  tlNegativeQuadrant,
  fullBlock
];

export const quadrant = (tl, tr, br, bl) => quadrants[(tl ? 1 : 0) + (tr ? 2 : 0) + (br ? 4 : 0) + (bl ? 1 : 0)];

export const shades = [' ', ...generateSequence(0x2591, 0, 2), fullBlock];

export const shadeLight = shades[1];
export const shadeMedium = shades[2];
export const shadeDark = shades[3];
