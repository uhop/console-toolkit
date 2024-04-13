import style from '../../style.js';
import {optimize} from '../../ansi/sgr-state.js';
import defaultTheme from '../themes/default.js';
import {makeBgFromFg, normalizeData} from '../utils.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

const sumValues = row => row.reduce((acc, datum) => acc + (datum?.value || 0), 0);

export const drawRow = (data, width, maxValue, {rectSize = 0, zeroLimit = 0.5, initState = {}}) => {
  const normalize = maxValue < 0;
  if (maxValue < 0) maxValue = sumValues(data);
  if (!maxValue) maxValue = 1;
  let total = 0;
  const row = optimize(
    data
      .map((datum, i) => {
        if (!datum) return '';
        let value = (Math.max(0, datum.value) / maxValue) * width;
        if (value < 1) {
          if (value < zeroLimit) return ''; // nothing to show
          value = 1;
        }
        let n = Math.floor(value);
        if (total + n > width) n = width - total;
        total += n;
        const isLast = i + 1 == data.length;
        let newStyle = style.addState(initState).addState(datum.state || makeBgFromFg(datum.colorState));
        return newStyle.text(datum.symbol.repeat(n + (isLast && normalize && total < width ? width - total : 0)));
      })
      .join('')
  );
  if (rectSize <= 1) return row;
  return new Array(rectSize).fill(row);
};

export const drawChart = (
  values,
  width,
  {maxValue, gap = 0, rectSize = 0, theme = defaultTheme, zeroLimit = 0.5, initState = {}} = {}
) => {
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
