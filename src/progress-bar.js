// @ts-self-types="./progress-bar.d.ts"
import {fullBlock, hBlocks8th, shadeLight} from './symbols.js';

const plain = {text: s => s};

export const drawProgressBar = (
  fraction,
  width,
  {fill = fullBlock, track = shadeLight, fillStyle = plain, trackStyle = plain} = {}
) => {
  width = Math.max(0, Math.floor(width));
  const cells = (Number.isFinite(fraction) ? Math.min(1, Math.max(0, fraction)) : 0) * width,
    whole = Math.floor(cells),
    // eighth blocks only continue a full-block fill
    eighths = fill === fullBlock ? Math.round((cells - whole) * 8) : 0,
    partial = whole < width && eighths ? hBlocks8th[eighths] : '',
    rest = width - whole - (partial ? 1 : 0),
    filled = fill.repeat(whole) + partial;
  return (filled ? fillStyle.text(filled) : '') + (rest ? trackStyle.text(track.repeat(rest)) : '');
};

export default drawProgressBar;
