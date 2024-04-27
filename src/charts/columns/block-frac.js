import style from '../../style.js';
import Box from '../../Box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes, getFracSize} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import {drawRealWidthBlock} from '../../draw-block-frac.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawColumn = (data, width, maxValue, options = {}) => {
  const {reverse, drawEmptyBorder, initState} = options,
    rectSize = Math.max(0, options.rectSize ?? 0.5),
    sizes = allocateSizes(data, maxValue, width),
    blocks = data.map((datum, i) => {
      if (!datum) return Box.makeBlank(getFracSize(rectSize, drawEmptyBorder), 0);
      const box = drawRealWidthBlock(rectSize, sizes[i], drawEmptyBorder),
        boxStyle = style.addState(initState).addState(datum.colorState);
      return new Box(
        box.box.map(line => boxStyle.text(line)),
        true
      );
    }),
    result = (reverse ? blocks : blocks.reverse()).map(block => block.box).flat(1);
  return result.map(line => optimize(line));
};

export const drawChart = drawStackedChart(drawColumn);

export default drawChart;
