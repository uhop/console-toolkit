import {drawColumn} from './block-frac.js';
import drawGroupedChart from './draw-grouped.js';

/** Draws a complete fractional block grouped column chart.
 * @param {any[]} values - Chart data.
 * @param {number} width - Available height.
 * @param {object} [options] - Options.
 * @returns {string[]} Array of strings representing the chart.
 */
export const drawChart = drawGroupedChart(drawColumn);

export default drawChart;
