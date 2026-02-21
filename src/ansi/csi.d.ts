export * from './sgr.js';

export const matchCsi: RegExp;

export const CURSOR_UP1: string;
export const CURSOR_DOWN1: string;
export const CURSOR_FORWARD1: string;
export const CURSOR_BACK1: string;
export const CURSOR_NEXT_LINE1: string;
export const CURSOR_PREV_LINE1: string;
export const CURSOR_COLUMN1: string;
export const CURSOR_HOME: string;

export const CURSOR_GET_POS: string;
export const CURSOR_SAVE_POS: string;
export const CURSOR_RESTORE_POS: string;
export const CURSOR_NORMAL: string;
export const CURSOR_INVISIBLE: string;

export function cursorUp(n?: number): string;
export function cursorDown(n?: number): string;
export function cursorForward(n?: number): string;
export function cursorBack(n?: number): string;
export function cursorNextLine(n?: number): string;
export function cursorPrevLine(n?: number): string;
export function cursorColumn(n?: number): string;
export function cursorSetPos(n: number, m: number): string;
export function cursorSetPosAlt(n: number, m: number): string;

export const CURSOR_RIGHT1: string;
export const CURSOR_LEFT1: string;
export const cursorRight: typeof cursorForward;
export const cursorLeft: typeof cursorBack;

export const CLEAR_EOS: string;
export const CLEAR_BOS: string;
export const CLEAR_SCREEN: string;
export const CLEAR_SCREEN_ALL: string;
export const CLEAR_EOL: string;
export const CLEAR_BOL: string;
export const CLEAR_LINE: string;

export const SCREEN_SAVE: string;
export const SCREEN_RESTORE: string;
export const SCREEN_ALT_ON: string;
export const SCREEN_ALT_OFF: string;
export const SCREEN_SCROLL_UP1: string;
export const SCREEN_SCROLL_DOWN1: string;
export const SCREEN_REPORT_FOCUS_ON: string;
export const SCREEN_REPORT_FOCUS_OFF: string;

export function screenScrollUp(n?: number): string;
export function screenScrollDown(n?: number): string;

export const WRAPPING_ON: string;
export const WRAPPING_OFF: string;
export const BRACKETED_PASTE_ON: string;
export const BRACKETED_PASTE_OFF: string;
