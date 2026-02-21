import {ChartDatum} from '../utils.js';
import {StackedColumnChartOptions} from './draw-stacked.js';

export interface BlockFracColumnOptions extends StackedColumnChartOptions {
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
  drawEmptyBorder?: boolean;
}

/** Draws a single stacked column using fractional block characters. */
export function drawColumn(
  data: ChartDatum[],
  width: number,
  maxValue: number,
  options?: BlockFracColumnOptions
): string[];

export function drawChart(values: any[], width: number, options?: BlockFracColumnOptions): string[];

export default drawChart;
