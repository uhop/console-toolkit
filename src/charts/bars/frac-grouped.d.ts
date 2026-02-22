import {ChartDatum, ChartDataInput} from '../utils.js';
import {SgrState} from '../../ansi/sgr-state.js';
import {GroupedChartOptions} from './draw-grouped.js';

/** Options for fractional grouped bar charts. */
export interface FracGroupedBarOptions extends GroupedChartOptions {
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: SgrState | string | null;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
}

/** Draws a single grouped bar row using fractional width block characters.
 * @param data - Chart data items.
 * @param width - Available width.
 * @param maxValue - Maximum value.
 * @param options - Options.
 * @returns Array of strings for the row.
 */
export function drawRow(data: ChartDatum[], width: number, maxValue: number, options?: FracGroupedBarOptions): string[];

/** Draws a complete fractional grouped bar chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: ChartDataInput, width: number, options?: FracGroupedBarOptions): string[];

export default drawChart;
