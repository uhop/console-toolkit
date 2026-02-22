import style from '../../style.js';
import Box from '../../box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes} from '../utils.js';
import drawStackedChart from './draw-stacked.js';
import drawBlock from '../../draw-block.js';
import defaultBlockTheme from '../../themes/blocks/unicode-half.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

/** Draws a single stacked bar row using block-drawing characters.
 * @param {object[]} data - Normalized data series.
 * @param {number} width - Total width.
 * @param {number} maxValue - Maximum value for scaling.
 * @param {object} [options] - Options including `reverse`, `blockTheme`, `rectSize`, `initState`.
 * @returns {string[]} The drawn row lines.
 */
export const drawRow = (data, width, maxValue, options = {}) => {
  const {reverse, blockTheme = defaultBlockTheme, rectSize = 0, initState = {}} = options,
    sizes = allocateSizes(data, maxValue, width),
    {t = 1, b = 1, l = reverse ? 1 : 0, r = reverse ? 0 : 1} = options;

  const blocks = data.map((datum, i) => {
      if (!datum) return Box.makeBlank(0, Math.max(2, rectSize));
      const box = drawBlock(sizes[i], Math.max(0, rectSize - 2), blockTheme, {
          left: reverse ? (i + 1 < data.length ? 0 : l) : i ? 0 : l,
          right: reverse ? (i ? 0 : r) : i + 1 < data.length ? 0 : r,
          top: t,
          bottom: b
        }),
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

/** Draws a complete block stacked bar chart.
 * @param {any[]} values - Chart data.
 * @param {number} width - Available width.
 * @param {object} [options] - Block bar options.
 * @returns {string[]} Array of strings representing the chart.
 */
export const drawChart = drawStackedChart(drawRow);

export default drawChart;
