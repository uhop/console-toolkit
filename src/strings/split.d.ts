export interface Grapheme {
  symbol: string;
  width: number;
}

export interface SplitResult {
  graphemes: Grapheme[];
  width: number;
}

export interface SplitOptions {
  ignoreControlSymbols?: boolean;
  ambiguousAsWide?: boolean;
}

/** Splits a string into graphemes with their display widths. */
export function split(s: string, options?: SplitOptions): SplitResult;
/** Returns the display width of a string. */
export function size(s: string, options?: SplitOptions): number;

export default split;
