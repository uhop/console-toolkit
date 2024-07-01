import parse, {matchCsiNoGroups} from './parse.js';
import {split} from './split.js';

export const clip = (s, width, options = {}) => {
  if (width <= 0) return '';

  const {includeLastCommand = false, matcher = matchCsiNoGroups} = options;

  let counter = 0;
  for (const {start, string, match} of parse(s, matcher)) {
    if (counter >= width) return match ? s.substring(0, match.index + (includeLastCommand ? match[0].length : 0)) : s;
    const prev = split(string, options);
    counter += prev.width;
    if (includeLastCommand ? counter > width : counter >= width) {
      let result = '';
      for (const grapheme of prev.graphemes) {
        if (result.length + grapheme.width > width) break;
        result += grapheme.symbol;
      }
      return s.substring(0, start) + result;
    }
  }

  return s;
};

export default clip;
