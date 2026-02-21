/** Maps a range of numeric values to Unicode code points for transcoding digits/letters. */
export class SymbolRange {
  /** Start of the numeric range. */
  from: number;
  /** End of the numeric range (inclusive). */
  to: number;
  /** Unicode code point base offset. */
  base: number;
  /** Code point of the input character corresponding to 0. */
  inputBase: number;
  /** Optional overlay for custom symbol replacements. */
  overlay: SymbolRange | Record<string, string> | null;

  /** Creates a new SymbolRange.
   * @param fromSymbol - The Unicode character corresponding to the `from` value.
   * @param from - Start of the range (default: 0).
   * @param to - End of the range inclusive (default: 9).
   * @param inputBase - The input character corresponding to 0 (default: '0').
   */
  constructor(fromSymbol: string, from?: number, to?: number, inputBase?: string);

  /** Gets the transcoded symbol for a value or character.
   * @param i - Numeric index or input character.
   * @returns The transcoded symbol, or `false` if out of range.
   */
  get(i: number | string): string | false;
  /** Transcodes a string by replacing each character with its mapped symbol.
   * @param s - The string to transcode.
   * @param options - Options.
   * @returns The transcoded string.
   */
  transcode(s: string, options?: {missing?: string}): string;
}

/** Transcodes a string using one or more lookup tables.
 * @param s - The string to transcode.
 * @param tables - A function, SymbolRange, array of SymbolRanges, or a plain mapping object.
 * @param options - Options.
 * @returns The transcoded string.
 */
export function transcode(
  s: string,
  tables: ((m: string) => string | undefined) | SymbolRange | SymbolRange[] | Record<string, string>,
  options?: {missing?: string}
): string;
