// @ts-self-types="./unicode-thin.d.ts"
import {populateTheme} from '../utils.js';

export const blockTheme = {};

const table11 = {t: ' ▁ ', m: '▕ ▏', b: ' ▔ ', v: '▕ ▏', h: '▁ ▔', f: '█'};

populateTheme(blockTheme, table11, 1, 1);

export default blockTheme;
