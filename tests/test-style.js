import test from 'tape-six';

import style, {Style} from '../src/style.js';

const log = s => console.log(s.replace(/[\x00-\x1F]/g), m => '\\x' + m[0].charCodeAt(0).toString(16).toUpperCase());

test('Styling', async t => {
  await t.test('One color output', t => {
    const s = style.cyan.text('cyan');
    t.equal(s, '\x1B[36mcyan\x1B[m');
  });
  await t.test('One color output (initial style is undefined)', t => {
    const s = new Style({}).cyan.text('cyan');
    t.equal(s, '\x1B[36mcyan');
  });
  await t.test('One color output (initial style is null)', t => {
    const s = new Style({foreground: null}).cyan.text('cyan');
    t.equal(s, '\x1B[36mcyan\x1B[39m');
  });
  await t.test('One color output (colorDepth = 24)', t => {
    const s = style.rgb(0, 255, 255).text('cyan');
    t.equal(s, '\x1B[38;2;0;255;255mcyan\x1B[m');
  });
  await t.test('One color output (colorDepth = 8)', t => {
    const s = style.setColorDepth(8).rgb(0, 255, 255).text('cyan');
    t.equal(s, '\x1B[38;5;51mcyan\x1B[m');
  });

  await t.test('Chain of colors', t => {
    const s = style.black.red.green.yellow.blue.magenta.cyan.white.text('white');
    t.equal(s, '\x1B[37mwhite\x1B[m');
  });
  await t.test('List of colors', t => {
    const s =
      style.black + style.red + style.green + style.yellow + style.blue + style.magenta + style.cyan + style.white;
    t.equal(s, '\x1B[30m\x1B[31m\x1B[32m\x1B[33m\x1B[34m\x1B[35m\x1B[36m\x1B[37m');
  });
  await t.test('List of bright colors', t => {
    const s =
      style.brightBlack +
      style.brightRed +
      style.brightGreen +
      style.brightYellow +
      style.brightBlue +
      style.brightMagenta +
      style.brightCyan +
      style.brightWhite;
    t.equal(s, '\x1B[90m\x1B[91m\x1B[92m\x1B[93m\x1B[94m\x1B[95m\x1B[96m\x1B[97m');
  });
  await t.test('List of background colors', t => {
    const s =
      style.bgBlack +
      style.bgRed +
      style.bgGreen +
      style.bgYellow +
      style.bgBlue +
      style.bgMagenta +
      style.bgCyan +
      style.bgWhite;
    t.equal(s, '\x1B[40m\x1B[41m\x1B[42m\x1B[43m\x1B[44m\x1B[45m\x1B[46m\x1B[47m');
  });
  await t.test('List of bright background colors', t => {
    const s =
      style.bgBrightBlack +
      style.bgBrightRed +
      style.bgBrightGreen +
      style.bgBrightYellow +
      style.bgBrightBlue +
      style.bgBrightMagenta +
      style.bgBrightCyan +
      style.bgBrightWhite;
    t.equal(s, '\x1B[100m\x1B[101m\x1B[102m\x1B[103m\x1B[104m\x1B[105m\x1B[106m\x1B[107m');
  });

  await t.test('List of commands', t => {
    const s =
      style.bold +
      style.dim +
      style.italic +
      style.underline +
      style.blink +
      style.rapidBlink +
      style.inverse +
      style.hidden +
      style.strikethrough +
      style.curlyUnderline +
      style.doubleUnderline +
      style.overline;
    t.equal(s, '\x1B[1m\x1B[2m\x1B[3m\x1B[4m\x1B[5m\x1B[6m\x1B[7m\x1B[8m\x1B[9m\x1B[4:3m\x1B[21m\x1B[53m');
  });
});
