import { SgrState } from '../ansi/sgr-state.js';

/** Converts a foreground color state to a background color state. */
export function makeBgFromFg(state: SgrState): { background: any };
/** Converts a background color state to a foreground color state. */
export function makeFgFromBg(state: SgrState): { foreground: any };

/** Sums the values in a data series. */
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

/** Normalizes chart data, merging with default and custom themes. */
export function normalizeData(data: (number | ChartDatum | (number | ChartDatum)[])[], theme: ChartDatum[]): ChartDatum[][];

/** Allocates pixel/character sizes to data values proportionally. */
export function allocateSizes(data: ChartDatum[], maxValue: number, size: number): number[];

/** Calculates the integer size needed for a fractional value. */
export function getFracSize(value: number, drawEmptyBorder?: boolean): number;
