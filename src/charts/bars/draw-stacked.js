import defaultTheme from '../themes/default.js';
import {normalizeData, sumValues} from '../utils.js';

/** Creates a stacked bar chart drawing function from a row-drawing function.
 * @param {Function} drawRow - Function `(data, width, maxValue, options) => string|string[]`.
 * @returns {Function} Chart drawing function `(values, width, options) => string[]`.
 */
export const drawChart =
  drawRow =>
  (values, width, options = {}) => {
    const {maxValue, gap = 0, theme = defaultTheme} = options;
    if (isNaN(width) || width <= 0) throw new Error(`"width" should be a positive integer instead of "${width}"`);

    const data = normalizeData(values, theme),
      max =
        typeof maxValue == 'number' ? (maxValue < 0 ? -1 : maxValue) : Math.max(0, ...data.map(row => sumValues(row)));

    if (gap < 1) return data.map(row => drawRow(row, width, max, options)).flat(1);

    const result = [];
    data.forEach((row, i) => {
      if (i) result.push(...new Array(gap).fill(''));
      result.push(drawRow(row, width, max, options));
    });
    return result.flat(1);
  };

export default drawChart;
