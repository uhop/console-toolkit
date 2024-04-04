import {padBoxLeft} from '../../src/box/pad.js';
import {stackHorizontally} from '../../src/box/stack.js';

export const draw = (...boxes) => {
  let result;
  for (const box of boxes) {
    result = result ? stackHorizontally(result, padBoxLeft(box, 2)) : box;
  }
  result.forEach(line => console.log(line));
};
