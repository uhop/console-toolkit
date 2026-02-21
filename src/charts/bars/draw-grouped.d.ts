import {ChartDatum, ChartTheme} from '../utils.js';

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
  initState?: any;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
  /** Additional custom options. */
  [key: string]: any;
}

/** Function that draws a single row of a chart. */
type DrawRowFn = (data: ChartDatum[], width: number, maxValue: number, options?: any) => string | string[];

/** Creates a grouped bar chart drawing function from a row-drawing function.
 * @param drawRow - The row-drawing function.
 * @returns A chart-drawing function.
 */
export function drawChart(
  drawRow: DrawRowFn
): (values: any[], width: number, options?: GroupedChartOptions) => string[];

export default drawChart;
