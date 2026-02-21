import { ChartDatum } from '../utils.js';
import { GroupedChartOptions } from './draw-grouped.js';

export interface FracGroupedBarOptions extends GroupedChartOptions {
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
}

export function drawRow(data: ChartDatum[], width: number, maxValue: number, options?: FracGroupedBarOptions): string[];

export function drawChart(values: any[], width: number, options?: FracGroupedBarOptions): string[];

export default drawChart;
