import {populateTableSymbols} from './utils.js';

export const style = {};

const rounded11 = {t: '...', m: ':+:', b: "'''", v: '|||', h: '-'},
  rounded21 = {t: '...', m: ':+:', b: "'''", v: '|||', h: '='};

populateTableSymbols(style, rounded11, 1, 1);
populateTableSymbols(style, rounded21, 2, 1);
