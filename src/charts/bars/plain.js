import style from '../../style.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import {vBlocks8th} from '../../symbols.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

const defaultSymbol = vBlocks8th[7];

export const defaultDrawItem = (datum, size, _, {initState = {}}) =>
  datum
    ? style
        .addState(initState)
        .addState(datum.state || datum.colorState)
        .text((datum.symbol || defaultSymbol).repeat(size))
    : '';

export const drawRow = (data, width, maxValue, options = {}) => {
  const {drawItem = defaultDrawItem, rectSize = 0, reverse} = options;
  const sizes = allocateSizes(data, maxValue, width),
    items = data.map((datum, index) => drawItem(datum, sizes[index], {index, data, sizes, maxValue, width}, options));
  if (reverse) items.reverse();
  const row = optimize(items.join(''));
  if (rectSize <= 1) return row;
  return new Array(rectSize).fill(row);
};

export const drawChart = drawStackedChart(drawRow);

export default drawChart;
