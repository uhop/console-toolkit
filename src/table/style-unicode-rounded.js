import {populateStyle} from './utils.js';

export const style = {};

const tableRounded = {t: '╭┬╮', m: '├┼┤', b: '╰┴╯', v: '│││', h: '─'};

populateStyle(style, tableRounded, 'r', 'r');

export default style;
