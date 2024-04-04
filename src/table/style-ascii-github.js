import {populateStyle} from './utils.js';

export const style = {};

const markdownGithub11 = {t: '|||', m: '|||', b: '|||', v: '|||', h: '-'},
  markdownGithub21 = {t: '|||', m: '|||', b: '|||', v: '|||', h: '='};

populateStyle(style, markdownGithub11, 1, 1);
populateStyle(style, markdownGithub21, 2, 1);

export default style;
