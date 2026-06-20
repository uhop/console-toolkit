// @ts-self-types="./block-frac-grouped.d.ts"
import {drawRow} from './block-frac.js';
import drawGroupedChart from './draw-grouped.js';

export const drawChart = drawGroupedChart(drawRow);

export default drawChart;
