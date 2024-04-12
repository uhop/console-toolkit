import style from '../../style.js';
import {capitalize} from '../../meta.js';
import {Commands} from '../../ansi/sgr.js';
import {combineStates} from '../../ansi/sgr-state.js';

// data = [datum]
// datum = {value, symbol, state}

export const drawRow = (data, width, maxValue, zeroLimit) =>
  data
    .map(datum => {
      if (!datum) return '';
      let value = (Math.max(0, datum.value) / maxValue) * width;
      if (value < 1) {
        if (value < zeroLimit) return ''; // nothing to show
        value = 1;
      }
      const n = Math.floor(value);
      return style.addState(datum.state || {}).text((datum.symbol || ' ').repeat(n));
    })
    .join('');

const seriesColors = 'cyan,magenta,blue,yellow,green,red'.split(',');

export const defaultTheme = [
  ...seriesColors.map(name => ({colorState: style['bright' + capitalize(name)].getState(), symbol: ' '})),
  ...seriesColors.map(name => ({colorState: style[name].getState(), symbol: ' '}))
];

export const makeBgFromFg = state => ({
  background: !state.foreground
    ? null
    : Array.isArray(state.foreground)
    ? [Commands.BG_EXTENDED_COLOR, ...state.foreground.slice(1)]
    : Number(state.foreground) + 10
});

const sumValues = row => row.reduce((acc, datum) => acc + datum.value, 0);

export const drawChart = (values, width, {theme = defaultTheme, zeroLimit = 0.5, state = {}} = {}) => {
  if (isNaN(width) || width <= 0) throw new Error(`"width" should be positive integer instead of "${width}"`);

  // convert to compound values
  const data = values.map(series => {
    if (!Array.isArray(series)) series = [series];
    return series.map((datum, i) => {
      if (typeof datum == 'number') datum = {value: datum};
      const value = Math.max(0, datum?.value ?? 0),
        seriesTheme = theme[i % theme.length];
      return {
        value: isNaN(value) ? 0 : value,
        symbol: datum?.symbol ?? seriesTheme.symbol,
        state:
          datum?.state ??
          (datum?.colorState && combineStates(state, makeBgFromFg(datum.colorState))) ??
          seriesTheme?.state ??
          (seriesTheme?.colorState && combineStates(state, makeBgFromFg(seriesTheme.colorState))) ??
          {}
      };
    });
  });

  const maxValue = Math.max(0, ...data.map(row => sumValues(row)));

  return data.map(row => drawRow(row, width, maxValue, zeroLimit));
};
