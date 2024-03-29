import {populateTableSymbols} from './utils.js';

export const style = {};

const table11 = {t: ' ', m: ' ', b: ' ', v: ' ', h: '-', w: [0, 1, 0]},
  table21 = {t: ' ', m: ' ', b: ' ', v: ' ', h: '=', w: [0, 1, 0]};

populateTableSymbols(style, table11, 1, 1);
populateTableSymbols(style, table21, 2, 1);
