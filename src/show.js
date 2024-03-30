import {matchCsiNoGroups} from './utils.js';

export const log = (s, endOfLineCommand = '\x1B[m', isMonochrome) => {
  if (typeof s == 'string') s = s.split(/\r?\n/g);
  if (s && typeof s == 'object' && typeof s.toBox == 'function') s = s.toBox('', ' ');
  s.forEach(row => {
    if (isMonochrome) row = (row + endOfLineCommand).replace(matchCsiNoGroups, '');
    console.log(row);
  });
};
