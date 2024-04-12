export const matchCsiNoGroups = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E]/g;

export const getLength = (s, matcher = matchCsiNoGroups) => {
  s = String(s);
  let counter = 0,
    start = 0;
  matcher.lastIndex = 0;
  for (const match of s.matchAll(matcher)) {
    counter += [...s.substring(start, match.index)].length;
    start = match.index + match[0].length;
  }
  counter += [...s.substring(start)].length;
  return counter;
};

export const getMaxLength = (strings, matcher = matchCsiNoGroups) =>
  Math.max(0, ...strings.map(s => getLength(s, matcher)));
