import {fullBlock, hBlocks8th, vBlocks8th} from './symbols.js';
import Box from './box.js';

/** Draws a block with a fractional width using 1/8th Unicode block characters.
 * The integer part is filled with full blocks; the fractional part appears on the right.
 * @param {number} realWidth - The real width (float). Fractional part is interpreted in 1/8th steps.
 * @param {number} height - The integer height of the block.
 * @param {boolean} [drawEmptyBorder=false] - If true, add an empty border column when the fractional part is close to 0 but not exactly 0.
 * @returns {import('./box.js').Box} A Box containing the drawn block.
 */
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

/** Draws a block with a fractional height using 1/8th Unicode block characters.
 * The integer part is filled with full blocks; the fractional part appears on the top.
 * @param {number} width - The integer width of the block.
 * @param {number} realHeight - The real height (float). Fractional part is interpreted in 1/8th steps.
 * @param {boolean} [drawEmptyBorder=false] - If true, add an empty border row when the fractional part is close to 0 but not exactly 0.
 * @returns {import('./box.js').Box} A Box containing the drawn block.
 */
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
