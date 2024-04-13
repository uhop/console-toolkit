import {populateTheme} from './utils.js';

export const lineTheme = {};

const markdownReddit11 = {t: ' | ', m: ' | ', b: ' | ', v: ' | ', h: '---'},
  markdownReddit21 = {t: ' | ', m: ' | ', b: ' | ', v: ' | ', h: '==='};

populateTheme(lineTheme, markdownReddit11, 1, 1);
populateTheme(lineTheme, markdownReddit21, 2, 1);

export default lineTheme;
