// Loosely adapted on https://www.npmjs.com/package/string-width by
// [Sindre Sorhus](https://www.npmjs.com/~sindresorhus) under the MIT license.

let emojiRegex = null;
try {
  emojiRegex = (await import('emoji-regex')).default();
} catch (error) {
  // squelch
}

let eastAsianWidth = null;
try {
  eastAsianWidth = (await import('get-east-asian-width')).eastAsianWidth;
} catch (error) {
  // squelch
}

const segmenter = new Intl.Segmenter();

export const split = (s, options = {}) => {
  s = String(s);
  if (!s) return {graphemes: [], width: 0};

  const {ignoreControlSymbols = false, ambiguousAsWide = false} = options,
    eastAsianWidthOptions = {ambiguousAsWide};

  const graphemes = [];
  let width = 0;
  for (const {segment} of segmenter.segment(s)) {
    const codePoint = segment.codePointAt(0);
    // Control characters: C0, C1
    if (ignoreControlSymbols && (codePoint < 0x20 || (codePoint >= 0x7f && codePoint <= 0x9f))) continue;
    // Combining characters
    if (
      (codePoint >= 0x300 && codePoint <= 0x36f) ||
      (codePoint >= 0x1ab0 && codePoint <= 0x1aff) ||
      (codePoint >= 0x1dc0 && codePoint <= 0x1dff) ||
      (codePoint >= 0x20d0 && codePoint <= 0x20ff) ||
      (codePoint >= 0xfe20 && codePoint <= 0xfe2f)
    ) {
      if (graphemes.length) graphemes[graphemes.length - 1].symbol += segment;
      continue;
    }
    if (emojiRegex && ((emojiRegex.lastIndex = 0), emojiRegex.test(segment))) {
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
  return {graphemes, width};
};

export const size = (s, options = {}) => {
  s = String(s);
  if (!s) return 0;

  const {ignoreControlSymbols = false, ambiguousAsWide = false} = options,
    eastAsianWidthOptions = {ambiguousAsWide};

  let width = 0;
  for (const {segment} of segmenter.segment(s)) {
    const codePoint = segment.codePointAt(0);
    // Control characters: C0, C1
    if (ignoreControlSymbols && (codePoint < 0x20 || (codePoint >= 0x7f && codePoint <= 0x9f))) continue;
    // Combining characters
    if (
      (codePoint >= 0x300 && codePoint <= 0x36f) ||
      (codePoint >= 0x1ab0 && codePoint <= 0x1aff) ||
      (codePoint >= 0x1dc0 && codePoint <= 0x1dff) ||
      (codePoint >= 0x20d0 && codePoint <= 0x20ff) ||
      (codePoint >= 0xfe20 && codePoint <= 0xfe2f)
    ) {
      continue;
    }
    if (emojiRegex && ((emojiRegex.lastIndex = 0), emojiRegex.test(segment))) {
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
