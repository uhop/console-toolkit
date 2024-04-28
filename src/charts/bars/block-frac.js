import style from '../../style.js';
import Box from '../../box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes, getFracSize} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import {drawRealHeightBlock} from '../../draw-block-frac.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawRow = (data, width, maxValue, options = {}) => {
  const {reverse, drawEmptyBorder, initState = {}} = options,
    rectSize = Math.max(0, options.rectSize ?? 0.5),
    sizes = allocateSizes(data, maxValue, width),
    blocks = data.map((datum, i) => {
      if (!datum) return Box.makeBlank(0, getFracSize(rectSize, drawEmptyBorder));
      const box = drawRealHeightBlock(sizes[i], rectSize, drawEmptyBorder),
        boxStyle = style.addState(initState).addState(datum.colorState).addState(datum.state);
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

export const drawChart = drawStackedChart(drawRow);

export default drawChart;
