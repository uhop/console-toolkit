import style from '../../src/style.js';

console.log(
  `Colors: ${style.bold.bright.white.bg.brightBlack.text(' bg.brightBlack ')}${style.bold.bright.white.bg.gray.text(
    ' bg.gray '
  )}${style.bold.bright.white.bg.grey.text(' bg.grey ')}${style.bold.bright.white.bgBrightBlack.text(
    ' bgBrightBlack '
  )}${style.bold.bright.white.bgGray.text(' bgGray ')}${style.bold.bright.white.bgGrey.text(
    ' bgGrey '
  )}${style.bold.bright.white.bgRgb6(1, 1, 1).text(' bgRgb6(1,1,1) ')}${style.bold.bright.white
    .bgGrayscale24(7)
    .text(' bgGrayscale24(7) ')}.`
);
