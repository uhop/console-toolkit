import style from '../../src/style.js';

let embeddedStyle = null;

console.log(
  'Embedded colors: ' +
    style.bg.bright.black.bold.bright.red.text(
      ' red ' + style.bg.blue.bold.bright.yellow.text(' yellow ') + ' back to red? '
    ) +
    ' - unstyled?'
);

console.log(
  'Embedded colors: ' +
    style.bg.bright.black.bold.bright.red
      .mark(s => (embeddedStyle = s))
      .text(' red ' + embeddedStyle.bg.blue.bold.bright.yellow.text(' yellow ') + ' back to red? ') +
    ' - unstyled?'
);

console.log(' ');

console.log(
  'Embedded colors: ' +
    style.bg.bright.black.bold.bright.red.text(
      ' style #1 ' + style.italic.bold.bright.yellow.text(' style #2 ') + ' style #1? '
    ) +
    ' - unstyled?'
);

console.log(
  'Embedded colors: ' +
    style.bg.bright.black.bold.bright.red
      .mark(s => (embeddedStyle = s))
      .text(' style #1 ' + embeddedStyle.italic.bold.bright.yellow.text(' style #2 ') + ' style #1? ') +
    ' - unstyled?'
);
