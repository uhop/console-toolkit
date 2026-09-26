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

// caps are dropped when they do not fit, so the bar is always `width` cells wide
const layout = (width, {left = '', right = ''}) => {
  width = Math.max(0, Math.floor(width));
  const capsWidth = getLength(left) + getLength(right);
  if (!capsWidth || capsWidth >= width) return {inner: width, frame: s => s};
  return {inner: width - capsWidth, frame: s => left + s + right};
};

export const drawProgressBar = (fraction, width, {skin = blocks, fillStyle = plain, trackStyle = plain} = {}) => {
  const {fill, partials = [], track, trackStart = '', head = ''} = skin,
    {inner, frame} = layout(width, skin),
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

  return frame(result);
};

export const makeIndeterminateBar = (
  width,
  {skin = blocks, segment, motion = 'bounce', fillStyle = plain, trackStyle = plain} = {}
) => {
  if (motion !== 'bounce' && motion !== 'loop') throw new RangeError(`Unknown motion: ${motion}`);

  const {fill, track} = skin,
    {inner, frame} = layout(width, skin),
    length = Math.min(inner, Math.max(1, Math.floor(segment ?? inner / 4)));

  const draw = start => {
    const from = Math.max(0, start),
      to = Math.min(inner, start + length);
    return frame(
      (from ? trackStyle.text(track.repeat(from)) : '') +
        (to > from ? fillStyle.text(fill.repeat(to - from)) : '') +
        (to < inner ? trackStyle.text(track.repeat(inner - to)) : '')
    );
  };

  const starts = [];
  if (motion === 'loop') {
    for (let start = 1 - length; start < inner; ++start) starts.push(start);
  } else {
    const span = inner - length;
    for (let start = 0; start <= span; ++start) starts.push(start);
    for (let start = span - 1; start > 0; --start) starts.push(start);
  }

  const options = {skin, fillStyle, trackStyle};
  return {
    frames: starts.length ? starts.map(draw) : [draw(0)],
    notStarted: [drawProgressBar(0, width, options)],
    finished: [drawProgressBar(1, width, options)]
  };
};

export default drawProgressBar;
