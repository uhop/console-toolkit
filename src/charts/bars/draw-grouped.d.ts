import {ChartDatum, ChartDataInput, ChartTheme} from '../utils.js';
import {SgrState} from '../../ansi/sgr-state.js';

/** Options for grouped bar/column charts. */
export interface GroupedChartOptions {
  /** Maximum value for scaling (default: auto). */
  maxValue?: number;
  /** Gap between groups in lines. */
  groupGap?: number;
  /** Gap between items within a group. */
  gap?: number;
  /** Chart theme. */
  theme?: ChartTheme;
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
type DrawRowFn = (
  data: ChartDatum[],
  width: number,
  maxValue: number,
  options?: GroupedChartOptions
) => string | string[];

/** Creates a grouped bar chart drawing function from a row-drawing function.
 * @param drawRow - The row-drawing function.
 * @returns A chart-drawing function.
 */
export function drawChart(
  drawRow: DrawRowFn
): (values: ChartDataInput, width: number, options?: GroupedChartOptions) => string[];

export default drawChart;
