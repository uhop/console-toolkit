// @ts-self-types="./plain-grouped.d.ts"
import {drawRow} from './plain.js';
import drawGroupedChart from './draw-grouped.js';

export const drawChart = drawGroupedChart(drawRow);

export default drawChart;
