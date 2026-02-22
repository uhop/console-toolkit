import {SgrState} from '../ansi/sgr-state.js';

/** Converts a foreground color state to a background color state.
 * @param state - The SGR state with foreground color.
 * @returns An object with the background property.
 */
export function makeBgFromFg(state: SgrState): {background: string | string[] | null};
/** Converts a background color state to a foreground color state.
 * @param state - The SGR state with background color.
 * @returns An object with the foreground property.
 */
export function makeFgFromBg(state: SgrState): {foreground: string | string[] | null};

/** Sums the values in a data series.
 * @param series - Array of data items with optional `value` properties.
 * @returns The sum of all values.
 */
export function sumValues(series: {value?: number}[]): number;

/** A single data point in a chart. */
export interface ChartDatum {
  /** The numeric value. */
  value: number;
  /** SGR state for the color fill. */
  colorState?: SgrState;
  /** Character used for the bar/column fill. */
  symbol?: string;
  /** SGR state for the item. */
  state?: SgrState;
  /** Text label for the item. */
  label?: string;
  /** Additional custom properties. */
  [key: string]: unknown;
}

/** Input type for chart data: each series can be a number, a ChartDatum, or an array of either. */
export type ChartDataInput = (number | ChartDatum | (number | ChartDatum)[])[];

/** Context object passed to custom `drawItem` callbacks. */
export interface DrawItemInfo {
  /** Index of the current datum within the series. */
  index: number;
  /** The full data series. */
  data: ChartDatum[];
  /** Allocated sizes per datum. */
  sizes: number[];
  /** Maximum value for scaling. */
  maxValue: number;
  /** Available width in characters. */
  width: number;
}

/** A chart theme: an array of ChartDatum defaults with an optional `empty` style. */
export type ChartTheme = ChartDatum[] & {empty?: {symbol?: string; state?: SgrState | null; colorState?: SgrState}};

/** Normalizes chart data, merging with default and custom themes.
 * @param data - Raw chart data (numbers, ChartDatum objects, or arrays thereof).
 * @param theme - Default theme to merge with.
 * @returns Normalized 2D array of ChartDatum.
 */
export function normalizeData(
  data: (number | ChartDatum | (number | ChartDatum)[])[],
  theme: ChartDatum[]
): ChartDatum[][];

/** Allocates pixel/character sizes to data values proportionally.
 * @param data - Array of chart data items.
 * @param maxValue - Maximum value for scaling.
 * @param size - Total available size in characters.
 * @returns Array of allocated sizes.
 */
export function allocateSizes(data: ChartDatum[], maxValue: number, size: number): number[];

/** Calculates the integer size needed for a fractional value.
 * @param value - The fractional value.
 * @param drawEmptyBorder - If true, add space for an empty border.
 * @returns The integer size.
 */
export function getFracSize(value: number, drawEmptyBorder?: boolean): number;
