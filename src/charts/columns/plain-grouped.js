import {drawChart as drawBarChart} from '../bars/plain-grouped.js';
import {drawColumnChart} from './plain.js';

export const drawChart = drawColumnChart(drawBarChart);

export default drawChart;
