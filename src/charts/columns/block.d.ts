import { ChartDatum } from '../utils.js';
import { StackedColumnChartOptions } from './draw-stacked.js';

export interface BlockColumnOptions extends StackedColumnChartOptions {
  blockTheme?: Record<string, any>;
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
  t?: number;
  b?: number;
  l?: number;
  r?: number;
}

/** Draws a single stacked column using block-drawing characters. */
export function drawColumn(data: ChartDatum[], width: number, maxValue: number, options?: BlockColumnOptions): string[];

export function drawChart(values: any[], width: number, options?: BlockColumnOptions): string[];

export default drawChart;
