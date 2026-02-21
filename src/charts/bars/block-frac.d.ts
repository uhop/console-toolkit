import {ChartDatum} from '../utils.js';
import {StackedChartOptions} from './draw-stacked.js';

/** Options for fractional block bar charts. */
export interface BlockFracBarOptions extends StackedChartOptions {
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: any;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
  /** If true, draw an empty border when fractional part is 0. */
  drawEmptyBorder?: boolean;
}

/** Draws a single stacked bar row using fractional block characters.
 * @param data - Chart data items.
 * @param width - Available width.
 * @param maxValue - Maximum value.
 * @param options - Options.
 * @returns Array of strings for the row.
 */
export function drawRow(data: ChartDatum[], width: number, maxValue: number, options?: BlockFracBarOptions): string[];

/** Draws a complete fractional block stacked bar chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: any[], width: number, options?: BlockFracBarOptions): string[];

export default drawChart;
