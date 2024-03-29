import {populateTableSymbols} from './utils.js';

export const style = {};

const table11 = {t: '┌┬┐', m: '├┼┤', b: '└┴┘', v: '│││', h: '─'},
  table12 = {t: '╓╥╖', m: '╟╫╢', b: '╙╨╜', v: '║║║', h: '─'},
  table21 = {t: '╒╤╕', m: '╞╪╡', b: '╘╧╛', v: '│││', h: '═'},
  table22 = {t: '╔╦╗', m: '╠╬╣', b: '╚╩╝', v: '║║║', h: '═'},
  tableRounded = {t: '╭┬╮', m: '├┼┤', b: '╰┴╯', v: '│││', h: '─'};

populateTableSymbols(style, table11, 1, 1);
populateTableSymbols(style, table12, 1, 2);
populateTableSymbols(style, table21, 2, 1);
populateTableSymbols(style, table22, 2, 2);

populateTableSymbols(style, tableRounded, 'r', 'r');

export default style;
