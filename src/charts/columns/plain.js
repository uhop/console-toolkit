import {drawChart as drawBarChart} from '../bars/plain.js';
import Panel from '../../Panel.js';

import {hBlocks8th} from '../../symbols.js';
import style from '../../style.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

const defaultSymbol = hBlocks8th[7];

export const defaultDrawItem = (datum, size, _, {initState = {}}) =>
  datum
    ? style
        .addState(initState)
        .addState(datum.colorState || {})
        .addState(datum.state || {})
        .text((datum.symbol || defaultSymbol).repeat(size))
    : '';

export const drawColumnChart = drawBarChart => (values, width, options) => {
  options = {drawItem: defaultDrawItem, ...options};
  const {theme, initState, reverse} = options,
    {symbol = ' ', state = null, colorState} = theme?.empty || {},
    emptyState = style.addState(initState).addState(colorState).addState(state).getState();

  options.reverse = false;
  const chart = drawBarChart(values, width, options);

  let panel = Panel.fromBox(chart);
  if (reverse) {
    panel = panel.flipV().rotateRight();
  } else {
    panel = panel.rotateLeft();
  }

  return panel.toBox(symbol, emptyState).box;
};

export const drawChart = drawColumnChart(drawBarChart);

export default drawChart;
