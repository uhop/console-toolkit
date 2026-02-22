import process from 'node:process';
import {matchCsiNoGroups} from '../strings.js';
import Box from '../box.js';

/** Logs a text container to the console via `console.log()`. Strips ANSI codes if colorDepth < 4.
 * @param {*} s - Input convertible to a Box.
 * @param {object} [options] - Options.
 * @param {string} [options.endOfLineCommand='\x1B[m'] - ANSI command appended to each line.
 * @param {number} [options.colorDepth=24] - Color depth (1 = no color, 4/8/24 = color).
 */
export const log = (s, {endOfLineCommand = '\x1B[m', colorDepth = 24} = {}) => {
  s = Box.make(s);
  if (colorDepth < 4) {
    matchCsiNoGroups.lastIndex = 0;
    s.box.forEach(row => console.log((row + endOfLineCommand).replace(matchCsiNoGroups, '')));
    return;
  }
  s.box.forEach(row => console.log(row + endOfLineCommand));
};

/** Writes a text container to a stream. Strips ANSI codes if colorDepth < 4.
 * @param {*} s - Input convertible to a Box.
 * @param {object} [options] - Options.
 * @param {import('node:stream').Writable} [options.stream=process.stdout] - The output stream.
 * @param {string} [options.endOfLineCommand='\x1B[m'] - ANSI command appended to each line.
 * @param {number} [options.colorDepth] - Color depth. Auto-detected from stream if not specified.
 */
export const out = (s, {stream = process.stdout, endOfLineCommand = '\x1B[m', colorDepth} = {}) => {
  s = Box.make(s);
  if (typeof colorDepth != 'number' || isNaN(colorDepth)) colorDepth = stream.isTTY ? stream.getColorDepth() : 1;
  if (colorDepth < 4) {
    matchCsiNoGroups.lastIndex = 0;
    s.box.forEach(row => stream.write((row + endOfLineCommand).replace(matchCsiNoGroups, '') + '\n'));
    return;
  }
  s.box.forEach(row => stream.write(row + endOfLineCommand + '\n'));
};

/** Convenience wrapper around a writable stream for formatted output.
 * Auto-detects color depth from the stream.
 */
export class Out {
  /**
   * @param {import('node:stream').Writable} stream - The writable stream to wrap.
   */
  constructor(stream) {
    this.stream = stream;
    this.colorDepth = stream.isTTY ? stream.getColorDepth() : 1;
  }
  /** Writes a text container to the stream.
   * @param {*} s - Input convertible to a Box.
   * @param {object} [options] - Options.
   * @param {string} [options.endOfLineCommand='\x1B[m'] - ANSI command appended to each line.
   * @param {number} [options.colorDepth] - Color depth override.
   */
  out(s, {endOfLineCommand = '\x1B[m', colorDepth} = {}) {
    if (typeof colorDepth != 'number' || isNaN(colorDepth)) colorDepth = this.colorDepth;
    return out(s, {stream: this.stream, endOfLineCommand, colorDepth});
  }
}

/** Logs a string with control characters visualized as hex escape sequences.
 * @param {string} string - The string to debug.
 */
export const debug = string =>
  console.log(
    string.replace(/[\x00-\x1F]/g, m => '\\x' + m[0].charCodeAt(0).toString(16).padStart(2, '0').toUpperCase())
  );
