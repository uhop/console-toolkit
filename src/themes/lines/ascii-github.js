import {populateTheme} from '../utils.js';

/** ASCII GitHub-style line theme. */
export const lineTheme = {};

const markdownGithub11 = {t: '|||', m: '|||', b: '|||', v: '|||', h: '---'},
  markdownGithub21 = {t: '|||', m: '|||', b: '|||', v: '|||', h: '==='};

populateTheme(lineTheme, markdownGithub11, 1, 1);
populateTheme(lineTheme, markdownGithub21, 2, 1);

export default lineTheme;
