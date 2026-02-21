import {ChartDatum} from '../utils.js';
import {StackedColumnChartOptions} from './draw-stacked.js';

/** Options for fractional block column charts. */
export interface BlockFracColumnOptions extends StackedColumnChartOptions {
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: any;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
  /** If true, draw an empty border when fractional part is 0. */
  drawEmptyBorder?: boolean;
}

/** Draws a single stacked column using fractional block characters.
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
  options?: BlockFracColumnOptions
): string[];

/** Draws a complete fractional block stacked column chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: any[], width: number, options?: BlockFracColumnOptions): string[];

export default drawChart;
