// CSI (Control Sequence Introducer) commands definitions and helpers.
// CSI is a part of Fe Escape sequences.
// Type Fe is supported by C1 control codes.
// See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.
// SGR is in a separate file. See sgr.js.

const CSI = '\x1B[';

export const CURSOR_UP1 = CSI + 'A';
export const CURSOR_DOWN1 = CSI + 'B';
export const CURSOR_FORWARD1 = CSI + 'C';
export const CURSOR_BACK1 = CSI + 'D';
export const CURSOR_NEXT_LINE1 = CSI + 'E';
export const CURSOR_PREV_LINE1 = CSI + 'F';
export const CURSOR_COLUMN1 = CSI + 'G';
export const CURSOR_HOME = CSI + 'H';

export const cursorUp = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'A';
export const cursorDown = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'B';
export const cursorForward = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'C';
export const cursorBack = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'D';
export const cursorNextLine = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'E';
export const cursorPrevLine = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'F';
export const cursorColumn = (n = 1) => CSI + (n > 1 ? n.toFixed() : '') + 'G';
export const cursorSetPos = (n, m) => CSI + (n > 1 ? n.toFixed() : '') + ';' + (m > 1 ? m.toFixed() : '') + 'G';

// TODO: the rest of codes (clear and so on)
