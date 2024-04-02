// ANSI escape code. See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.
// This is a collection of escape sequences that are not part of other files (e.g., CSI, SGR).

export * from './csi.js';
export * from './utils.js';

export const ESC = '\x1B';

export const CURSOR_DELETE = '\x7F';

export const CURSOR_GO_UP1 = ESC + 'M';

export const CURSOR_SAVE = ESC + '7';
export const CURSOR_RESTORE = ESC + '8';

// matchers
export const matchFe = /\x1B([\x40-\x5F])/g;
export const matchFs = /\x1B([\x60-\x7E])/g;
export const matchFp = /\x1B([\x30-\x3F])/g;
export const matchNf = /\x1B([\x20-\x2F]+)([\x30-\x7E])/g;
export const matchOsc = /\x1B\]([\x20-\x7E]*)([\x07\x9C]|\x1B\x5C)/g;
