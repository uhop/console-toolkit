import {ChartDatum} from '../utils.js';
import {StackedColumnChartOptions} from './draw-stacked.js';

/** Options for plain column charts. */
export interface PlainColumnOptions extends StackedColumnChartOptions {
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: any;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
}

/** Draws a single stacked column using plain symbols.
 * @param data - Chart data items.
 * @param width - Available width.
 * @param maxValue - Maximum value.
 * @param options - Options.
 * @returns Array of strings for the column.
 */
export function drawColumn(data: ChartDatum[], width: number, maxValue: number, options?: PlainColumnOptions): string[];

/** Draws a complete plain stacked column chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: any[], width: number, options?: PlainColumnOptions): string[];

export default drawChart;
