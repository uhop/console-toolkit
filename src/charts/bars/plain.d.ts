import {ChartDatum} from '../utils.js';
import {StackedChartOptions} from './draw-stacked.js';

/** Options for plain bar charts. */
export interface PlainBarOptions extends StackedChartOptions {
  /** Custom draw function for a single bar item.
   * @param datum - The chart data item or null.
   * @param size - Allocated size in characters.
   * @param info - Drawing info.
   * @param options - Options.
   * @returns The drawn string.
   */
  drawItem?: (datum: ChartDatum | null, size: number, info: any, options: any) => string;
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: any;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
}

/** Default draw function for a single bar item.
 * @param datum - The chart data item.
 * @param size - Allocated size.
 * @param info - Drawing info.
 * @param options - Options.
 * @returns The drawn string.
 */
export function defaultDrawItem(datum: ChartDatum | null, size: number, info: any, options: any): string;

/** Options for `drawItemLabel()`. */
export interface DrawItemLabelOptions {
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
  /** If true, truncate the label to fit. */
  truncate?: boolean;
  /** If true, use ellipsis when truncating. */
  useEllipsis?: boolean;
  /** Initial SGR state. */
  initState?: any;
}

/** Draws a bar item with a text label.
 * @param datum - The chart data item.
 * @param size - Allocated size.
 * @param info - Drawing info.
 * @param options - Label options.
 * @returns The drawn string.
 */
export function drawItemLabel(datum: ChartDatum | null, size: number, info: any, options: DrawItemLabelOptions): string;

/** Draws a single stacked bar row.
 * @param data - Array of chart data items.
 * @param width - Available width.
 * @param maxValue - Maximum value for scaling.
 * @param options - Bar options.
 * @returns The drawn row as a string or string array.
 */
export function drawRow(
  data: ChartDatum[],
  width: number,
  maxValue: number,
  options?: PlainBarOptions
): string | string[];

/** Draws a complete plain stacked bar chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Bar options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: any[], width: number, options?: PlainBarOptions): string[];

export default drawChart;
