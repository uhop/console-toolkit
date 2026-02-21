import {ChartDatum} from '../utils.js';
import {StackedColumnChartOptions} from './draw-stacked.js';

/** Options for block column charts. */
export interface BlockColumnOptions extends StackedColumnChartOptions {
  /** Block theme for drawing. */
  blockTheme?: Record<string, any>;
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: any;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
  /** Top padding. */
  t?: number;
  /** Bottom padding. */
  b?: number;
  /** Left padding. */
  l?: number;
  /** Right padding. */
  r?: number;
}

/** Draws a single stacked column using block-drawing characters.
 * @param data - Chart data items.
 * @param width - Available width.
 * @param maxValue - Maximum value.
 * @param options - Options.
 * @returns Array of strings for the column.
 */
export function drawColumn(data: ChartDatum[], width: number, maxValue: number, options?: BlockColumnOptions): string[];

/** Draws a complete block stacked column chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: any[], width: number, options?: BlockColumnOptions): string[];

export default drawChart;
