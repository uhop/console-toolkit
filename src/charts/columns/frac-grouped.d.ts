import { ChartDatum } from '../utils.js';
import { GroupedColumnChartOptions } from './draw-grouped.js';

export interface FracGroupedColumnOptions extends GroupedColumnChartOptions {
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
}

/** Draws a single grouped column using fractional height block characters. */
export function drawColumn(data: ChartDatum[], width: number, maxValue: number, options?: FracGroupedColumnOptions): string[];

export function drawChart(values: any[], width: number, options?: FracGroupedColumnOptions): string[];

export default drawChart;
