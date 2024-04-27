import defaultTheme from '../themes/default.js';
import {normalizeData, sumValues} from '../utils.js';
import Panel from '../../Panel.js';
import style from '../../style.js';

export const drawChart =
  drawColumn =>
  (values, width, options = {}) => {
    const {maxValue, reverse, initState, gap = 0, theme = defaultTheme} = options;
    if (isNaN(width) || width <= 0) throw new Error(`"width" should be a positive integer instead of "${width}"`);

    const data = normalizeData(values, theme),
      max =
        typeof maxValue == 'number' ? (maxValue < 0 ? -1 : maxValue) : Math.max(0, ...data.map(row => sumValues(row))),
      {symbol = ' ', state = null, colorState} = theme?.empty || {},
      emptyState = style.addState(initState).addState(colorState).addState(state).getState();

    let panel;
    for (let i = 0; i < data.length; ++i) {
      const p = Panel.fromBox(drawColumn(data[i], width, max, options));
      if (i) {
        if (gap > 0) panel.padRight(gap);
        panel.addRight(p, {align: reverse ? 'top' : 'bottom'});
      } else {
        panel = p;
      }
    }
    return panel.toBox(symbol, emptyState).box;
  };

export default drawChart;
