// @ts-self-types="./split.d.ts"
// Loosely adapted from https://www.npmjs.com/package/string-width by
// [Sindre Sorhus](https://www.npmjs.com/~sindresorhus) under the MIT license.

let eastAsianWidth = null;
try {
  eastAsianWidth = (await import('get-east-asian-width')).eastAsianWidth;
} catch {
  // squelch
}

// Bun's built-in is a fallback only: it miscounts some combining marks, so the package wins when present
const bunWidth = !eastAsianWidth && globalThis.Bun ? globalThis.Bun.stringWidth : null;

const rgiEmoji = /^\p{RGI_Emoji}$/v,
  unqualifiedKeycap = /^[\d#*]\u20E3$/,
  pictographic = /\p{Extended_Pictographic}/gu;

// after string-width: RGI emoji, plus unqualified keycaps and ZWJ sequences, which terminals also draw wide;
// no single code point below U+00A9 is an emoji, and the length cap keeps pathological clusters cheap
const isWideEmoji = (segment, codePoint) =>
  (segment.length > 1 || codePoint >= 0xa9) &&
  (rgiEmoji.test(segment) ||
    unqualifiedKeycap.test(segment) ||
    (segment.length <= 50 && segment.includes('\u200D') && (segment.match(pictographic)?.length ?? 0) > 1));

// zero-width as in glibc's wcwidth(): nonspacing and enclosing marks, Default_Ignorable_Code_Point, and Format,
// less the format characters it draws with a width; unquantified, since a quantified property pattern
// backtracks badly on huge clusters (after string-width)
const visible =
  /[^[\p{Nonspacing_Mark}\p{Enclosing_Mark}\p{Default_Ignorable_Code_Point}\p{Format}]--[\u00AD\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u115F\uFFF9-\uFFFB\u{110BD}\u{110CD}\u{13430}-\u{1343F}]]/v;

// [start, end) ranges without such characters, sorted, so common scripts skip the regex (tested)
const noInvisibles = [
  0xae, 0x300, 0x370, 0x483, 0x48a, 0x591, 0x1e00, 0x200b, 0x2070, 0x20d0, 0x20f1, 0x2cef, 0x2e00, 0x302a, 0x302e,
  0x3099, 0x309b, 0x3164, 0x3165, 0xa66f, 0xabee, 0xfb1e, 0xff00, 0xffa0
];

// an odd count of boundaries at or below codePoint puts it inside a range
const mayBeInvisible = codePoint => {
  if (codePoint < 0xad) return false;
  let low = 0,
    high = noInvisibles.length;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (noInvisibles[middle] <= codePoint) low = middle + 1;
    else high = middle;
  }
  return !(low & 1);
};

const segmenter = new Intl.Segmenter();

export const split = (s, options = {}) => {
  s = String(s);
  if (!s) return {graphemes: [], width: 0};

  const {ignoreControlSymbols = false, ambiguousAsWide = false} = options,
    eastAsianWidthOptions = {ambiguousAsWide};

  const graphemes = [];
  let width = 0,
    leading = '';
  for (const {segment} of segmenter.segment(s)) {
    let codePoint = segment.codePointAt(0);
    // Control characters: C0, C1
    if (ignoreControlSymbols && (codePoint < 0x20 || (codePoint >= 0x7f && codePoint <= 0x9f))) continue;
    if (mayBeInvisible(codePoint)) {
      const index = segment.search(visible);
      if (index < 0) {
        if (graphemes.length) graphemes[graphemes.length - 1].symbol += segment;
        else leading += segment;
        continue;
      }
      codePoint = segment.codePointAt(index);
    }
    if (bunWidth) {
      const w = bunWidth(segment, {ambiguousAsNarrow: !ambiguousAsWide});
      graphemes.push({symbol: segment, width: w});
      width += w;
      continue;
    }
    if (isWideEmoji(segment, codePoint)) {
      graphemes.push({symbol: segment, width: 2});
      width += 2;
      continue;
    }
    if (eastAsianWidth) {
      const w = eastAsianWidth(codePoint, eastAsianWidthOptions);
      graphemes.push({symbol: segment, width: w});
      width += w;
      continue;
    }
    graphemes.push({symbol: segment, width: 1});
    ++width;
  }
  if (leading && graphemes.length) graphemes[0].symbol = leading + graphemes[0].symbol;
  return {graphemes, width};
};

export const size = (s, options = {}) => {
  s = String(s);
  if (!s) return 0;

  const {ignoreControlSymbols = false, ambiguousAsWide = false} = options,
    eastAsianWidthOptions = {ambiguousAsWide};

  let width = 0;
  for (const {segment} of segmenter.segment(s)) {
    let codePoint = segment.codePointAt(0);
    // Control characters: C0, C1
    if (ignoreControlSymbols && (codePoint < 0x20 || (codePoint >= 0x7f && codePoint <= 0x9f))) continue;
    if (mayBeInvisible(codePoint)) {
      const index = segment.search(visible);
      if (index < 0) continue;
      codePoint = segment.codePointAt(index);
    }
    if (bunWidth) {
      width += bunWidth(segment, {ambiguousAsNarrow: !ambiguousAsWide});
      continue;
    }
    if (isWideEmoji(segment, codePoint)) {
      width += 2;
      continue;
    }
    if (eastAsianWidth) {
      width += eastAsianWidth(codePoint, eastAsianWidthOptions);
      continue;
    }
    ++width;
  }
  return width;
};

export default split;
