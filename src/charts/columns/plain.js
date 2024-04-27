import style from '../../style.js';
import Box from '../../Box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import {hBlocks8th} from '../../symbols.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

const defaultSymbol = hBlocks8th[7];

export const drawColumn = (data, width, maxValue, options = {}) => {
  const {reverse, rectSize = 1, initState = {}} = options,
    sizes = allocateSizes(data, maxValue, width),
    blocks = data.map((datum, i) => {
      if (!datum) return Box.makeBlank(rectSize, 0);
      const boxStyle = style.addState(initState).addState(datum.colorState).addState(datum.state);
      return new Box(new Array(sizes[i]).fill(boxStyle.text(datum.symbol || defaultSymbol)), true);
    }),
    result = (reverse ? blocks : blocks.reverse()).map(block => block.box).flat(1);
  return result.map(line => optimize(line));
};

export const drawChart = drawStackedChart(drawColumn);

export default drawChart;
