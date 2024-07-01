import parse, {matchCsiNoGroups} from './parse.js';
import {split} from './split.js';

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
