/** A single grapheme with its display width. */
export interface Grapheme {
  /** The grapheme string. */
  symbol: string;
  /** The display width in columns. */
  width: number;
}

/** Result of splitting a string into graphemes. */
export interface SplitResult {
  /** Array of graphemes. */
  graphemes: Grapheme[];
  /** Total display width. */
  width: number;
}

/** Options for `split()` and `size()`. */
export interface SplitOptions {
  /** If true, ignore control symbols. */
  ignoreControlSymbols?: boolean;
  /** If true, treat East Asian ambiguous-width characters as wide. */
  ambiguousAsWide?: boolean;
}

/** Splits a string into graphemes with their display widths.
 * @param s - The string to split.
 * @param options - Split options.
 * @returns The graphemes and total width.
 */
export function split(s: string, options?: SplitOptions): SplitResult;
/** Returns the display width of a string.
 * @param s - The string to measure.
 * @param options - Split options.
 * @returns The display width in columns.
 */
export function size(s: string, options?: SplitOptions): number;

export default split;
