export interface ClipOptions {
  includeLastCommand?: boolean;
  matcher?: RegExp;
  ignoreControlSymbols?: boolean;
  ambiguousAsWide?: boolean;
}

export function clip(s: string, width: number, options?: ClipOptions): string;

export default clip;
