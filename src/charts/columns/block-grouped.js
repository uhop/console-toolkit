// @ts-self-types="./block-grouped.d.ts"
import {drawColumn} from './block.js';
import drawGroupedChart from './draw-grouped.js';

export const drawChart = drawGroupedChart(drawColumn);

export default drawChart;
