import Box from './box.js';

/** Draws a block with fractional width using 1/8th Unicode block characters. */
export function drawRealWidthBlock(realWidth: number, height: number, drawEmptyBorder?: boolean): Box;
/** Draws a block with fractional height using 1/8th Unicode block characters. */
export function drawRealHeightBlock(width: number, realHeight: number, drawEmptyBorder?: boolean): Box;
