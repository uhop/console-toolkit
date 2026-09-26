// @ts-self-types="./rainbow-reversed.d.ts"
import {freezeDeep} from '../../meta.js';
import rainbow from './rainbow.js';

export const chartTheme = rainbow.slice().reverse();

export default chartTheme;

freezeDeep([chartTheme]);
