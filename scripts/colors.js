import style from '../src/style.js';
import {draw} from '../tests/manual/utils.js';

console.log(style.bold.text('DEPTH=4 COLORS=16') + '\n');

let s = '';
for (let i = 0; i < 2; ++i) {
  for (let j = 0; j < 2; ++j) {
    for (let k = 0; k < 2; ++k) {
      s += style.bg.stdRgb(k, j, i).text('  ');
    }
  }
}
console.log('Normal colors:', s);

s = '';
for (let i = 0; i < 2; ++i) {
  for (let j = 0; j < 2; ++j) {
    for (let k = 0; k < 2; ++k) {
      s += style.bg.bright.stdRgb(k, j, i).text('  ');
    }
  }
}
console.log('Bright colors:', s);

console.log('\n' + style.bold.text('DEPTH=8 COLORS=256') + '\n');

s = '';
for (let i = 0; i < 2; ++i) {
  for (let j = 0; j < 2; ++j) {
    for (let k = 0; k < 2; ++k) {
      s += style.bg.stdRgb256(k, j, i).text('  ');
    }
  }
}
console.log('Normal colors:', s);

s = '';
for (let i = 0; i < 2; ++i) {
  for (let j = 0; j < 2; ++j) {
    for (let k = 0; k < 2; ++k) {
      s += style.bg.bright.stdRgb256(k, j, i).text('  ');
    }
  }
}
console.log('Bright colors:', s);

console.log('\nColor cube 6 * 6 * 6 (216 colors):');

const boxes = [];
for (let i = 0; i < 6; ++i) {
  const box = [];
  for (let j = 0; j < 6; ++j) {
    let s = '';
    for (let k = 0; k < 6; ++k) {
      s += style.bg.rgb6(k, j, i).text('  ');
    }
    box.push(s);
  }
  boxes.push(box);
}
draw(...boxes);

s = '';
for (let i = 0; i < 24; ++i) {
  s += style.bg.grayscale24(i).text('  ');
}
console.log('\nGrayscale:', s);

console.log('\nSelect color cube colors:');
console.log(
  'Black:',
  style.bg.rgb6(0, 0, 0).text('  '),
  'Red:',
  style.bg.rgb6(5, 0, 0).text('  '),
  'Green:',
  style.bg.rgb6(0, 5, 0).text('  '),
  'Yellow:',
  style.bg.rgb6(5, 5, 0).text('  '),
  'Blue:',
  style.bg.rgb6(0, 0, 5).text('  '),
  'Magenta:',
  style.bg.rgb6(5, 0, 5).text('  '),
  'Cyan:',
  style.bg.rgb6(0, 5, 5).text('  '),
  'White:',
  style.bg.rgb6(5, 5, 5).text('  ')
);

s = '';
for (let i = 0; i < 6; ++i) {
  s += style.bg.rgb6(i, i, i).text('  ');
}
console.log('Grayscale:', s);

console.log('\n' + style.bold.text('DEPTH=24 COLORS=16,777,216') + '\n');

s = '';
for (let i = 0; i < 256; i += 4) {
  s += style.bg.trueGrayscale(i).text(' ');
}
console.log('Grayscale:  ', s);

s = '';
for (let i = 0; i < 256; i += 4) {
  s += style.bg.trueColor(i, 0, 0).text(' ');
}
console.log('Red scale:  ', s);

s = '';
for (let i = 0; i < 256; i += 4) {
  s += style.bg.trueColor(0, i, 0).text(' ');
}
console.log('Green scale:', s);

s = '';
for (let i = 0; i < 256; i += 4) {
  s += style.bg.trueColor(0, 0, i).text(' ');
}
console.log('Blue scale: ', s);

s = '';
for (let i = 0; i < 256; i += 4) {
  const rgb = hueToRgb(i / 256);
  s += style.bg.trueColor(...rgb).text(' ');
}
console.log('Color range:', s);

// utilities

function hToRgb(h) {
  const i = Math.floor(h * 6),
    f = h * 6 - i,
    q = 1 - f;
  switch (i % 6) {
    case 0:
      return [1, f, 0];
    case 1:
      return [q, 1, 0];
    case 2:
      return [0, 1, f];
    case 3:
      return [0, q, 1];
    case 4:
      return [f, 0, 1];
  }
  return [1, 0, q];
}

function hueToRgb(h) {
  return hToRgb(h).map(value => Math.round(value * 255));
}
