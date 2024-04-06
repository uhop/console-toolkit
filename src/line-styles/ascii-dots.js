import {populateStyle} from './utils.js';

export const style = {};

const dots = {t: '...', m: '.:.', b: ':::', v: ':::', h: '.'};

populateStyle(style, dots, 'd', 'd');

export default style;
