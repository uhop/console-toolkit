import {populateStyle} from './utils.js';

export const style = {};

const rounded11 = {t: '...', m: ':+:', b: "'''", v: '|||', h: '-'},
  rounded21 = {t: '...', m: ':+:', b: "'''", v: '|||', h: '='};

populateStyle(style, rounded11, 1, 1);
populateStyle(style, rounded21, 2, 1);

export default style;
