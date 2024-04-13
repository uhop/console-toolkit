import {populateTheme} from '../utils.js';

export const lineTheme = {};

const table11 = {t: '   ', m: '   ', b: '   ', v: '   ', h: '---'},
  table21 = {t: '   ', m: '   ', b: '   ', v: '   ', h: '==='};

populateTheme(lineTheme, table11, 1, 1);
populateTheme(lineTheme, table21, 2, 1);

export default lineTheme;
