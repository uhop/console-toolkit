import {populateTableSymbols} from '../utils.js';

export const style = {};

const table11 = {t: ' ', m: ' ', b: ' ', v: ' ', h: '-', w: [0, 1, 0]},
  table21 = {t: ' ', m: ' ', b: ' ', v: ' ', h: '=', w: [0, 1, 0]};

populateTableSymbols(style, table11, 1, 1);
populateTableSymbols(style, table21, 2, 1);

const markdownGithub11 = {t: '|||', m: '|||', b: '|||', v: '|||', h: '-'},
  markdownGithub21 = {t: '|||', m: '|||', b: '|||', v: '|||', h: '='};

populateTableSymbols(style, markdownGithub11, 'mg1', 'mg1');
populateTableSymbols(style, markdownGithub21, 'mg2', 'mg1');

const markdownReddit11 = {t: '|', m: '|', b: '|', v: '|', h: '-', w: [0, 1, 0]},
  markdownReddit21 = {t: '|', m: '|', b: '|', v: '|', h: '=', w: [0, 1, 0]};

populateTableSymbols(style, markdownReddit11, 'mr1', 'mr1');
populateTableSymbols(style, markdownReddit21, 'mr2', 'mr1');
