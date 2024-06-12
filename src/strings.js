export const matchCsiNoGroups = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E]/g;
export const matchCsiNoSgrNoGroups = /\x1B\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x6C\x6E-\x7E]/g;

export const getLength = (s, matcher = matchCsiNoGroups) => {
  s = String(s);
  let counter = 0,
    start = 0;
  matcher.lastIndex = 0;
  for (const match of s.matchAll(matcher)) {
    counter += [...s.substring(start, match.index)].length;
    start = match.index + match[0].length;
  }
  counter += [...s.substring(start)].length;
  return counter;
};

export const getMaxLength = (strings, matcher = matchCsiNoGroups) =>
  Math.max(0, ...strings.map(s => getLength(s, matcher)));

export const clip = (s, width, includeLastCommand, matcher = matchCsiNoGroups) => {
  s = String(s);
  let counter = 0,
    start = 0;
  matcher.lastIndex = 0;
  for (const match of s.matchAll(matcher)) {
    if (counter >= width) return s.substring(0, match.index + (includeLastCommand ? match[0].length : 0));
    const prev = [...s.substring(start, match.index)];
    counter += prev.length;
    if (includeLastCommand ? counter > width : counter >= width) {
      const diff = width - counter,
        end = start + (diff ? prev.slice(0, prev.length + diff).join('').length : prev.length);
      return s.substring(0, end);
    }
    start = match.index + match[0].length;
  }
  if (counter >= width) return s.substring(0, start);
  const prev = [...s.substring(start)];
  if (counter + prev.length > width) {
    const end = start + prev.slice(0, width - counter).join('').length;
    return s.substring(0, end);
  }
  return s; // unchanged
};

export const clipStrings = (strings, width, includeLastCommand, matcher = matchCsiNoGroups) =>
  strings.map(s => clip(s, width, includeLastCommand, matcher));

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
        s = String(s);
        continue main;
    }
    break main;
  }
  return [];
};
