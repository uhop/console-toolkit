import {ChartDatum, ChartDataInput, ChartTheme} from '../utils.js';
import {SgrState} from '../../ansi/sgr-state.js';

/** Options for stacked column charts. */
export interface StackedColumnChartOptions {
  /** Maximum value for scaling (default: auto). */
  maxValue?: number;
  /** Gap between columns in characters. */
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

/** Function that draws a single column of a chart.
 * @param data - Array of chart data items.
 * @param width - Available width in characters.
 * @param maxValue - Maximum value for scaling.
 * @param options - Optional chart options.
 * @returns Array of strings for the column.
 */
type DrawColumnFn = (
  data: ChartDatum[],
  width: number,
  maxValue: number,
  options?: StackedColumnChartOptions
) => string[];

/** Creates a stacked column chart drawing function from a column-drawing function.
 * @param drawColumn - The column-drawing function.
 * @returns A chart-drawing function.
 */
export function drawChart(
  drawColumn: DrawColumnFn
): (values: ChartDataInput, width: number, options?: StackedColumnChartOptions) => string[];

export default drawChart;
