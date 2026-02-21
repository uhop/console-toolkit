import { ChartDatum } from '../utils.js';
import { StackedChartOptions } from './draw-stacked.js';

export interface BlockFracBarOptions extends StackedChartOptions {
  rectSize?: number;
  initState?: any;
  reverse?: boolean;
  drawEmptyBorder?: boolean;
}

export function drawRow(data: ChartDatum[], width: number, maxValue: number, options?: BlockFracBarOptions): string[];

export function drawChart(values: any[], width: number, options?: BlockFracBarOptions): string[];

export default drawChart;
