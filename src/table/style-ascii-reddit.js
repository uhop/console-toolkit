import {populateTableSymbols} from './utils.js';

export const style = {};

const markdownReddit11 = {t: '|', m: '|', b: '|', v: '|', h: '-', w: [0, 1, 0]},
  markdownReddit21 = {t: '|', m: '|', b: '|', v: '|', h: '=', w: [0, 1, 0]};

populateTableSymbols(style, markdownReddit11, 1, 1);
populateTableSymbols(style, markdownReddit21, 2, 1);
