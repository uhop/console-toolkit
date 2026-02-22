import {ChartDatum, ChartDataInput, ChartTheme, DrawItemInfo} from '../utils.js';
import {SgrState} from '../../ansi/sgr-state.js';

/** Options for stacked bar/column charts. */
export interface StackedChartOptions {
  /** Maximum value for scaling (default: auto). */
  maxValue?: number;
  /** Gap between rows in lines. */
  gap?: number;
  /** Chart theme. */
  theme?: ChartTheme;
  /** Custom draw function for individual items.
   * @param datum - The chart data item or null.
   * @param size - Allocated size in characters.
   * @param info - Drawing info.
   * @param options - Options.
   * @returns The drawn string.
   */
  drawItem?: (datum: ChartDatum | null, size: number, info: DrawItemInfo, options: StackedChartOptions) => string;
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: SgrState | string | null;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
  /** Additional custom options. */
  [key: string]: unknown;
}

/** Function that draws a single row of a chart.
 * @param data - Array of chart data items.
 * @param width - Available width in characters.
 * @param maxValue - Maximum value for scaling.
 * @param options - Optional chart options.
 * @returns The drawn row as a string or string array.
 */
type DrawRowFn = (data: ChartDatum[], width: number, maxValue: number, options?: StackedChartOptions) => string | string[];

/** Creates a stacked bar chart drawing function from a row-drawing function.
 * @param drawRow - The row-drawing function.
 * @returns A chart-drawing function.
 */
export function drawChart(
  drawRow: DrawRowFn
): (values: ChartDataInput, width: number, options?: StackedChartOptions) => string[];

export default drawChart;
