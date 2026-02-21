import { ClipOptions } from './strings/clip.js';

export interface BoxMakeOptions {
  symbol?: string;
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

export interface AddBottomOptions {
  symbol?: string;
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

export interface AddRightOptions {
  symbol?: string;
  align?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c';
}

export class Box {
  box: string[];

  constructor(s: Box | string | string[] | any, normalized?: boolean);

  readonly width: number;
  readonly height: number;

  static make(s: any, options?: BoxMakeOptions): Box;
  static makeBlank(width: number, height: number, symbol?: string): Box;

  toStrings(): string[];
  toBox(): Box;
  clone(): Box;
  clip(width: number, options?: ClipOptions): Box;

  padLeftRight(left: number, right: number, symbol?: string): Box;
  padTopBottom(top: number, bottom: number, symbol?: string): Box;
  padRight(n: number, symbol?: string): Box;
  padLeft(n: number, symbol?: string): Box;
  padTop(n: number, symbol?: string): Box;
  padBottom(n: number, symbol?: string): Box;
  pad(t: number, r?: number | string, b?: number | string, l?: number | string, symbol?: string): Box;

  removeRows(y: number, n: number): Box;

  addBottom(box: any, options?: AddBottomOptions): Box;
  addRight(box: any, options?: AddRightOptions): Box;

  flipV(): Box;
}

export function toBox(s: any, options?: BoxMakeOptions): Box;

export default Box;
