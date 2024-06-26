import defaultTheme from '../themes/default.js';
import {normalizeData} from '../utils.js';
import Panel from '../../panel.js';
import style from '../../style.js';

export const drawChart =
  drawColumn =>
  (values, width, options = {}) => {
    const {maxValue, reverse, initState, groupGap = 1, gap = 0, theme = defaultTheme} = options;
    if (isNaN(width) || width <= 0) throw new Error(`"width" should be a positive integer instead of "${width}"`);

    const data = normalizeData(values, theme),
      maxSeriesLength = Math.max(0, ...data.map(series => series.length));

    // normalize length of series and flatten the result
    const newData = [];
    data.forEach(series => {
      newData.push(...series);
      if (series.length < maxSeriesLength) newData.push(...new Array(maxSeriesLength - series.length).fill(null));
    });

    const max =
        typeof maxValue == 'number' && maxValue >= 0
          ? maxValue
          : Math.max(0, ...newData.map(datum => datum?.value || 0)),
      {symbol = ' ', state = null, colorState} = theme?.empty || {},
      emptyState = style.addState(initState).addState(colorState).addState(state).getState();

    const panel = new Panel(0, width);
    for (let i = 0; i < newData.length; ++i) {
      if (i) {
        if (i % maxSeriesLength == 0) {
          if (groupGap > 0) panel.padRight(groupGap);
        } else {
          if (gap > 0) panel.padRight(gap);
        }
      }
      const p = Panel.make(drawColumn([newData[i]], width, max, options));
      if (p) {
        panel.addRight(p, {align: reverse ? 'top' : 'bottom'});
      } else {
        panel.padRight(1);
      }
    }
    return panel.toBox({emptySymbol: symbol, emptyState}).box;
  };

export default drawChart;
