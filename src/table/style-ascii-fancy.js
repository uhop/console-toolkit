import {populateStyle} from './utils.js';

export const style = {};

const dots = {t: '...', m: '.:.', b: ':::', v: ':::', h: '.'};

populateStyle(style, dots, 'd', 'd');

const girder = {t: '//[]\\\\', m: '|][][|', b: '\\\\[]//', v: '||||||', h: '=', w: 2};

populateStyle(style, girder, 'g', 'g');

export default style;
