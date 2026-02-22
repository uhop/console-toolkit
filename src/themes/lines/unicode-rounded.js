import {populateTheme} from '../utils.js';

/** Unicode rounded box-drawing line theme. */
export const lineTheme = {};

const table11 = {t: '╭┬╮', m: '├┼┤', b: '╰┴╯', v: '│││', h: '───'},
  table12 = {t: '╓╥╖', m: '╟╫╢', b: '╙╨╜', v: '║║║', h: '───'},
  table21 = {t: '╒╤╕', m: '╞╪╡', b: '╘╧╛', v: '│││', h: '═══'},
  table22 = {t: '╔╦╗', m: '╠╬╣', b: '╚╩╝', v: '║║║', h: '═══'};

populateTheme(lineTheme, table11, 1, 1);
populateTheme(lineTheme, table12, 1, 2);
populateTheme(lineTheme, table21, 2, 1);
populateTheme(lineTheme, table22, 2, 2);

export default lineTheme;
