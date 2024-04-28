import {fullBlock, hBlocks8th, vBlocks8th} from './symbols.js';
import Box from './box.js';

export const drawRealWidthBlock = (realWidth, height, drawEmptyBorder) => {
  realWidth = Math.max(0, realWidth);
  height = Math.max(0, Math.floor(height));

  const intWidth = Math.floor(realWidth),
    index = Math.round((realWidth - intWidth) * 8),
    hasFrac = realWidth - intWidth > 0,
    drawBorder = hasFrac && (drawEmptyBorder || index > 0);

  let line = fullBlock.repeat(intWidth);
  if (drawBorder) line += hBlocks8th[index];
  return new Box(new Array(height).fill(line), true);
};

export const drawRealHeightBlock = (width, realHeight, drawEmptyBorder) => {
  width = Math.max(0, Math.floor(width));
  realHeight = Math.max(0, realHeight);

  const intHeight = Math.floor(realHeight),
    index = Math.round((realHeight - intHeight) * 8),
    hasFrac = realHeight - intHeight > 0,
    drawBorder = hasFrac && (drawEmptyBorder || index > 0);

  let result = fullBlock.repeat(intHeight);
  if (drawBorder) result += hBlocks8th[index];
  return new Box(
    [...(drawBorder ? [vBlocks8th[index].repeat(width)] : []), ...new Array(intHeight).fill(fullBlock.repeat(width))],
    true
  );
};
