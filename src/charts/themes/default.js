import {capitalize} from '../../meta.js';
import style from '../../style.js';

const seriesColors = 'cyan,magenta,blue,yellow,green,red'.split(',');

/** The default chart theme with standard colors. */
export const chartTheme = [
  ...seriesColors.map(name => ({colorState: style['bright' + capitalize(name)].getState()})),
  ...seriesColors.map(name => ({colorState: style[name].getState()}))
];
chartTheme.empty = {state: style.reset.all.getState(), symbol: ' '};

export default chartTheme;
