import style from '../../style.js';
import Box from '../../Box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes, sumValues} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import drawBlock from '../../draw-block.js';
import defaultBlockTheme from '../../themes/blocks/unicode-half.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawRow = (
  data,
  width,
  maxValue,
  {t = 1, r = 1, b = 1, l = 0, blockTheme = defaultBlockTheme, rectSize = 0, initState = {}}
) => {
  const sizes = allocateSizes(data, maxValue, width),
    blocks = data.map((datum, i) => {
      if (!datum) return Box.makeBlank(0, Math.max(2, rectSize));
      const box = drawBlock(sizes[i], Math.max(0, rectSize - 2), blockTheme, {
          left: i ? 0 : l,
          right: i + 1 < data.length ? 0 : r,
          top: t,
          bottom: b
        }),
        boxStyle = style.addState(initState).addState(datum.colorState);
      return new Box(
        box.box.map(line => boxStyle.text(line)),
        true
      );
    });
  const result = new Array(blocks[0].box.length).fill('');
  for (const block of blocks) {
    for (let i = 0; i < block.box.length; ++i) {
      result[i] += block.box[i];
    }
  }
  return result.map(line => optimize(line));
};

export const drawChart = drawStackedChart(drawRow);

export default drawChart;
