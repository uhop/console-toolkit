import style from '../../src/style.js';

console.log(
  'Embedded colors: ' +
    style.bg.bright.black.bold.bright.red.text(
      ' red ' + style.bg.blue.bold.bright.yellow.text(' yellow ') + ' back to red? '
    ) +
    ' - unstyled?'
);
