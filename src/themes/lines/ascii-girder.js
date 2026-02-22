import {populateTheme} from '../utils.js';

/** ASCII girder line theme. */
export const lineTheme = {};

const girder = {t: '//[]\\\\', m: '|][][|', b: '\\\\[]//', v: '||||||', h: '===', w: 2};

populateTheme(lineTheme, girder, 1, 1);

export default lineTheme;
