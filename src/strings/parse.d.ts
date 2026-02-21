export const matchCsiNoGroups: RegExp;
export const matchCsiNoSgrNoGroups: RegExp;

export interface ParseResult {
  start: number;
  string: string;
  match: RegExpMatchArray | null;
}

export function parse(s: string, matcher?: RegExp): Generator<ParseResult, void, unknown>;

export default parse;
