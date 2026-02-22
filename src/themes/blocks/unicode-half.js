import {populateTheme} from '../utils.js';

/** Unicode half-block theme. */
export const blockTheme = {};

const table11 = {t: '▗▄▖', m: '▐ ▌', b: '▝▀▘', v: '▐ ▌', h: '▄ ▀', f: '█'};

populateTheme(blockTheme, table11, 1, 1);

export default blockTheme;
