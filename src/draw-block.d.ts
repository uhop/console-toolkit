import Box from './box.js';

export interface DrawBlockOptions {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  vTheme?: number;
  hTheme?: number;
  theme?: number;
  symbol?: string;
}

export function drawBlock(width: number, height: number, blockTheme: Record<string, any>, options?: DrawBlockOptions): Box;
export function drawFrame(width: number, height: number, blockTheme: Record<string, any>, options?: DrawBlockOptions): Box;

export default drawBlock;
