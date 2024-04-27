import style from '../../style.js';
import Box from '../../Box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {drawRealWidthBlock} from '../../draw-block-frac.js';
import drawGroupedChart from './draw-grouped.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawRow = (data, width, maxValue, options = {}) => {
  const {reverse, rectSize = 1, initState = {}} = options,
    blocks = data.map(datum => {
      if (!datum) return '';
      const box = drawRealWidthBlock((datum.value / maxValue) * width, rectSize),
        boxStyle = style.addState(initState).addState(datum.colorState);
      return new Box(
        box.box.map(line => boxStyle.text(line)),
        true
      );
    }),
    result = new Array(blocks[0].box.length).fill('');
  if (reverse) blocks.reverse();
  for (const block of blocks) {
    for (let i = 0; i < block.box.length; ++i) {
      result[i] += block.box[i];
    }
  }
  return result.map(line => optimize(line));
};

export const drawChart = drawGroupedChart(drawRow);

export default drawChart;
