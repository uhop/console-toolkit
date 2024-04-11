import {populateStyle} from './utils.js';

export const style = {};

const dots = {t: '...', m: '.:.', b: ':::', v: ':::', h: '...'};

populateStyle(style, dots, 1, 1);

export default style;
