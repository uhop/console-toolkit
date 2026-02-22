import {ChartDatum, ChartDataInput} from '../utils.js';
import {SgrState} from '../../ansi/sgr-state.js';
import {GroupedColumnChartOptions} from './draw-grouped.js';

/** Options for fractional grouped column charts. */
export interface FracGroupedColumnOptions extends GroupedColumnChartOptions {
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: SgrState | string | null;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
}

/** Draws a single grouped column using fractional height block characters.
 * @param data - Chart data items.
 * @param width - Available width.
 * @param maxValue - Maximum value.
 * @param options - Options.
 * @returns Array of strings for the column.
 */
export function drawColumn(
  data: ChartDatum[],
  width: number,
  maxValue: number,
  options?: FracGroupedColumnOptions
): string[];

/** Draws a complete fractional grouped column chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: ChartDataInput, width: number, options?: FracGroupedColumnOptions): string[];

export default drawChart;
