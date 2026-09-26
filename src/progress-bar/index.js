// @ts-self-types="./index.d.ts"
import style from '../style.js';
import {getLength} from '../strings.js';
import {blocks} from './skins.js';

const plain = {text: s => s};

// the boundary cell shows the track's background around the fill's glyph
const boundaryStyle = (fillStyle, trackStyle) => {
  const background = trackStyle.getState?.().background;
  if (!background) return fillStyle;
  const withBackground = style.addState({background});
  return {text: s => withBackground.text(fillStyle.text(s))};
};

export const drawProgressBar = (fraction, width, {skin = blocks, fillStyle = plain, trackStyle = plain} = {}) => {
  const {fill, partials = [], track, trackStart = '', head = '', left = '', right = ''} = skin;
  width = Math.max(0, Math.floor(width));

  const capsWidth = getLength(left) + getLength(right),
    hasCaps = capsWidth && capsWidth < width,
    inner = hasCaps ? width - capsWidth : width,
    steps = partials.length + 1,
    // floor: full only at 1; the epsilon absorbs float error
    units = Math.floor((Number.isFinite(fraction) ? Math.min(1, Math.max(0, fraction)) : 0) * inner * steps + 1e-9),
    whole = Math.floor(units / steps),
    part = units % steps;

  let result = '';
  if (part) {
    result =
      (whole ? fillStyle.text(fill.repeat(whole)) : '') + boundaryStyle(fillStyle, trackStyle).text(partials[part - 1]);
  } else if (whole < inner && whole && head) {
    result = fillStyle.text(fill.repeat(whole - 1) + head);
  } else if (whole) {
    result = fillStyle.text(fill.repeat(whole));
  }

  const rest = inner - whole - (part ? 1 : 0);
  if (rest) {
    const start = trackStart && whole && !part ? trackStart : '';
    result += trackStyle.text(start + track.repeat(rest - (start ? 1 : 0)));
  }

  return hasCaps ? left + result + right : result;
};

export default drawProgressBar;
