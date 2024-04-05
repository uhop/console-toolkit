import {padBoxLeft} from '../../src/box/pad.js';
import {stackHorizontally} from '../../src/box/stack.js';

export const drawBox = box => box.forEach(line => console.log(line));

export const draw = (...boxes) => {
  if (!boxes.length) return;
  if (boxes.length == 1) return drawBox(boxes[0]);

  let result;
  for (const box of boxes) {
    result = result ? stackHorizontally(result, padBoxLeft(box, 2)) : box;
  }
  drawBox(result);
};

export const show = s =>
  console.log(s.replace(/[\x00-\x1F]/g, m => '\\x' + m[0].charCodeAt(0).toString(16).toUpperCase()));
