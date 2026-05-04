import {drawColumn} from './plain.js';
import drawGroupedChart from './draw-grouped.js';

export const drawChart = drawGroupedChart(drawColumn);

export default drawChart;
