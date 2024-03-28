import {populateTableSymbols} from '../utils.js';

export const style = {};

const table11 = {t: '+++', m: '+++', b: '+++', v: '|||', h: '-'},
  table21 = {t: '+++', m: '+++', b: '+++', v: '|||', h: '='};

populateTableSymbols(style, table11, 1, 1);
populateTableSymbols(style, table21, 2, 1);

const rounded11 = {t: '...', m: ':+:', b: "'''", v: '|||', h: '-'},
  rounded21 = {t: '...', m: ':+:', b: "'''", v: '|||', h: '='};

populateTableSymbols(style, rounded11, 'r1', 'r1');
populateTableSymbols(style, rounded21, 'r2', 'r1');

const dots = {t: '...', m: '.:.', b: ':::', v: ':::', h: '.'};

populateTableSymbols(style, dots, 'd', 'd');

const girder = {t: '//[]\\\\', m: '|][][|', b: '\\\\[]//', v: '||||||', h: '=', w: [2, 2, 2]};

populateTableSymbols(style, girder, 'g', 'g');
