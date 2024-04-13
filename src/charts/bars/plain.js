import style from '../../style.js';
import {optimize} from '../../ansi/sgr-state.js';
import {makeBgFromFg, sumValues} from '../utils.js';
import drawStackedChart from './draw-stacked.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

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

export const drawChart = drawStackedChart(drawRow);

export default drawChart;
