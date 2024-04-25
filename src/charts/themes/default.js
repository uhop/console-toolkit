import {capitalize} from '../../meta.js';
import style from '../../style.js';

const seriesColors = 'cyan,magenta,blue,yellow,green,red'.split(',');

export const chartTheme = [
  ...seriesColors.map(name => ({colorState: style['bright' + capitalize(name)].getState()})),
  ...seriesColors.map(name => ({colorState: style[name].getState()}))
];
chartTheme.empty = {state: style.reset.all.getState()};

export default chartTheme;
