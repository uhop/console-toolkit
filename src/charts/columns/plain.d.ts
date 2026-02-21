import { ChartDatum } from '../utils.js';
import { StackedColumnChartOptions } from './draw-stacked.js';

export interface PlainColumnOptions extends StackedColumnChartOptions {
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
}

export function drawColumn(data: ChartDatum[], width: number, maxValue: number, options?: PlainColumnOptions): string[];

export function drawChart(values: any[], width: number, options?: PlainColumnOptions): string[];

export default drawChart;
