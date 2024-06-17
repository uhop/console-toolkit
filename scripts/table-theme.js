import process from 'node:process';

import Box from 'console-painter/box.js';
import makeTable from 'console-painter/table';

if (process.argv.length < 3) {
  console.log('Usage: node table-theme.js <theme-name>');
  console.log('Example: node table-theme.js lines/unicode.js');
  process.exit(1);
}

const lineTheme = (await import(new URL(`../src/themes/${process.argv[2]}`, import.meta.url))).default;

const drawStrings = strings => strings.forEach(line => console.log(line));

const draw = (...boxes) => {
  if (!boxes.length) return;

  let result;
  for (const box of boxes) {
    const b = Box.make(box);
    result = result ? result.addRight(b.padLeft(2)) : b;
  }
  result && drawStrings(result.toStrings());
};

const availableSubThemes = Object.keys(lineTheme)
  .filter(name => name.startsWith('t_'))
  .sort((a, b) => a.localeCompare(b))
  .map(name => /^t_([^_]+)_(.+)$/.exec(name));

const boxes = [];

const data = [
  ['lt', 'rt'],
  ['lb', 'rb']
];

for (const [_, a, b] of availableSubThemes) {
  const box = new Box(`h: ${b} - v: ${a}`).addBottom(makeTable(data, lineTheme, {hTheme: b, vTheme: a}));
  boxes.push(box);
}

console.log(`Theme: ${process.argv[2]}\n`);
draw(...boxes);
