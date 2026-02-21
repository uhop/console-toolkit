import {Writable} from 'node:stream';

/** Options for `log()`. */
export interface LogOptions {
  /** ANSI command appended at the end of each line. */
  endOfLineCommand?: string;
  /** Color depth (1, 4, 8, or 24). If < 4, ANSI codes are stripped. */
  colorDepth?: number;
}

/** Options for `out()`. */
export interface OutOptions {
  /** Writable stream to output to (default: stdout). */
  stream?: Writable;
  /** ANSI command appended at the end of each line. */
  endOfLineCommand?: string;
  /** Color depth (1, 4, 8, or 24). If < 4, ANSI codes are stripped. */
  colorDepth?: number;
}

/** Logs a text container to the console via `console.log()`. Strips ANSI codes if colorDepth < 4.
 * @param s - Input: Box, string, string array, or object with `toStrings()`.
 * @param options - Log options.
 */
// TODO_REVIEW: `s` accepts Box | string | string[] | {toStrings(): string[]} — consider narrowing
export function log(s: any, options?: LogOptions): void;
/** Writes a text container to a stream (default: stdout).
 * @param s - Input: Box, string, string array, or object with `toStrings()`.
 * @param options - Output options.
 */
// TODO_REVIEW: `s` accepts Box | string | string[] | {toStrings(): string[]} — consider narrowing
export function out(s: any, options?: OutOptions): void;

/** Wraps a writable stream for outputting styled text. */
export class Out {
  /** The underlying writable stream. */
  stream: Writable;
  /** The detected or configured color depth. */
  colorDepth: number;

  /**
   * @param stream - The writable stream to wrap.
   */
  constructor(stream: Writable);

  /** Writes a text container to the stream.
   * @param s - Input: Box, string, string array, or object with `toStrings()`.
   * @param options - Output options.
   */
  // TODO_REVIEW: `s` accepts Box | string | string[] | {toStrings(): string[]} — consider narrowing
  out(s: any, options?: {endOfLineCommand?: string; colorDepth?: number}): void;
}

/** Writes a debug string to stderr.
 * @param string - The debug message.
 */
export function debug(string: string): void;
