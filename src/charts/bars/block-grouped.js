import {drawRow} from './block.js';
import drawGroupedChart from './draw-grouped.js';

export const drawChart = drawGroupedChart(drawRow);

export default drawChart;
