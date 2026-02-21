import {Writable} from 'node:stream';

export interface WriteOptions {
  sameColumn?: boolean | 'save';
  noLastNewLine?: boolean;
  beforeLine?: string;
  afterLine?: string;
}

/** Manages writing to a stream with cursor manipulation and color depth awareness. */
export class Writer {
  stream: Writable;
  forceColorDepth: number | undefined;

  constructor(stream?: Writable, forceColorDepth?: number);

  readonly isTTY: boolean;
  readonly columns: number;
  readonly rows: number;
  readonly size: {columns: number; rows: number};

  getColorDepth(...args: any[]): number;
  hasColors(...args: any[]): boolean;

  clearLine(dir: number): Promise<boolean>;
  clearScreenDown(): Promise<boolean>;

  cursorTo(x: number, y?: number): Promise<boolean>;
  moveCursor(dx: number, dy: number): Promise<boolean>;

  /** Writes a raw string to the stream. */
  writeString(s: string): Promise<void>;
  /** Writes a Box/string to the stream with optional cursor control. */
  write(s: any, options?: WriteOptions): Promise<void>;
}

export default Writer;
