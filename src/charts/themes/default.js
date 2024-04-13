import {capitalize} from '../../meta.js';
import style from '../../style.js';

const seriesColors = 'cyan,magenta,blue,yellow,green,red'.split(',');

export const chartTheme = [
  ...seriesColors.map(name => ({colorState: style['bright' + capitalize(name)].getState(), symbol: ' '})),
  ...seriesColors.map(name => ({colorState: style[name].getState(), symbol: ' '}))
];

export default chartTheme;
