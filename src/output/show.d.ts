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

export function log(s: any, options?: LogOptions): void;
export function out(s: any, options?: OutOptions): void;

export class Out {
  stream: Writable;
  colorDepth: number;

  constructor(stream: Writable);

  out(s: any, options?: { endOfLineCommand?: string; colorDepth?: number }): void;
}

export function debug(string: string): void;
