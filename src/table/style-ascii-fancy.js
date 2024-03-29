import {populateTableSymbols} from './utils.js';

export const style = {};

const dots = {t: '...', m: '.:.', b: ':::', v: ':::', h: '.'};

populateTableSymbols(style, dots, 'd', 'd');

const girder = {t: '//[]\\\\', m: '|][][|', b: '\\\\[]//', v: '||||||', h: '=', w: [2, 2, 2]};

populateTableSymbols(style, girder, 'g', 'g');

export default style;
