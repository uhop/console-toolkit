import parse, {matchCsiNoGroups} from './parse.js';
import {split} from './split.js';

/** Clips a string to a specified display width, correctly handling ANSI escape codes and multi-width characters.
 * @param {string} s - The string to clip.
 * @param {number} width - The maximum display width.
 * @param {object} [options] - Options.
 * @param {boolean} [options.includeLastCommand=false] - If true, include the last (invisible) ANSI command in the clipped result.
 * @param {RegExp} [options.matcher=matchCsiNoGroups] - The regular expression used to match escape sequences.
 * @param {boolean} [options.ignoreControlSymbols] - If true, control symbols are ignored during width calculation.
 * @param {boolean} [options.ambiguousAsWide] - If true, ambiguous East Asian characters are treated as double-wide.
 * @returns {string} The clipped string.
 */
export const clip = (s, width, options = {}) => {
  const {includeLastCommand = false, matcher = matchCsiNoGroups} = options;

  let counter = 0;
  for (const {start, string, match} of parse(s, matcher)) {
    if (counter >= width)
      return match ? s.substring(0, match.index + (includeLastCommand ? match[0].length : 0)) : s.substring(0, start);
    const prev = split(string, options),
      newCounter = counter + prev.width;
    if (newCounter === width)
      return match ? s.substring(0, match.index + (includeLastCommand ? match[0].length : 0)) : s;
    if (newCounter < width) {
      counter = newCounter;
      continue;
    }
    let result = '';
    for (const grapheme of prev.graphemes) {
      if (counter + grapheme.width > width) break;
      result += grapheme.symbol;
      counter += grapheme.width;
    }
    return s.substring(0, start) + result;
  }

  return s;
};

export default clip;
