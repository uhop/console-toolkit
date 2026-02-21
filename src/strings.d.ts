import { ClipOptions } from './strings/clip.js';

/** Returns the display width of a string, ignoring ANSI escape sequences. */
export function getLength(s: string, matcher?: RegExp): number;
/** Returns the maximum display width among an array of strings. */
export function getMaxLength(strings: string[], matcher?: RegExp): number;
/** Clips each string in an array to a given display width. */
export function clipStrings(strings: string[], width: number, options?: ClipOptions): string[];
/** Converts various input types to a string array. */
export function toStrings(s: any): string[];

export { default as clip } from './strings/clip.js';
export { matchCsiNoGroups, matchCsiNoSgrNoGroups } from './strings/parse.js';
