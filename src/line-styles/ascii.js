import {populateStyle} from './utils.js';

export const style = {};

const table11 = {t: '+++', m: '+++', b: '+++', v: '|||', h: '---'},
  table21 = {t: '+++', m: '+++', b: '+++', v: '|||', h: '==='};

populateStyle(style, table11, 1, 1);
populateStyle(style, table21, 2, 1);

export default style;
