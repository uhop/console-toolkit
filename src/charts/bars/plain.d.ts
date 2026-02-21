import { ChartDatum } from '../utils.js';
import { StackedChartOptions } from './draw-stacked.js';

export interface PlainBarOptions extends StackedChartOptions {
  drawItem?: (datum: ChartDatum | null, size: number, info: any, options: any) => string;
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
}

export function defaultDrawItem(datum: ChartDatum | null, size: number, info: any, options: any): string;

export interface DrawItemLabelOptions {
  reverse?: boolean;
  truncate?: boolean;
  useEllipsis?: boolean;
  initState?: any;
}

export function drawItemLabel(datum: ChartDatum | null, size: number, info: any, options: DrawItemLabelOptions): string;

export function drawRow(data: ChartDatum[], width: number, maxValue: number, options?: PlainBarOptions): string | string[];

export function drawChart(values: any[], width: number, options?: PlainBarOptions): string[];

export default drawChart;
