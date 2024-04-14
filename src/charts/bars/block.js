import style from '../../style.js';
import Box from '../../Box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {sumValues} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import drawBlock from '../../draw-block.js';
import defaultBlockTheme from '../../themes/blocks/unicode-half.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawRow = (
  data,
  width,
  maxValue,
  {t = 1, r = 1, b = 1, l = 0, blockTheme = defaultBlockTheme, rectSize = 0, zeroLimit = 0.5, initState = {}}
) => {
  const normalize = maxValue < 0;
  if (maxValue < 0) maxValue = sumValues(data);
  if (!maxValue) maxValue = 1;
  let total = 0;
  const blocks = data.map((datum, i) => {
    if (!datum) return Box.makeBlank(0, Math.max(2, rectSize));
    let value = (Math.max(0, datum.value) / maxValue) * width;
    if (value < 1) {
      if (value < zeroLimit) return Box.makeBlank(0, Math.max(2, rectSize)); // nothing to show
      value = 1;
    }
    let n = Math.floor(value);
    if (total + n > width) n = width - total;
    const isLast = i + 1 == data.length;
    if (isLast && normalize && total + n < width) n = width - total;
    total += n;
    const box = drawBlock(n, Math.max(0, rectSize - 2), blockTheme, {
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
