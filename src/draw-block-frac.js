import Box from './Box.js';

const generateSequence = (base, from, to) => {
  const result = [],
    step = from < to ? 1 : -1;
  for (let i = from; i != to; i += step) result.push(String.fromCodePoint(base + i));
  return result;
};

const vSymbol = [' ', ...generateSequence(0x2581, 0, 8)],
  hSymbol = [' ', ...generateSequence(0x2587, 8, 0, -1)],
  fullSymbol = '\u{2588}';

export const drawRealWidthBlock = (realWidth, height, drawEmptyBorder) => {
  realWidth = Math.max(0, realWidth);
  height = Math.max(0, Math.floor(height));

  const intWidth = Math.floor(realWidth),
    index = Math.round((realWidth - intWidth) * 8),
    hasFrac = realWidth - intWidth > 0,
    drawBorder = hasFrac && (drawEmptyBorder || index > 0);

  let line = fullSymbol.repeat(intWidth);
  if (drawBorder) line += hSymbol[index];
  return new Box(new Array(height).fill(line), true);
};

export const drawRealHeightBlock = (width, realHeight, drawEmptyBorder) => {
  width = Math.max(0, Math.floor(width));
  realHeight = Math.max(0, realHeight);

  const intHeight = Math.floor(realHeight),
    index = Math.round((realHeight - intHeight) * 8),
    hasFrac = realHeight - intHeight > 0,
    drawBorder = hasFrac && (drawEmptyBorder || index > 0);

  let result = fullSymbol.repeat(intHeight);
  if (drawBorder) result += hSymbol[index];
  return new Box(
    [...(drawBorder ? [vSymbol[index].repeat(width)] : []), ...new Array(intHeight).fill(fullSymbol.repeat(width))],
    true
  );
};
