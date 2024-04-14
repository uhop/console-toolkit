import style from '../../style.js';
import {optimize} from '../../ansi/sgr-state.js';
import {allocateSizes, makeBgFromFg, sumValues} from '../utils.js';
import drawStackedChart from './draw-stacked.js';

// data = [datum]
// datum = {value, colorState, symbol, state}

export const drawRow = (data, width, maxValue, {rectSize = 0, initState = {}}) => {
  const sizes = allocateSizes(data, maxValue, width),
    row = optimize(
      data
        .map((datum, i) =>
          datum
            ? style
                .addState(initState)
                .addState(datum.state || makeBgFromFg(datum.colorState))
                .text((datum.symbol || ' ').repeat(sizes[i]))
            : ''
        )
        .join('')
    );
  if (rectSize <= 1) return row;
  return new Array(rectSize).fill(row);
};

export const drawChart = drawStackedChart(drawRow);

export default drawChart;
