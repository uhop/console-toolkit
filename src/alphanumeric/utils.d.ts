/** Maps a range of numeric values to Unicode code points for transcoding digits/letters. */
export class SymbolRange {
  from: number;
  to: number;
  base: number;
  inputBase: number;
  overlay: SymbolRange | Record<string, string> | null;

  constructor(fromSymbol: string, from?: number, to?: number, inputBase?: string);

  /** Gets the transcoded symbol for a value or character. */
  get(i: number | string): string | false;
  /** Transcodes a string by replacing each character with its mapped symbol. */
  transcode(s: string, options?: { missing?: string }): string;
}

/** Transcodes a string using one or more lookup tables. */
export function transcode(
  s: string,
  tables: ((m: string) => string | undefined) | SymbolRange | SymbolRange[] | Record<string, string>,
  options?: { missing?: string }
): string;
