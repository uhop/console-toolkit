/** Options for the `clip()` function. */
export interface ClipOptions {
  /** If true, include the last ANSI command at the clip boundary. */
  includeLastCommand?: boolean;
  /** If true, append the SGR commands that leave the clipped string in the same SGR state as the whole string,
   * so styles closed in the cut-off part stay closed. SGR is read regardless of `matcher`. Defaults to false,
   * except in `Box.clip()`.
   */
  preserveState?: boolean;
  /** RegExp for matching escape sequences. */
  matcher?: RegExp;
  /** If true, ignore control symbols when calculating width. */
  ignoreControlSymbols?: boolean;
  /** If true, treat East Asian ambiguous-width characters as wide. */
  ambiguousAsWide?: boolean;
}

/** Clips a string to a given display width, correctly handling ANSI escape codes and multi-width characters.
 * @param s - The string to clip.
 * @param width - Maximum display width.
 * @param options - Clip options.
 * @returns The clipped string.
 */
export function clip(s: string, width: number, options?: ClipOptions): string;

export default clip;
