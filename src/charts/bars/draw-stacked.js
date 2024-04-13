import defaultTheme from '../themes/default.js';
import {normalizeData, sumValues} from '../utils.js';

export const drawChart =
  drawRow =>
  (values, width, {maxValue, gap = 0, rectSize = 0, theme = defaultTheme, zeroLimit = 0.5, initState = {}} = {}) => {
    if (isNaN(width) || width <= 0) throw new Error(`"width" should be positive integer instead of "${width}"`);

    const data = normalizeData(values, theme),
      max =
        typeof maxValue == 'number' ? (maxValue < 0 ? -1 : maxValue) : Math.max(0, ...data.map(row => sumValues(row)));

    if (gap < 1) return data.map(row => drawRow(row, width, max, {rectSize, zeroLimit, initState})).flat(1);

    const result = [];
    data.forEach((row, i) => {
      if (i) result.push(...new Array(gap).fill(''));
      result.push(drawRow(row, width, max, {rectSize, zeroLimit, initState}));
    });
    return result.flat(1);
  };

export default drawChart;
