import {populateStyle} from './utils.js';

export const style = {};

const markdownReddit11 = {t: ' | ', m: ' | ', b: ' | ', v: ' | ', h: '---'},
  markdownReddit21 = {t: ' | ', m: ' | ', b: ' | ', v: ' | ', h: '==='};

populateStyle(style, markdownReddit11, 1, 1);
populateStyle(style, markdownReddit21, 2, 1);

export default style;
