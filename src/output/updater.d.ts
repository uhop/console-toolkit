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

  startRefreshing(ms?: number): this;
  stopRefreshing(): this;
  reset(): this;

  getFrame(state: string, ...args: any[]): any;
  writeFrame(state: string, ...args: any[]): Promise<void>;
  done(): Promise<void>;
  update(state?: string, ...args: any[]): Promise<void>;
  final(...args: any[]): Promise<void>;
}

export default Updater;
