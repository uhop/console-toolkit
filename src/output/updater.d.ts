import Writer from './writer.js';
import {StringsInput} from '../strings.js';

/** Options for `Updater` constructor. */
export interface UpdaterOptions {
  /** String written before the first frame. */
  prologue?: string;
  /** String written after the final frame. */
  epilogue?: string;
  /** String written before each frame. */
  beforeFrame?: string;
  /** String written after each frame. */
  afterFrame?: string;
  /** String prepended before each line. */
  beforeLine?: string;
  /** String appended after each line. */
  afterLine?: string;
  /** If true, omit the trailing newline on the last line. */
  noLastNewLine?: boolean;
}

/** An object that can provide frames for the Updater. */
export interface UpdaterTarget {
  /** Current state string. */
  state?: string;
  /** Returns the current frame content.
   * @returns Frame content (Box, string, or string array).
   */
  getFrame(...args: unknown[]): StringsInput;
}

/** Manages auto-refreshing console output for spinners, progress bars, etc. */
export class Updater {
  /** The updater function or target object. */
  updater: ((state: string, ...args: unknown[]) => StringsInput) | UpdaterTarget;
  /** The Writer instance used for output. */
  writer: Writer;
  /** String written before the first frame. */
  prologue: string;
  /** String written after the final frame. */
  epilogue: string;
  /** String written before each frame. */
  beforeFrame: string;
  /** String written after each frame. */
  afterFrame: string;
  /** String prepended before each line. */
  beforeLine: string;
  /** String appended after each line. */
  afterLine: string;
  /** If true, omit the trailing newline on the last line. */
  noLastNewLine: boolean | undefined;
  /** Height of the last written frame in rows. */
  lastHeight: number;
  /** Whether the updater has been finalized. */
  isDone: boolean;
  /** Whether this is the first frame. */
  first: boolean;
  /** Handle for the auto-refresh interval, or null. */
  intervalHandle: ReturnType<typeof setInterval> | null;

  /**
   * @param updater - A function or UpdaterTarget that provides frames.
   * @param options - Updater options.
   * @param writer - Writer instance (default: new Writer).
   */
  constructor(
    updater: ((state: string, ...args: unknown[]) => StringsInput) | UpdaterTarget,
    options?: UpdaterOptions,
    writer?: Writer
  );

  /** Whether auto-refreshing is active. */
  readonly isRefreshing: boolean;

  /** Starts auto-refreshing at the given interval.
   * @param ms - Refresh interval in milliseconds (default: 100).
   * @returns This Updater.
   */
  startRefreshing(ms?: number): this;
  /** Stops auto-refreshing.
   * @returns This Updater.
   */
  stopRefreshing(): this;
  /** Resets the updater state.
   * @returns This Updater.
   */
  reset(): this;

  /** Gets the current frame from the updater.
   * @param state - State string.
   * @returns Frame content.
   */
  getFrame(state: string, ...args: unknown[]): StringsInput;
  /** Writes a frame to the stream.
   * @param state - State string.
   * @returns A promise that resolves when the frame is written.
   */
  writeFrame(state: string, ...args: unknown[]): Promise<void>;
  /** Finishes updating: writes the epilogue and stops refreshing.
   * @returns A promise that resolves when done.
   */
  done(): Promise<void>;
  /** Updates with a new state and writes the frame.
   * @param state - State string.
   * @returns A promise that resolves when the update is written.
   */
  update(state?: string, ...args: unknown[]): Promise<void>;
  /** Writes the final frame with state 'finished' and calls `done()`.
   * @returns A promise that resolves when done.
   */
  final(...args: unknown[]): Promise<void>;
}

export default Updater;
