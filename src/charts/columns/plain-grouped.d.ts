import {GroupedColumnChartOptions} from './draw-grouped.js';

/** Draws a complete plain grouped column chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: any[], width: number, options?: GroupedColumnChartOptions): string[];

export default drawChart;
