import style from '../../style.js';
import Box from '../../box.js';
import {optimize} from '../../ansi/sgr-state.js';
import {drawRealHeightBlock} from '../../draw-block-frac.js';
import drawGroupedChart from './draw-grouped.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

/** Draws a single grouped column using fractional height block characters.
 * @param {object[]} data - Normalized data series.
 * @param {number} width - Total height.
 * @param {number} maxValue - Maximum value for scaling.
 * @param {object} [options] - Options including `reverse`, `rectSize`, `initState`.
 * @returns {string[]} The drawn column lines.
 */
export const drawColumn = (data, width, maxValue, options = {}) => {
  const {reverse, rectSize = 1, initState = {}} = options,
    blocks = data.map(datum => {
      if (!datum) return Box.makeBlank(rectSize, 0);
      const box = drawRealHeightBlock(rectSize, (datum.value / maxValue) * width),
        boxStyle = style.addState(initState).addState(datum.colorState).addState(datum.state);
      return new Box(
        box.box.map(line => boxStyle.text(line)),
        true
      );
    }),
    result = (reverse ? blocks : blocks.reverse()).map(block => block.box).flat(1);
  return result.map(line => optimize(line));
};

/** Draws a complete fractional grouped column chart.
 * @param {any[]} values - Chart data.
 * @param {number} width - Available height.
 * @param {object} [options] - Options.
 * @returns {string[]} Array of strings representing the chart.
 */
export const drawChart = drawGroupedChart(drawColumn);

export default drawChart;
