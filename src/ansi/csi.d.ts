export * from './sgr.js';

/** RegExp matching CSI (Control Sequence Introducer) escape sequences. */
export const matchCsi: RegExp;

/** Moves cursor up 1 row. */
export const CURSOR_UP1: string;
/** Moves cursor down 1 row. */
export const CURSOR_DOWN1: string;
/** Moves cursor forward 1 column. */
export const CURSOR_FORWARD1: string;
/** Moves cursor back 1 column. */
export const CURSOR_BACK1: string;
/** Moves cursor to beginning of next line. */
export const CURSOR_NEXT_LINE1: string;
/** Moves cursor to beginning of previous line. */
export const CURSOR_PREV_LINE1: string;
/** Moves cursor to column 1. */
export const CURSOR_COLUMN1: string;
/** Moves cursor to home position (1,1). */
export const CURSOR_HOME: string;

/** Requests cursor position report. */
export const CURSOR_GET_POS: string;
/** Saves cursor position. */
export const CURSOR_SAVE_POS: string;
/** Restores saved cursor position. */
export const CURSOR_RESTORE_POS: string;
/** Shows the cursor. */
export const CURSOR_NORMAL: string;
/** Hides the cursor. */
export const CURSOR_INVISIBLE: string;

/** Moves the cursor up by `n` rows.
 * @param n - Number of rows (default: 1).
 * @returns CSI escape sequence.
 */
export function cursorUp(n?: number): string;
/** Moves the cursor down by `n` rows.
 * @param n - Number of rows (default: 1).
 * @returns CSI escape sequence.
 */
export function cursorDown(n?: number): string;
/** Moves the cursor forward by `n` columns.
 * @param n - Number of columns (default: 1).
 * @returns CSI escape sequence.
 */
export function cursorForward(n?: number): string;
/** Moves the cursor back by `n` columns.
 * @param n - Number of columns (default: 1).
 * @returns CSI escape sequence.
 */
export function cursorBack(n?: number): string;
/** Moves cursor to beginning of line `n` lines down.
 * @param n - Number of lines (default: 1).
 * @returns CSI escape sequence.
 */
export function cursorNextLine(n?: number): string;
/** Moves cursor to beginning of line `n` lines up.
 * @param n - Number of lines (default: 1).
 * @returns CSI escape sequence.
 */
export function cursorPrevLine(n?: number): string;
/** Moves cursor to column `n`.
 * @param n - Column number (default: 1).
 * @returns CSI escape sequence.
 */
export function cursorColumn(n?: number): string;
/** Sets the cursor to row `n`, column `m` (1-based).
 * @param n - Row.
 * @param m - Column.
 * @returns CSI escape sequence.
 */
export function cursorSetPos(n: number, m: number): string;
/** Sets the cursor position (alternative sequence).
 * @param n - Row.
 * @param m - Column.
 * @returns CSI escape sequence.
 */
export function cursorSetPosAlt(n: number, m: number): string;

/** Alias for CURSOR_FORWARD1. */
export const CURSOR_RIGHT1: string;
/** Alias for CURSOR_BACK1. */
export const CURSOR_LEFT1: string;
/** Alias for cursorForward. */
export const cursorRight: typeof cursorForward;
/** Alias for cursorBack. */
export const cursorLeft: typeof cursorBack;

/** Clears from cursor to end of screen. */
export const CLEAR_EOS: string;
/** Clears from cursor to beginning of screen. */
export const CLEAR_BOS: string;
/** Clears the entire screen. */
export const CLEAR_SCREEN: string;
/** Clears the entire screen and scrollback buffer. */
export const CLEAR_SCREEN_ALL: string;
/** Clears from cursor to end of line. */
export const CLEAR_EOL: string;
/** Clears from cursor to beginning of line. */
export const CLEAR_BOL: string;
/** Clears the entire line. */
export const CLEAR_LINE: string;

/** Saves the screen state. */
export const SCREEN_SAVE: string;
/** Restores the screen state. */
export const SCREEN_RESTORE: string;
/** Enables the alternative screen buffer. */
export const SCREEN_ALT_ON: string;
/** Disables the alternative screen buffer. */
export const SCREEN_ALT_OFF: string;
/** Scrolls screen up 1 line. */
export const SCREEN_SCROLL_UP1: string;
/** Scrolls screen down 1 line. */
export const SCREEN_SCROLL_DOWN1: string;
/** Enables focus reporting. */
export const SCREEN_REPORT_FOCUS_ON: string;
/** Disables focus reporting. */
export const SCREEN_REPORT_FOCUS_OFF: string;

/** Scrolls the screen up by `n` lines.
 * @param n - Number of lines (default: 1).
 * @returns CSI escape sequence.
 */
export function screenScrollUp(n?: number): string;
/** Scrolls the screen down by `n` lines.
 * @param n - Number of lines (default: 1).
 * @returns CSI escape sequence.
 */
export function screenScrollDown(n?: number): string;

/** Enables line wrapping. */
export const WRAPPING_ON: string;
/** Disables line wrapping. */
export const WRAPPING_OFF: string;
/** Enables bracketed paste mode. */
export const BRACKETED_PASTE_ON: string;
/** Disables bracketed paste mode. */
export const BRACKETED_PASTE_OFF: string;
