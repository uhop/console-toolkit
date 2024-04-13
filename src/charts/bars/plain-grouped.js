import {normalizeData, drawRow} from './plain.js';

export const drawChart = (values, width, {gap = 1, theme = defaultTheme, zeroLimit = 0.5, state = {}} = {}) => {
  if (isNaN(width) || width <= 0) throw new Error(`"width" should be positive integer instead of "${width}"`);

  const data = normalizeData(values, {theme, state}),
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

  const maxValue = Math.max(0, ...newData.map(datum => datum?.value || 0));

  return newData.map(datum => drawRow([datum], width, maxValue, zeroLimit));
};
