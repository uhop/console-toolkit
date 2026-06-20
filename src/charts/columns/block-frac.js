// @ts-self-types="./block-frac.d.ts"
import style from '../../style.js';
import Box from '../../box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes, getFracSize} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import {drawRealWidthBlock} from '../../draw-block-frac.js';
import defaultTheme from '../themes/default.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawColumn = (data, width, maxValue, options = {}) => {
  const {reverse, drawEmptyBorder, initState, theme = defaultTheme} = options,
    rectSize = Math.max(0, options.rectSize ?? 0.5),
    {symbol = ' ', state = null, colorState} = theme?.empty || {},
    emptyWidth = getFracSize(rectSize, drawEmptyBorder),
    sizes = allocateSizes(data, maxValue, width),
    blocks = data.map((datum, i) => {
      if (!datum) return Box.makeBlank(emptyWidth, 0);
      const box = drawRealWidthBlock(rectSize, sizes[i], drawEmptyBorder),
        boxStyle = style.addState(initState).addState(datum.colorState).addState(datum.state);
      return new Box(
        box.box.map(line => boxStyle.text(line)),
        true
      );
    });
  if (sizes[sizes.length - 1] > 0) {
    blocks.push(
      new Box(
        new Array(sizes[sizes.length - 1]).fill(
          style.addState(initState).addState(colorState).addState(state).text(symbol.repeat(emptyWidth))
        ),
        true
      )
    );
  }
  const result = (reverse ? blocks : blocks.reverse()).map(block => block.box).flat(1);
  return result.map(line => optimize(line));
};

export const drawChart = drawStackedChart(drawColumn);

export default drawChart;
