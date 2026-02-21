import Box from '../box.js';

export interface SkipRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DrawOptions {
  skip?: SkipRect[];
  symbol?: string;
}

export function draw(lineTheme: Record<string, any>, hAxis: (string | number)[], vAxis: (string | number)[], options?: DrawOptions): Box;

export default draw;
