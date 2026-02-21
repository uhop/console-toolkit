import { Writable } from 'node:stream';

export interface WriteOptions {
  sameColumn?: boolean | 'save';
  noLastNewLine?: boolean;
  beforeLine?: string;
  afterLine?: string;
}

export class Writer {
  stream: Writable;
  forceColorDepth: number | undefined;

  constructor(stream?: Writable, forceColorDepth?: number);

  readonly isTTY: boolean;
  readonly columns: number;
  readonly rows: number;
  readonly size: { columns: number; rows: number };

  getColorDepth(...args: any[]): number;
  hasColors(...args: any[]): boolean;

  clearLine(dir: number): Promise<boolean>;
  clearScreenDown(): Promise<boolean>;

  cursorTo(x: number, y?: number): Promise<boolean>;
  moveCursor(dx: number, dy: number): Promise<boolean>;

  writeString(s: string): Promise<void>;
  write(s: any, options?: WriteOptions): Promise<void>;
}

export default Writer;
