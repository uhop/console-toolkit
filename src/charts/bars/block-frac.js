import style from '../../style.js';
import Box from '../../Box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {sumValues} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import {drawRealHeightBlock} from '../../draw-block-frac.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

const getSize = (value, drawEmptyBorder) => {
  const intValue = Math.floor(value),
    hasFrac = value - intValue > 0,
    index = (value - intValue) * 8,
    drawBorder = hasFrac && (drawEmptyBorder || index > 0);

  return intValue + (drawBorder ? 1 : 0);
}

export const drawRow = (
  data,
  width,
  maxValue,
  {drawEmptyBorder, rectSize = 0.5, zeroLimit = 0.5, initState = {}}
) => {
  rectSize = Math.max(0, rectSize);

  const normalize = maxValue < 0;
  if (maxValue < 0) maxValue = sumValues(data);
  if (!maxValue) maxValue = 1;

  let total = 0;
  const blocks = data.map((datum, i) => {
    if (!datum) return Box.makeBlank(0, getSize(rectSize, drawEmptyBorder));
    let value = (Math.max(0, datum.value) / maxValue) * width;
    if (value < 1) {
      if (value < zeroLimit) return Box.makeBlank(0, getSize(rectSize, drawEmptyBorder)); // nothing to show
      value = 1;
    }
    let n = Math.floor(value);
    if (total + n > width) n = width - total;
    const isLast = i + 1 == data.length;
    if (isLast && normalize && total + n < width) n = width - total;
    total += n;
    const box = drawRealHeightBlock(n, rectSize, drawEmptyBorder),
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
