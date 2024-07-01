import {size} from './strings/split.js';
import parse, {matchCsiNoGroups, matchCsiNoSgrNoGroups} from './strings/parse.js';
import clip from './strings/clip.js';

export const getLength = (s, options) => {
  let counter = 0;
  for (const {string} of parse(s, options)) {
    counter += size(string);
  }
  return counter;
};

export const getMaxLength = (strings, options) =>
  strings.reduce((acc, s) => Math.max(acc, getLength(s, options)), 0);

export const clipStrings = (strings, width, options) =>
  strings.map(s => clip(s, width, options));

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
