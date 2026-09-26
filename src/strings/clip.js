// @ts-self-types="./clip.d.ts"
import parse, {matchCsiNoGroups} from './parse.js';
import {split} from './split.js';
import {extractState, stateTransition, stringifyCommands} from '../ansi/sgr-state.js';

const clipPrefix = (s, width, options) => {
  const {includeLastCommand = false, matcher = matchCsiNoGroups} = options;

  let counter = 0;
  for (const {start, string, match} of parse(s, matcher)) {
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

export const clip = (s, width, options = {}) => {
  const result = clipPrefix(s, width, options);
  if (!options.preserveState || result.length === s.length) return result;
  // the result is always a prefix of s
  const state = extractState(result);
  return result + stringifyCommands(stateTransition(state, extractState(s.substring(result.length), state)));
};

export default clip;
