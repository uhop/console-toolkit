import { ChartDatum } from '../utils.js';
import { StackedChartOptions } from './draw-stacked.js';

export interface PlainBarOptions extends StackedChartOptions {
  drawItem?: (datum: ChartDatum | null, size: number, info: any, options: any) => string;
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
}

/** Default draw function for a single bar item. */
export function defaultDrawItem(datum: ChartDatum | null, size: number, info: any, options: any): string;

export interface DrawItemLabelOptions {
  reverse?: boolean;
  truncate?: boolean;
  useEllipsis?: boolean;
  initState?: any;
}

/** Draws a bar item with a text label. */
export function drawItemLabel(datum: ChartDatum | null, size: number, info: any, options: DrawItemLabelOptions): string;

/** Draws a single stacked bar row. */
export function drawRow(data: ChartDatum[], width: number, maxValue: number, options?: PlainBarOptions): string | string[];

export function drawChart(values: any[], width: number, options?: PlainBarOptions): string[];

export default drawChart;
