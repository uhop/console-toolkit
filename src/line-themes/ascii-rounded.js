import {populateTheme} from './utils.js';

export const lineTheme = {};

const rounded11 = {t: '...', m: ':+:', b: "'''", v: '|||', h: '---'},
  rounded21 = {t: '...', m: ':+:', b: "'''", v: '|||', h: '==='};

populateTheme(lineTheme, rounded11, 1, 1);
populateTheme(lineTheme, rounded21, 2, 1);

export default lineTheme;
