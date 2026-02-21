export class SymbolRange {
  from: number;
  to: number;
  base: number;
  inputBase: number;
  overlay: SymbolRange | Record<string, string> | null;

  constructor(fromSymbol: string, from?: number, to?: number, inputBase?: string);

  get(i: number | string): string | false;
  transcode(s: string, options?: { missing?: string }): string;
}

export function transcode(
  s: string,
  tables: ((m: string) => string | undefined) | SymbolRange | SymbolRange[] | Record<string, string>,
  options?: { missing?: string }
): string;
