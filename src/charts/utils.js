import {Commands} from '../ansi/sgr.js';
import defaultTheme from './themes/default.js';

/** Converts a foreground color state to a background color state.
 * @param {object} state - SGR state with a `foreground` property.
 * @returns {object} State with a `background` property.
 */
export const makeBgFromFg = state => ({
  background: !state.foreground
    ? null
    : Array.isArray(state.foreground)
      ? [Commands.BG_EXTENDED_COLOR, ...state.foreground.slice(1)]
      : Number(state.foreground) + 10
});

/** Converts a background color state to a foreground color state.
 * @param {object} state - SGR state with a `background` property.
 * @returns {object} State with a `foreground` property.
 */
export const makeFgFromBg = state => ({
  foreground: !state.background
    ? null
    : Array.isArray(state.background)
      ? [Commands.EXTENDED_COLOR, ...state.background.slice(1)]
      : Number(state.background) - 10
});

/** Sums the values in a data series.
 * @param {{value?: number}[]} series
 * @returns {number}
 */
export const sumValues = series => series.reduce((acc, datum) => acc + (datum?.value || 0), 0);

/** Normalizes chart data, merging with default and custom themes.
 * @param {(number|object|Array)[]} data - Raw chart data.
 * @param {object[]} theme - Theme array for series styling.
 * @returns {object[][]} Normalized data.
 */
export const normalizeData = (data, theme) =>
  data.map(series => {
    if (!Array.isArray(series)) series = [series];
    return series.map((datum, i) => {
      if (typeof datum == 'number') datum = {value: datum};
      const value = Math.max(0, datum?.value ?? 0),
        defaultSeriesTheme = defaultTheme[i % defaultTheme.length],
        seriesTheme = theme[i % theme.length];
      return {...defaultSeriesTheme, ...seriesTheme, ...datum, value: isNaN(value) || value < 0 ? 0 : value};
    });
  });

/** Allocates pixel/character sizes to data values proportionally.
 * @param {{value?: number}[]} data - Data series.
 * @param {number} maxValue - Maximum value (-1 for auto).
 * @param {number} size - Total available size.
 * @returns {number[]} Allocated sizes per datum plus one extra for remainder.
 */
export const allocateSizes = (data, maxValue, size) => {
  const values = data.map((datum, index) => ({value: datum?.value || 0, index})),
    seriesValue = values.reduce((acc, datum) => acc + datum.value, 0);

  if (maxValue < 0) {
    maxValue = seriesValue;
    if (!maxValue) maxValue = 1;
  }
  if (seriesValue < maxValue) {
    values.push({value: maxValue - seriesValue, index: -1}); // add an empty bin
  } else {
    // truncate values above maxValue
    let acc = 0;
    for (const datum of values) {
      datum.value = acc < maxValue ? Math.min(datum.value, maxValue - acc) : 0;
      acc += datum.value;
    }
  }

  let allocated = 0;
  values.forEach(datum => {
    const allocation = (datum.value / maxValue) * size;
    allocated += datum.size = Math.floor(allocation);
    datum.frac = allocation - datum.size;
  });

  values.sort((a, b) => b.frac - a.frac);
  for (let i = 0, n = size - allocated; i < n; ++i) ++values[i].size;

  const sizes = new Array(data.length + 1).fill(0);
  values.forEach(datum => (sizes[datum.index >= 0 ? datum.index : sizes.length - 1] = datum.size));
  return sizes;
};

/** Calculates the integer size needed for a fractional value.
 * @param {number} value - The fractional value.
 * @param {boolean} [drawEmptyBorder] - Whether to draw a border for empty fractional parts.
 * @returns {number} The integer size.
 */
export const getFracSize = (value, drawEmptyBorder) => {
  const intValue = Math.floor(value),
    hasFrac = value - intValue > 0,
    index = (value - intValue) * 8,
    drawBorder = hasFrac && (drawEmptyBorder || index > 0);

  return intValue + (drawBorder ? 1 : 0);
};
