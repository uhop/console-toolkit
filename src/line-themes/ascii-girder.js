import {populateTheme} from './utils.js';

export const lineTheme = {};

const girder = {t: '//[]\\\\', m: '|][][|', b: '\\\\[]//', v: '||||||', h: '===', w: 2};

populateTheme(lineTheme, girder, 1, 1);

export default lineTheme;
