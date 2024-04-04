import process from 'node:process';
import {matchCsiNoGroups} from './ansi/utils.js';

export const log = (s, endOfLineCommand = '\x1B[m', colorDepth = 24) => {
  if (typeof s == 'string') s = s.split(/\r?\n/g);
  if (s && typeof s == 'object' && typeof s.toBox == 'function') s = s.toBox('', ' ');
  if (colorDepth < 4) {
    s.forEach(row => console.log((row + endOfLineCommand).replace(matchCsiNoGroups, '')));
    return;
  }
  s.forEach(row => console.log(row + endOfLineCommand));
};

export const out = (s, stream = process.stdout, endOfLineCommand = '\x1B[m', colorDepth) => {
  if (typeof colorDepth != 'number') colorDepth = stream.isTTY ? stream.getColorDepth() : 1;
  if (typeof s == 'string') s = s.split(/\r?\n/g);
  if (s && typeof s == 'object' && typeof s.toBox == 'function') s = s.toBox('', ' ');
  if (colorDepth < 4) {
    s.forEach(row => stream.write((row + endOfLineCommand).replace(matchCsiNoGroups, '') + '\n'));
    return;
  }
  s.forEach(row => stream.write(row + endOfLineCommand + '\n'));
};

export class Out {
  constructor(stream) {
    this.stream = stream;
    this.colorDepth = stream.isTTY ? stream.getColorDepth() : 1;
  }
  out(s, endOfLineCommand = '\x1B[m', colorDepth) {
    if (typeof colorDepth != 'number') colorDepth = this.colorDepth;
    return out(s, this.stream, endOfLineCommand, colorDepth);
  }
}
