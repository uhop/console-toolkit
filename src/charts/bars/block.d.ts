import { ChartDatum } from '../utils.js';
import { StackedChartOptions } from './draw-stacked.js';

export interface BlockBarOptions extends StackedChartOptions {
  blockTheme?: Record<string, any>;
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
  t?: number;
  b?: number;
  l?: number;
  r?: number;
}

export function drawRow(data: ChartDatum[], width: number, maxValue: number, options?: BlockBarOptions): string[];

export function drawChart(values: any[], width: number, options?: BlockBarOptions): string[];

export default drawChart;
