import {Writable} from 'node:stream';
import {StringsInput} from '../strings.js';

/** Options for `Writer.write()`. */
export interface WriteOptions {
  /** If true or 'save', keep cursor in the same column after writing. */
  sameColumn?: boolean | 'save';
  /** If true, omit the trailing newline on the last line. */
  noLastNewLine?: boolean;
  /** String prepended before each line. */
  beforeLine?: string;
  /** String appended after each line. */
  afterLine?: string;
}

/** Manages writing to a stream with cursor manipulation and color depth awareness. */
export class Writer {
  /** The underlying writable stream. */
  stream: Writable;
  /** Forced color depth override, or undefined to auto-detect. */
  forceColorDepth: number | undefined;

  /**
   * @param stream - Writable stream (default: stdout).
   * @param forceColorDepth - Override color depth.
   */
  constructor(stream?: Writable, forceColorDepth?: number);

  /** Whether the stream is a TTY. */
  readonly isTTY: boolean;
  /** Terminal width in columns. */
  readonly columns: number;
  /** Terminal height in rows. */
  readonly rows: number;
  /** Terminal dimensions. */
  readonly size: {columns: number; rows: number};

  /** Returns the color depth of the stream.
   * @param env - Environment variables to check (default: `process.env`).
   * @returns Color depth (1, 4, 8, or 24).
   */
  getColorDepth(env?: object): number;
  /** Checks if the stream supports the given number of colors.
   * @param count - Number of colors to check for.
   * @param env - Environment variables to check.
   * @returns True if supported.
   */
  hasColors(count?: number, env?: object): boolean;
  hasColors(env?: object): boolean;

  /** Clears the current line.
   * @param dir - Direction: -1 left, 0 entire, 1 right.
   * @returns Promise resolving when done.
   */
  clearLine(dir: number): Promise<boolean>;
  /** Clears from cursor to end of screen.
   * @returns Promise resolving when done.
   */
  clearScreenDown(): Promise<boolean>;

  /** Moves cursor to absolute position.
   * @param x - Column.
   * @param y - Row (optional).
   * @returns Promise resolving when done.
   */
  cursorTo(x: number, y?: number): Promise<boolean>;
  /** Moves cursor relative to current position.
   * @param dx - Columns.
   * @param dy - Rows.
   * @returns Promise resolving when done.
   */
  moveCursor(dx: number, dy: number): Promise<boolean>;

  /** Writes a raw string to the stream.
   * @param s - The string to write.
   * @returns Promise resolving when done.
   */
  writeString(s: string): Promise<void>;
  /** Writes a Box/string to the stream with optional cursor control.
   * @param s - Input: Box, string, or string array.
   * @param options - Write options.
   * @returns Promise resolving when done.
   */
  write(s: StringsInput, options?: WriteOptions): Promise<void>;
}

export default Writer;
