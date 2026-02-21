import {ChartDatum, ChartTheme} from '../utils.js';

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
  initState?: any;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
  /** Additional custom options. */
  [key: string]: any;
}

/** Function that draws a single column of a chart. */
type DrawColumnFn = (data: ChartDatum[], width: number, maxValue: number, options?: any) => string[];

/** Creates a stacked column chart drawing function from a column-drawing function.
 * @param drawColumn - The column-drawing function.
 * @returns A chart-drawing function.
 */
export function drawChart(
  drawColumn: DrawColumnFn
): (values: any[], width: number, options?: StackedColumnChartOptions) => string[];

export default drawChart;
