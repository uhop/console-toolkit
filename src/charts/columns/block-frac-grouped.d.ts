import {ChartDataInput} from '../utils.js';
import {GroupedColumnChartOptions} from './draw-grouped.js';

/** Draws a complete fractional block grouped column chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: ChartDataInput, width: number, options?: GroupedColumnChartOptions): string[];

export default drawChart;
