/** RegExp matching CSI sequences without capture groups. */
export const matchCsiNoGroups: RegExp;
/** RegExp matching CSI sequences excluding SGR, without capture groups. */
export const matchCsiNoSgrNoGroups: RegExp;

export interface ParseResult {
  start: number;
  string: string;
  match: RegExpMatchArray | null;
}

/** Generator that yields segments of text and matched ANSI escape sequences. */
export function parse(s: string, matcher?: RegExp): Generator<ParseResult, void, unknown>;

export default parse;
