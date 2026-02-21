export * from './csi.js';

/** The ESC character (\x1B). */
export const ESC: string;

/** Deletes the character at the cursor. */
export const CURSOR_DELETE: string;

/** Moves cursor up 1 row (Fe sequence). */
export const CURSOR_GO_UP1: string;

/** Saves cursor position (Fe sequence). */
export const CURSOR_SAVE: string;
/** Restores cursor position (Fe sequence). */
export const CURSOR_RESTORE: string;

/** RegExp matching Fe escape sequences. */
export const matchFe: RegExp;
/** RegExp matching Fs escape sequences. */
export const matchFs: RegExp;
/** RegExp matching Fp escape sequences. */
export const matchFp: RegExp;
/** RegExp matching Nf escape sequences. */
export const matchNf: RegExp;
/** RegExp matching OSC escape sequences. */
export const matchOsc: RegExp;
