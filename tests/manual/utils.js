import Box from '../../src/Box.js';

export const drawBox = box => box.box.forEach(line => console.log(line));

export const draw = (...boxes) => {
  if (!boxes.length) return;
  if (boxes.length == 1) return drawBox(new Box(boxes[0]).box);

  let result;
  for (const box of boxes) {
    result = result ? result.addRight(new Box(box).padLeft(2)) : new Box(box);
  }
  drawBox(result);
};

export const show = s =>
  console.log(s.replace(/[\x00-\x1F]/g, m => '\\x' + m[0].charCodeAt(0).toString(16).toUpperCase()));
