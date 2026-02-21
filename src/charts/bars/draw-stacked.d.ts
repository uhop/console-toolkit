import { ChartDatum, ChartTheme } from '../utils.js';

export interface StackedChartOptions {
  maxValue?: number;
  gap?: number;
  theme?: ChartTheme;
  drawItem?: (datum: ChartDatum | null, size: number, info: any, options: any) => string;
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
  [key: string]: any;
}

type DrawRowFn = (data: ChartDatum[], width: number, maxValue: number, options?: any) => string | string[];

export function drawChart(drawRow: DrawRowFn): (values: any[], width: number, options?: StackedChartOptions) => string[];

export default drawChart;
