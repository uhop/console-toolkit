import process from 'node:process';
import {matchCsiNoGroups} from './strings.js';
import Box from './box.js';

const toBox = s => {
  if (s instanceof Box) return s;
  if (s && typeof s == 'object' && typeof s.toBox == 'function') {
    return s.toBox(' ');
  }
  return new Box(s);
};

export const log = (s, {endOfLineCommand = '\x1B[m', colorDepth = 24} = {}) => {
  s = toBox(s);
  if (colorDepth < 4) {
    s.box.forEach(row => console.log((row + endOfLineCommand).replace(matchCsiNoGroups, '')));
    return;
  }
  s.box.forEach(row => console.log(row + endOfLineCommand));
};

export const out = (s, {stream = process.stdout, endOfLineCommand = '\x1B[m', colorDepth} = {}) => {
  s = toBox(s);
  if (typeof colorDepth != 'number') colorDepth = stream.isTTY ? stream.getColorDepth() : 1;
  if (colorDepth < 4) {
    s.box.forEach(row => stream.write((row + endOfLineCommand).replace(matchCsiNoGroups, '') + '\n'));
    return;
  }
  s.box.forEach(row => stream.write(row + endOfLineCommand + '\n'));
};

export class Out {
  constructor(stream) {
    this.stream = stream;
    this.colorDepth = stream.isTTY ? stream.getColorDepth() : 1;
  }
  out(s, {endOfLineCommand = '\x1B[m', colorDepth} = {}) {
    if (typeof colorDepth != 'number') colorDepth = this.colorDepth;
    return out(s, this.stream, endOfLineCommand, colorDepth);
  }
}
