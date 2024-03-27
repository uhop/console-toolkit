// ANSI escape code. See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.
// This is a collection of escape sequences that are not part of other files (e.g., CSI, SGR).

export * from './csi.js';

const ESC = '\x01B';

export const CURSOR_DELETE = '\x7f';

export const CURSOR_GO_UP1 = ESC + 'M';

export const CURSOR_SAVE = ESC + '7';
export const CURSOR_RESTORE = ESC + '8';

// export const CURSOR_GO_UP1 = ESC + 'M';
