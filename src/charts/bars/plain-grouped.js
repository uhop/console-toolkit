import {normalizeData} from '../utils.js';
import defaultTheme from '../themes/default.js';
import {drawRow} from './plain.js';

export const drawChart = (
  values,
  width,
  {gap = 1, maxValue, theme = defaultTheme, zeroLimit = 0.5, initState = {}} = {}
) => {
  if (isNaN(width) || width <= 0) throw new Error(`"width" should be positive integer instead of "${width}"`);

  const data = normalizeData(values, theme),
    maxSeriesLength = Math.max(0, ...data.map(series => series.length));

  // normalize length of series
  data.forEach(
    series => series.length < maxSeriesLength && series.push(...new Array(maxSeriesLength - series.length).fill(null))
  );

  const newData = [];
  data.forEach((series, i) => {
    if (i && gap > 0) newData.push(...new Array(gap).fill(null));
    newData.push(...series);
  });

  const max =
    typeof maxValue == 'number' && maxValue >= 0 ? maxValue : Math.max(0, ...newData.map(datum => datum?.value || 0));

  return newData.map(datum => drawRow([datum], width, max, {zeroLimit, initState}));
};
