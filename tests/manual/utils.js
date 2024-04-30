import Box from '../../src/box.js';

export const drawStrings = strings => strings.forEach(line => console.log(line));

export const draw = (...boxes) => {
  if (!boxes.length) return;

  let result;
  for (const box of boxes) {
    const b = Box.make(box);
    result = result ? result.addRight(b.padLeft(2)) : b;
  }
  result && drawStrings(result.toStrings());
};

export const show = string =>
  console.log(
    string.replace(/[\x00-\x1F]/g, m => '\\x' + m[0].charCodeAt(0).toString(16).padStart(2, '0').toUpperCase())
  );
