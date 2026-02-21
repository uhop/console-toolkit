import Box from './box.js';

/** Draws a block with fractional width using 1/8th Unicode block characters.
 * @param realWidth - Fractional width (e.g., 3.5 for 3.5 columns).
 * @param height - Height in rows.
 * @param drawEmptyBorder - If true, add an empty border column when the fractional part is close to 0 but not exactly 0.
 * @returns A Box containing the drawn block.
 */
export function drawRealWidthBlock(realWidth: number, height: number, drawEmptyBorder?: boolean): Box;
/** Draws a block with fractional height using 1/8th Unicode block characters.
 * @param width - Width in columns.
 * @param realHeight - Fractional height (e.g., 3.5 for 3.5 rows).
 * @param drawEmptyBorder - If true, add an empty border row when the fractional part is close to 0 but not exactly 0.
 * @returns A Box containing the drawn block.
 */
export function drawRealHeightBlock(width: number, realHeight: number, drawEmptyBorder?: boolean): Box;
