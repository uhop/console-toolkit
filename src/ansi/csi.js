// CSI (Control Sequence Introducer) commands definitions and helpers.
// CSI is a part of Fe Escape sequences.
// Type Fe is supported by C1 control codes.
// See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.
// SGR is in a separate file. See sgr.js.

export * from './sgr.js';

// matcher
/** RegExp matching CSI (Control Sequence Introducer) escape sequences with parameter, intermediate, and final byte groups.
 * @type {RegExp}
 */
export const matchCsi = /\x1B\[([\x30-\x3F]*)([\x20-\x2F]*)([\x40-\x7E])/g;

const CSI = '\x1B[';

export const CURSOR_UP1 = CSI + 'A';
export const CURSOR_DOWN1 = CSI + 'B';
export const CURSOR_FORWARD1 = CSI + 'C';
export const CURSOR_BACK1 = CSI + 'D';
export const CURSOR_NEXT_LINE1 = CSI + 'E';
export const CURSOR_PREV_LINE1 = CSI + 'F';
export const CURSOR_COLUMN1 = CSI + 'G';
export const CURSOR_HOME = CSI + 'H';

export const CURSOR_GET_POS = CSI + '6n';
export const CURSOR_SAVE_POS = CSI + 's';
export const CURSOR_RESTORE_POS = CSI + 'u';
export const CURSOR_NORMAL = CSI + '?25h';
export const CURSOR_INVISIBLE = CSI + '?25l';

/** Moves the cursor up by `n` rows.
 * @param {number} [n=1]
 * @returns {string} CSI sequence.
 */
export const cursorUp = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'A';
/** Moves the cursor down by `n` rows.
 * @param {number} [n=1]
 * @returns {string} CSI sequence.
 */
export const cursorDown = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'B';
/** Moves the cursor forward by `n` columns.
 * @param {number} [n=1]
 * @returns {string} CSI sequence.
 */
export const cursorForward = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'C';
/** Moves the cursor back by `n` columns.
 * @param {number} [n=1]
 * @returns {string} CSI sequence.
 */
export const cursorBack = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'D';
export const cursorNextLine = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'E';
export const cursorPrevLine = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'F';
export const cursorColumn = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'G';
/** Sets the cursor to row `n`, column `m` (1-based).
 * @param {number} n - Row.
 * @param {number} m - Column.
 * @returns {string} CSI sequence.
 */
export const cursorSetPos = (n, m) => CSI + (n > 1 ? n.toFixed() : '') + ';' + (m > 1 ? m.toFixed() : '') + 'H';
export const cursorSetPosAlt = (n, m) => CSI + (n > 1 ? n.toFixed() : '') + ';' + (m > 1 ? m.toFixed() : '') + 'f'; // HVP

export const CURSOR_RIGHT1 = CURSOR_FORWARD1;
export const CURSOR_LEFT1 = CURSOR_BACK1;
export const cursorRight = cursorForward;
export const cursorLeft = cursorBack;

export const CLEAR_EOS = CSI + 'J';
export const CLEAR_BOS = CSI + '1J';
export const CLEAR_SCREEN = CSI + '2J';
export const CLEAR_SCREEN_ALL = CSI + '3J'; // includes the scrollback buffer
export const CLEAR_EOL = CSI + 'K';
export const CLEAR_BOL = CSI + '1K';
export const CLEAR_LINE = CSI + '2K';

export const SCREEN_SAVE = CSI + '?47h';
export const SCREEN_RESTORE = CSI + '?47l';
export const SCREEN_ALT_ON = CSI + '?1049h'; // alternative screen buffer
export const SCREEN_ALT_OFF = CSI + '?1049l';
export const SCREEN_SCROLL_UP1 = CSI + 'S';
export const SCREEN_SCROLL_DOWN1 = CSI + 'T';
export const SCREEN_REPORT_FOCUS_ON = CSI + '?1004h';
export const SCREEN_REPORT_FOCUS_OFF = CSI + '?1004l';

/** Scrolls the screen up by `n` lines.
 * @param {number} [n=1]
 * @returns {string} CSI sequence.
 */
export const screenScrollUp = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'S';
/** Scrolls the screen down by `n` lines.
 * @param {number} [n=1]
 * @returns {string} CSI sequence.
 */
export const screenScrollDown = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'T';

export const WRAPPING_ON = CSI + '=7h';
export const WRAPPING_OFF = CSI + '=7l';
export const BRACKETED_PASTE_ON = CSI + '?2004h';
export const BRACKETED_PASTE_OFF = CSI + '?2004l';
