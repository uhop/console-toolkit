export const matchCsiNoGroups = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E]/g;

export const getLength = (s, matcher = matchCsiNoGroups) => {
  let captured = 0;
  for (const match of String(s).matchAll(matcher)) {
    captured += match[0].length;
  }
  return s.length - captured;
};
