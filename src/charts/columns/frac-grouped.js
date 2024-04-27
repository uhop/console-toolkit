import style from '../../style.js';
import Box from '../../Box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {drawRealHeightBlock} from '../../draw-block-frac.js';
import drawGroupedChart from './draw-grouped.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawColumn = (data, width, maxValue, options = {}) => {
  const {reverse, rectSize = 1, initState = {}} = options,
    blocks = data.map(datum => {
      if (!datum) return Box.makeBlank(rectSize, 0);
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
