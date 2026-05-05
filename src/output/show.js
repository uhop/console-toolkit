import process from 'node:process';
import {matchCsiNoGroups} from '../strings.js';
import Box from '../box.js';

const writeRows = (s, endOfLineCommand, colorDepth, write) => {
  s = Box.make(s);
  if (colorDepth < 4) {
    matchCsiNoGroups.lastIndex = 0;
    s.box.forEach(row => write((row + endOfLineCommand).replace(matchCsiNoGroups, '')));
    return;
  }
  s.box.forEach(row => write(row + endOfLineCommand));
};

export const log = (s, {endOfLineCommand = '\x1B[m', colorDepth = 24} = {}) =>
  writeRows(s, endOfLineCommand, colorDepth, row => console.log(row));

export const out = (s, {stream = process.stdout, endOfLineCommand = '\x1B[m', colorDepth} = {}) => {
  if (typeof colorDepth != 'number' || isNaN(colorDepth)) colorDepth = stream.isTTY ? stream.getColorDepth() : 1;
  writeRows(s, endOfLineCommand, colorDepth, row => stream.write(row + '\n'));
};

export class Out {
  constructor(stream) {
    this.stream = stream;
    this.colorDepth = stream.isTTY ? stream.getColorDepth() : 1;
  }
  out(s, {endOfLineCommand = '\x1B[m', colorDepth} = {}) {
    if (typeof colorDepth != 'number' || isNaN(colorDepth)) colorDepth = this.colorDepth;
    return out(s, {stream: this.stream, endOfLineCommand, colorDepth});
  }
}

export const debug = string =>
  console.log(
    string.replace(/[\x00-\x1F]/g, m => '\\x' + m[0].charCodeAt(0).toString(16).padStart(2, '0').toUpperCase())
  );
