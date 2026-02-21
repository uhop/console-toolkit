import Box from '../box.js';

export class Bitmap {
  width: number;
  height: number;
  blockWidth: number;
  blockHeight: number;
  lineSize: number;
  lineCount: number;
  bitmap: number[];

  constructor(width: number, height: number, blockWidth?: number, blockHeight?: number);

  verifyPos(x: number, y: number): this;
  getWordIndex(x: number, y: number): number;
  getWordMask(x: number, y: number): number;

  getBit(x: number, y: number): number;
  setBit(x: number, y: number, value?: number): this;
  set: Bitmap['setBit'];

  clear(value?: boolean): this;

  toBox(one?: string, zero?: string): Box;
}

export default Bitmap;
