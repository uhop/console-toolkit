import Box from '../../src/Box.js';

export const drawBox = box => box.box.forEach(line => console.log(line));

export const draw = (...boxes) => {
  if (!boxes.length) return;

  let result;
  for (const box of boxes) {
    let b;
    if (box instanceof Box) {
      b = box;
    } else if (typeof box?.toBox == 'function') {
      b = box.toBox();
    } else {
      b = new Box(box);
    }
    result = result ? result.addRight(b.padLeft(2)) : b;
  }
  drawBox(result);
};

export const show = s =>
  console.log(s.replace(/[\x00-\x1F]/g, m => '\\x' + m[0].charCodeAt(0).toString(16).toUpperCase()));
