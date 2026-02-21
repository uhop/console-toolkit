import { Writable } from 'node:stream';

export interface LogOptions {
  endOfLineCommand?: string;
  colorDepth?: number;
}

export interface OutOptions {
  stream?: Writable;
  endOfLineCommand?: string;
  colorDepth?: number;
}

/** Logs a text container to the console via `console.log()`. Strips ANSI codes if colorDepth < 4. */
export function log(s: any, options?: LogOptions): void;
/** Writes a text container to a stream (default: stdout). */
export function out(s: any, options?: OutOptions): void;

/** Wraps a writable stream for outputting styled text. */
export class Out {
  stream: Writable;
  colorDepth: number;

  constructor(stream: Writable);

  out(s: any, options?: { endOfLineCommand?: string; colorDepth?: number }): void;
}

/** Writes a debug string to stderr. */
export function debug(string: string): void;
