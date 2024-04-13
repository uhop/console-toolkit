import {normalizeData} from '../utils.js';
import defaultTheme from '../themes/default.js';
import {drawRow} from './plain.js';

export const drawChart = (
  values,
  width,
  {maxValue, groupGap = 1, gap = 0, rectSize = 0, theme = defaultTheme, zeroLimit = 0.5, initState = {}} = {}
) => {
  if (isNaN(width) || width <= 0) throw new Error(`"width" should be positive integer instead of "${width}"`);

  const data = normalizeData(values, theme),
    maxSeriesLength = Math.max(0, ...data.map(series => series.length));

  // normalize length of series and flatten the result
  const newData = [];
  data.forEach(series => {
    newData.push(...series);
    if (series.length < maxSeriesLength) newData.push(...new Array(maxSeriesLength - series.length).fill(null));
  });

  const max =
    typeof maxValue == 'number' && maxValue >= 0 ? maxValue : Math.max(0, ...newData.map(datum => datum?.value || 0));

  if (gap < 1 && groupGap < 1)
    return newData.map(datum => drawRow([datum], width, max, {rectSize, zeroLimit, initState}));

  const result = [];
  newData.forEach((datum, i) => {
    if (i) {
      if (i % maxSeriesLength == 0) {
        if (groupGap > 0) result.push(new Array(groupGap).fill(''));
      } else {
        if (gap > 0) result.push(new Array(gap).fill(''));
      }
    }
    result.push(drawRow([datum], width, max, {rectSize, zeroLimit, initState}));
  });
  return result.flat(1);
};
