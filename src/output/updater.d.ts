import Writer from './writer.js';

export interface UpdaterOptions {
  prologue?: string;
  epilogue?: string;
  beforeFrame?: string;
  afterFrame?: string;
  beforeLine?: string;
  afterLine?: string;
  noLastNewLine?: boolean;
}

export interface UpdaterTarget {
  state?: string;
  getFrame(...args: any[]): any;
}

/** Manages auto-refreshing console output for spinners, progress bars, etc. */
export class Updater {
  updater: ((state: string, ...args: any[]) => any) | UpdaterTarget;
  writer: Writer;
  prologue: string;
  epilogue: string;
  beforeFrame: string;
  afterFrame: string;
  beforeLine: string;
  afterLine: string;
  noLastNewLine: boolean | undefined;
  lastHeight: number;
  isDone: boolean;
  first: boolean;
  intervalHandle: ReturnType<typeof setInterval> | null;

  constructor(
    updater: ((state: string, ...args: any[]) => any) | UpdaterTarget,
    options?: UpdaterOptions,
    writer?: Writer
  );

  readonly isRefreshing: boolean;

  /** Starts auto-refreshing at the given interval. */
  startRefreshing(ms?: number): this;
  /** Stops auto-refreshing. */
  stopRefreshing(): this;
  reset(): this;

  getFrame(state: string, ...args: any[]): any;
  writeFrame(state: string, ...args: any[]): Promise<void>;
  /** Marks the updater as done and writes the final frame. */
  done(): Promise<void>;
  update(state?: string, ...args: any[]): Promise<void>;
  final(...args: any[]): Promise<void>;
}

export default Updater;
