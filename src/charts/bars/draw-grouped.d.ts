import { ChartDatum, ChartTheme } from '../utils.js';

export interface GroupedChartOptions {
  maxValue?: number;
  groupGap?: number;
  gap?: number;
  theme?: ChartTheme;
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
  [key: string]: any;
}

type DrawRowFn = (data: ChartDatum[], width: number, maxValue: number, options?: any) => string | string[];

/** Creates a grouped bar chart drawing function from a row-drawing function. */
export function drawChart(drawRow: DrawRowFn): (values: any[], width: number, options?: GroupedChartOptions) => string[];

export default drawChart;
