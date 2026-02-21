export interface ClipOptions {
  includeLastCommand?: boolean;
  matcher?: RegExp;
  ignoreControlSymbols?: boolean;
  ambiguousAsWide?: boolean;
}

/** Clips a string to a given display width, correctly handling ANSI escape codes and multi-width characters. */
export function clip(s: string, width: number, options?: ClipOptions): string;

export default clip;
