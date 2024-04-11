import {draw as drawTable} from '../../src/table/draw-borders.js';
import {style as lineStyle} from '../../src/line-styles/unicode.js';
import {draw} from './utils.js';

const makeBox4 = (hTheme1, hTheme2, vTheme1, vTheme2) =>
  drawTable(
    lineStyle,
    [vTheme1, 1, vTheme1, 1, vTheme1, 1, vTheme2, 1, vTheme2, 1, vTheme2],
    [hTheme1, 1, hTheme1, 1, hTheme1, 1, hTheme2, 1, hTheme2, 1, hTheme2],
    {
      skip: [{x: 3, y: 3, width: 5, height: 5}]
    }
  );

const makeBox = (hTheme, vTheme) => makeBox4(hTheme, hTheme, vTheme, vTheme);

draw(makeBox(1, 1), makeBox(1, 2), makeBox(2, 1), makeBox(2, 2));
draw(makeBox4(1, 2, 1, 2), makeBox4(1, 2, 2, 1), makeBox4(2, 1, 1, 2), makeBox(2, 1, 2, 1));
