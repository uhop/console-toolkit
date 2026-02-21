import { ChartDatum, ChartTheme } from '../utils.js';

export interface GroupedColumnChartOptions {
  maxValue?: number;
  groupGap?: number;
  gap?: number;
  theme?: ChartTheme;
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
  [key: string]: any;
}

type DrawColumnFn = (data: ChartDatum[], width: number, maxValue: number, options?: any) => string[];

/** Creates a grouped column chart drawing function from a column-drawing function. */
export function drawChart(drawColumn: DrawColumnFn): (values: any[], width: number, options?: GroupedColumnChartOptions) => string[];

export default drawChart;
