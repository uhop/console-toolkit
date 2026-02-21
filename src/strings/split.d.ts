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

export function split(s: string, options?: SplitOptions): SplitResult;
export function size(s: string, options?: SplitOptions): number;

export default split;
