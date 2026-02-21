import {GroupedChartOptions} from './draw-grouped.js';

/** Draws a complete fractional block grouped bar chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: any[], width: number, options?: GroupedChartOptions): string[];

export default drawChart;
