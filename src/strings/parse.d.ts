/** RegExp matching CSI sequences without capture groups. */
export const matchCsiNoGroups: RegExp;
/** RegExp matching CSI sequences excluding SGR, without capture groups. */
export const matchCsiNoSgrNoGroups: RegExp;

/** A segment yielded by the `parse()` generator. */
export interface ParseResult {
  /** Start index of this segment in the original string. */
  start: number;
  /** The text content of this segment. */
  string: string;
  /** The RegExp match for an escape sequence, or `null` for plain text. */
  match: RegExpMatchArray | null;
}

/** Generator that yields segments of text and matched ANSI escape sequences.
 * @param s - The string to parse.
 * @param matcher - RegExp for matching escape sequences (default: matchCsiNoGroups).
 * @returns A generator of ParseResult segments.
 */
export function parse(s: string, matcher?: RegExp): Generator<ParseResult, void, unknown>;

export default parse;
