import {drawRow} from './plain.js';
import drawGroupedChart from './draw-grouped.js';

/** Draws a complete plain grouped bar chart.
 * @param {any[]} values - Chart data.
 * @param {number} width - Available width.
 * @param {object} [options] - Options.
 * @returns {string[]} Array of strings representing the chart.
 */
export const drawChart = drawGroupedChart(drawRow);

export default drawChart;
