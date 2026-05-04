import style from '../../style.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes, makeBgFromFg} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import {vBlocks8th, ellipsis} from '../../symbols.js';
import defaultTheme from '../themes/default.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

const defaultSymbol = vBlocks8th[7];

export const defaultDrawItem = (datum, size, _, {initState = {}}) =>
  datum
    ? style
        .addState(initState)
        .addState(datum.colorState || {})
        .addState(datum.state || {})
        .text((datum.symbol || defaultSymbol).repeat(size))
    : '';

export const drawItemLabel = (datum, size, _, {reverse, truncate, useEllipsis = true, initState = {}}) => {
  if (!datum) return '';
  const symbol = datum.symbol || ' ';
  let label = datum.label || '';
  if (label.length <= size) {
    label = reverse ? label.padStart(size, symbol) : label.padEnd(size, symbol);
  } else if (truncate && (!useEllipsis || size > 1)) {
    label = useEllipsis ? label.substring(0, size - 1) + ellipsis : label.substring(0, size);
  } else {
    label = symbol.repeat(size);
  }
  return style
    .addState(initState)
    .addState(datum.colorState ? makeBgFromFg(datum.colorState) : {})
    .addState(datum.state || {})
    .text(label);
};

export const drawRow = (data, width, maxValue, options = {}) => {
  const {drawItem = defaultDrawItem, rectSize = 0, theme = defaultTheme, initState, reverse} = options,
    {symbol = ' ', state = null, colorState} = theme?.empty || {},
    sizes = allocateSizes(data, maxValue, width),
    items = data.map((datum, index) => drawItem(datum, sizes[index], {index, data, sizes, maxValue, width}, options));
  if (theme?.empty && sizes[sizes.length - 1] > 0) {
    // fill the row
    items.push(
      style
        .addState(initState)
        .addState(colorState)
        .addState(state)
        .text(symbol.repeat(sizes[sizes.length - 1]))
    );
  }
  if (reverse) items.reverse();
  const row = optimize(items.join(''));
  if (rectSize <= 1) return row;
  return new Array(rectSize).fill(row);
};

export const drawChart = drawStackedChart(drawRow);

export default drawChart;
