export const matchCsiNoGroups = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E]/g;
export const matchCsiNoSgrNoGroups = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x6C\x6E-\x7E]/g;

export function* parse(s, matcher = matchCsiNoGroups) {
  s = String(s);
  let start = 0;
  matcher.lastIndex = 0;
  for (const match of s.matchAll(matcher)) {
    const string = s.substring(start, match.index);
    yield {start, string, match};
    start = match.index + match[0].length;
  }
  yield {start, string: s.substring(start), match: null};
}

export default parse;
