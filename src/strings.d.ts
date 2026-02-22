import {ClipOptions} from './strings/clip.js';

/** Returns the display width of a string, ignoring ANSI escape sequences.
 * @param s - The string to measure.
 * @param matcher - RegExp for matching escape sequences (default: matchCsiNoGroups).
 * @returns The visible display width.
 */
export function getLength(s: string, matcher?: RegExp): number;
/** Returns the maximum display width among an array of strings.
 * @param strings - The strings to measure.
 * @param matcher - RegExp for matching escape sequences.
 * @returns The maximum display width.
 */
export function getMaxLength(strings: string[], matcher?: RegExp): number;
/** Clips each string in an array to a given display width.
 * @param strings - The strings to clip.
 * @param width - Maximum display width.
 * @param options - Clip options.
 * @returns The clipped strings.
 */
export function clipStrings(strings: string[], width: number, options?: ClipOptions): string[];

export type StringsValue =
  | null
  | undefined
  | boolean
  | number
  | string
  | string[]
  | object
  | {toStrings(): string[]}
  | {toBox(): {box: string[]}}
  | {toPanel(): {toStrings(): string[]}};
export type StringsFunction = () => StringsFunction | StringsValue;
export type StringsInput = StringsValue | StringsFunction;

/** Converts various input types to a string array.
 * @param s - Input: string, string array, Box, number, null/undefined, or object with `toStrings()`.
 * @returns An array of strings.
 */
export function toStrings(s: StringsInput): string[];

export {default as clip} from './strings/clip.js';
export {matchCsiNoGroups, matchCsiNoSgrNoGroups} from './strings/parse.js';
