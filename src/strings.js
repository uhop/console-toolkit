import {size} from './strings/split.js';
import parse, {matchCsiNoGroups, matchCsiNoSgrNoGroups} from './strings/parse.js';
import clip from './strings/clip.js';

/** Returns the visible display length of a string, excluding invisible ANSI escape sequences
 * and correctly handling Unicode code points that span multiple UTF-16 items.
 * @param {string} s - The string to measure.
 * @param {RegExp} [matcher=matchCsiNoGroups] - The regular expression used to match escape sequences.
 * @returns {number} The visible display length.
 */
export const getLength = (s, matcher) => {
  let counter = 0;
  for (const {string} of parse(s, matcher)) {
    counter += size(string);
  }
  return counter;
};

/** Returns the maximum visible display length among an array of strings.
 * @param {string[]} strings - The strings to measure.
 * @param {RegExp} [matcher=matchCsiNoGroups] - The regular expression used to match escape sequences.
 * @returns {number} The maximum visible display length.
 */
export const getMaxLength = (strings, matcher) => strings.reduce((acc, s) => Math.max(acc, getLength(s, matcher)), 0);

/** Clips each string in an array to a specified display width.
 * @param {string[]} strings - The strings to clip.
 * @param {number} width - The maximum display width.
 * @param {object} [options] - Options passed to `clip()`.
 * @returns {string[]} The clipped strings.
 */
export const clipStrings = (strings, width, options) => strings.map(s => clip(s, width, options));

/** Converts a variety of inputs into an array of strings (the simplest text container).
 *
 * - A function is called (up to 10 times) and its result is re-processed.
 * - A number or boolean returns `[String(s)]`.
 * - A string is split by newlines.
 * - An array is shallow-copied.
 * - An object with `toStrings()` is called.
 * - An object with `toBox()` returns `toBox().box`.
 * - An object with `toPanel()` returns `toPanel().toStrings()`.
 * - Other non-null objects are converted via `String()`.
 * - Null/undefined returns `[]`.
 *
 * @param {*} s - The input to convert.
 * @returns {string[]} An array of strings.
 */
export const toStrings = s => {
  main: for (;;) {
    switch (typeof s) {
      case 'function':
        for (let i = 0; i < 10 && typeof s == 'function'; ++i) s = s();
        if (typeof s == 'function') s = String(s);
        continue main;
      case 'number':
      case 'boolean':
        return [String(s)];
      case 'string':
        return String(s).split(/\r?\n/g);
      case 'object':
        if (Array.isArray(s)) return [...s];
        if (!s) break main;
        if (typeof s.toStrings == 'function') return s.toStrings();
        if (typeof s.toBox == 'function') return s.toBox().box;
        if (typeof s.toPanel == 'function') return s.toPanel().toStrings();
        s = String(s);
        continue main;
    }
    break main;
  }
  return [];
};

export {clip, matchCsiNoGroups, matchCsiNoSgrNoGroups};
