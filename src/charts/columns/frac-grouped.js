import style from '../../style.js';
import Box from '../../box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {drawRealHeightBlock} from '../../draw-block-frac.js';
import drawGroupedChart from './draw-grouped.js';
import defaultTheme from '../themes/default.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawColumn = (data, width, maxValue, options = {}) => {
  if (!maxValue) maxValue = 1;
  const {reverse, rectSize = 1, initState = {}, theme = defaultTheme} = options,
    {symbol = ' ', state = null, colorState} = theme?.empty || {},
    emptyLine = style.addState(initState).addState(colorState).addState(state).text(symbol.repeat(rectSize)),
    blocks = data.map(datum => {
      if (!datum) return Box.makeBlank(rectSize, 0);
      if (!datum.value) return new Box(new Array(width).fill(emptyLine), true);
      const box = drawRealHeightBlock(rectSize, (datum.value / maxValue) * width),
        boxStyle = style.addState(initState).addState(datum.colorState).addState(datum.state);
      return new Box(
        box.box.map(line => boxStyle.text(line)),
        true
      );
    }),
    result = (reverse ? blocks : blocks.reverse()).map(block => block.box).flat(1);
  return result.map(line => optimize(line));
};

export const drawChart = drawGroupedChart(drawColumn);

export default drawChart;
