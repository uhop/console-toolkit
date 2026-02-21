import { SgrState } from '../ansi/sgr-state.js';

export function makeBgFromFg(state: SgrState): { background: any };
export function makeFgFromBg(state: SgrState): { foreground: any };

export function sumValues(series: { value?: number }[]): number;

export interface ChartDatum {
  value: number;
  colorState?: SgrState;
  symbol?: string;
  state?: SgrState;
  label?: string;
  [key: string]: any;
}

export type ChartTheme = ChartDatum[] & { empty?: { symbol?: string; state?: SgrState | null; colorState?: SgrState } };

export function normalizeData(data: (number | ChartDatum | (number | ChartDatum)[])[], theme: ChartDatum[]): ChartDatum[][];

export function allocateSizes(data: ChartDatum[], maxValue: number, size: number): number[];

export function getFracSize(value: number, drawEmptyBorder?: boolean): number;
