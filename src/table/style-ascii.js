import {populateTableSymbols} from './utils.js';

export const style = {};

const table11 = {t: '+++', m: '+++', b: '+++', v: '|||', h: '-'},
  table21 = {t: '+++', m: '+++', b: '+++', v: '|||', h: '='};

populateTableSymbols(style, table11, 1, 1);
populateTableSymbols(style, table21, 2, 1);

export default style;
