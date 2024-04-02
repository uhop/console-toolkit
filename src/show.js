import process from 'node:process';
import {matchCsiNoGroups} from './ansi/utils.js';

export const log = (s, endOfLineCommand = '\x1B[m', isMonochrome) => {
  if (typeof s == 'string') s = s.split(/\r?\n/g);
  if (s && typeof s == 'object' && typeof s.toBox == 'function') s = s.toBox('', ' ');
  if (isMonochrome) {
    s.forEach(row => console.log((row + endOfLineCommand).replace(matchCsiNoGroups, '')));
    return;
  }
  s.forEach(row => console.log(row + endOfLineCommand));
};

export const out = (s, stream = process.stdout, endOfLineCommand = '\x1B[m', isMonochrome) => {
  if (typeof isMonochrome != 'boolean') isMonochrome = !(stream.isTTY && stream.hasColors(256));
  if (typeof s == 'string') s = s.split(/\r?\n/g);
  if (s && typeof s == 'object' && typeof s.toBox == 'function') s = s.toBox('', ' ');
  if (isMonochrome) {
    s.forEach(row => stream.write((row + endOfLineCommand).replace(matchCsiNoGroups, '') + '\n'));
    return;
  }
  s.forEach(row => stream.write(row + endOfLineCommand + '\n'));
};

export class Out {
  constructor(stream) {
    this.stream = stream;
    this.isMonochrome = !(stream.isTTY && stream.hasColors(256));
  }
  out(s, endOfLineCommand = '\x1B[m', isMonochrome) {
    if (typeof isMonochrome != 'boolean') isMonochrome = this.isMonochrome;
    return out(s, this.stream, endOfLineCommand, isMonochrome);
  }
}
