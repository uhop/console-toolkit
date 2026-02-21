import { ClipOptions } from './strings/clip.js';

export function getLength(s: string, matcher?: RegExp): number;
export function getMaxLength(strings: string[], matcher?: RegExp): number;
export function clipStrings(strings: string[], width: number, options?: ClipOptions): string[];
export function toStrings(s: any): string[];

export { default as clip } from './strings/clip.js';
export { matchCsiNoGroups, matchCsiNoSgrNoGroups } from './strings/parse.js';
