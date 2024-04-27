import style from '../../style.js';
import Box from '../../Box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import drawBlock from '../../draw-block.js';
import defaultBlockTheme from '../../themes/blocks/unicode-half.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawColumn = (data, width, maxValue, options = {}) => {
  const {reverse, blockTheme = defaultBlockTheme, rectSize = 0, initState = {}} = options,
    sizes = allocateSizes(data, maxValue, width),
    {t = reverse ? 0 : 1, b = reverse ? 1 : 0, l = 1, r = 1} = options;

  const blocks = data.map((datum, i) => {
      if (!datum) return Box.makeBlank(Math.max(2, rectSize), 0);
      const box = drawBlock(Math.max(0, rectSize - 2), sizes[i], blockTheme, {
          bottom: reverse ? (i + 1 < data.length ? 0 : b) : i ? 0 : b,
          top: reverse ? (i ? 0 : t) : i + 1 < data.length ? 0 : t,
          left: l,
          right: r
        }),
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
