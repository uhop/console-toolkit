import {populateTheme} from './utils.js';

export const lineTheme = {};

const dots = {t: '...', m: '.:.', b: ':::', v: ':::', h: '...'};

populateTheme(lineTheme, dots, 1, 1);

export default lineTheme;
