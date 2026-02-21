/** RegExp that matches CSI sequences with no capture groups. */
export const matchCsiNoGroups = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E]/g;
/** RegExp that matches CSI sequences excluding SGR commands, with no capture groups. */
export const matchCsiNoSgrNoGroups = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x6C\x6E-\x7E]/g;

/** Parses a string yielding segments of text and matched ANSI escape sequences.
 * @param {string} s - The string to parse.
 * @param {RegExp} [matcher=matchCsiNoGroups] - The regular expression used to match escape sequences.
 * @yields {{start: number, string: string, match: RegExpMatchArray | null}} Parsed segments.
 */
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
