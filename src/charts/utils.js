import {Commands} from '../ansi/sgr.js';
import defaultTheme from './themes/default.js';

export const makeBgFromFg = state => ({
  background: !state.foreground
    ? null
    : Array.isArray(state.foreground)
    ? [Commands.BG_EXTENDED_COLOR, ...state.foreground.slice(1)]
    : Number(state.foreground) + 10
});

export const makeFgFromBg = state => ({
  foreground: !state.background
    ? null
    : Array.isArray(state.background)
    ? [Commands.EXTENDED_COLOR, ...state.background.slice(1)]
    : Number(state.background) - 10
});

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
