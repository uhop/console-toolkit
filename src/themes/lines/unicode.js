// @ts-self-types="./unicode.d.ts"
import {freezeDeep} from '../../meta.js';
import {makeLineTheme} from '../utils.js';

export const lineTheme = makeLineTheme([
  [{t: '┌┬┐', m: '├┼┤', b: '└┴┘', v: '│││', h: '───'}, 1, 1],
  [{t: '╓╥╖', m: '╟╫╢', b: '╙╨╜', v: '║║║', h: '───'}, 1, 2],
  [{t: '╒╤╕', m: '╞╪╡', b: '╘╧╛', v: '│││', h: '═══'}, 2, 1],
  [{t: '╔╦╗', m: '╠╬╣', b: '╚╩╝', v: '║║║', h: '═══'}, 2, 2]
]);

export default lineTheme;

freezeDeep([lineTheme]);
