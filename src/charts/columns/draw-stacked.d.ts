import { ChartDatum, ChartTheme } from '../utils.js';

export interface StackedColumnChartOptions {
  maxValue?: number;
  gap?: number;
  theme?: ChartTheme;
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
  [key: string]: any;
}

type DrawColumnFn = (data: ChartDatum[], width: number, maxValue: number, options?: any) => string[];

export function drawChart(drawColumn: DrawColumnFn): (values: any[], width: number, options?: StackedColumnChartOptions) => string[];

export default drawChart;
