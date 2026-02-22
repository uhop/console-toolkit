import {Writable} from 'node:stream';
import {StringsInput} from '../strings.js';

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
export function log(s: StringsInput, options?: LogOptions): void;
/** Writes a text container to a stream (default: stdout).
 * @param s - Input: Box, string, string array, or object with `toStrings()`.
 * @param options - Output options.
 */
export function out(s: StringsInput, options?: OutOptions): void;

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
  out(s: StringsInput, options?: {endOfLineCommand?: string; colorDepth?: number}): void;
}

/** Logs a string with non-printable characters visualized as hex escape sequences via `console.log()`.
 * @param string - The string to debug.
 */
export function debug(string: string): void;
