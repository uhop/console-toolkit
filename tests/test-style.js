import test from 'tape-six';

import style, {Style} from '../src/style.js';

test('Styling', async t => {
  await t.test('One color output', t => {
    const s = style.cyan.text('cyan');
    t.equal(s, '\x1B[36mcyan\x1B[39m');
  });
  await t.test('One color output (initial style is undefined)', t => {
    const s = new Style({}).cyan.text('cyan');
    t.equal(s, '\x1B[36mcyan\x1B[39m');
  });
  await t.test('One color output (initial style is null)', t => {
    const s = new Style({foreground: null}).cyan.text('cyan');
    t.equal(s, '\x1B[36mcyan\x1B[39m');
  });
  await t.test('One color output (colorDepth = 24)', t => {
    const s = style.rgb(0, 255, 255).text('cyan');
    t.equal(s, '\x1B[38;2;0;255;255mcyan\x1B[39m');
  });
  await t.test('One color output (colorDepth = 8)', t => {
    const s = style.setColorDepth(8).rgb(0, 255, 255).text('cyan');
    t.equal(s, '\x1B[38;5;51mcyan\x1B[39m');
  });

  await t.test('Chain of colors', t => {
    const s = style.black.red.green.yellow.blue.magenta.cyan.white.text('white');
    t.equal(s, '\x1B[37mwhite\x1B[39m');
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
  await t.test('List of dark colors', t => {
    const s =
      style.darkBlack +
      style.darkRed +
      style.darkGreen +
      style.darkYellow +
      style.darkBlue +
      style.darkMagenta +
      style.darkCyan +
      style.darkWhite;
    t.equal(s, '\x1B[30m\x1B[31m\x1B[32m\x1B[33m\x1B[34m\x1B[35m\x1B[36m\x1B[37m');
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
  await t.test('List of dark background colors', t => {
    const s =
      style.bgDarkBlack +
      style.bgDarkRed +
      style.bgDarkGreen +
      style.bgDarkYellow +
      style.bgDarkBlue +
      style.bgDarkMagenta +
      style.bgDarkCyan +
      style.bgDarkWhite;
    t.equal(s, '\x1B[40m\x1B[41m\x1B[42m\x1B[43m\x1B[44m\x1B[45m\x1B[46m\x1B[47m');
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

  await t.test('List of color defaults', t => {
    const style = new Style({}),
      s = style.defaultColor + style.bgDefaultColor + style.decorationDefaultColor;
    t.equal(s, '\x1B[39m\x1B[49m\x1B[59m');
  });
  await t.test('List of color resets', t => {
    const style = new Style({}),
      s = style.reset.color + style.reset.bgColor + style.reset.decorationColor + style.reset.all;
    t.equal(s, '\x1B[39m\x1B[49m\x1B[59m\x1B[m');
  });

  await t.test('Named colors vs. RGB', t => {
    t.equal(style.black + '', style.stdRgb(0, 0, 0) + '');
    t.equal(style.red + '', style.stdRgb(1, 0, 0) + '');
    t.equal(style.green + '', style.stdRgb(0, 1, 0) + '');
    t.equal(style.yellow + '', style.stdRgb(1, 1, 0) + '');
    t.equal(style.blue + '', style.stdRgb(0, 0, 1) + '');
    t.equal(style.magenta + '', style.stdRgb(1, 0, 1) + '');
    t.equal(style.cyan + '', style.stdRgb(0, 1, 1) + '');
    t.equal(style.white + '', style.stdRgb(1, 1, 1) + '');
  });

  await t.test('Check different ways to specify a named color', t => {
    t.equal(style.brightRed + '', style.brightStdRgb(1, 0, 0) + '');
    t.equal(style.brightRed + '', style.bright.red + '');
    t.equal(style.brightRed + '', style.bright.dark.bright.red + '');
    t.equal(style.brightRed + '', style.fg.brightStdRgb(1, 0, 0) + '');
    t.equal(style.brightRed + '', style.fg.brightRed + '');
    t.equal(style.brightRed + '', style.fg.bright.red + '');
    t.equal(style.brightRed + '', style.fg.bright.dark.bright.red + '');

    t.equal(style.bgBrightRed + '', style.bgBrightStdRgb(1, 0, 0) + '');
    t.equal(style.bgBrightRed + '', style.bg.brightStdRgb(1, 0, 0) + '');
    t.equal(style.bgBrightRed + '', style.bg.brightRed + '');
    t.equal(style.bgBrightRed + '', style.bg.bright.red + '');
    t.equal(style.bgBrightRed + '', style.bg.bright.dark.bright.red + '');
  });

  await t.test('Condense commands into a state', t => {
    const state = style.bold.bright.yellow.bg.blue.getState();
    t.equal(style.italic.addState(state) + 'text' + style.reset.all, '\x1B[1;3;93;44mtext\x1B[m');
  });

  await t.test('Implicit getState()', t => {
    const state = style.bold.bright.yellow.bg.blue;
    t.equal(style.italic.addState(state) + 'text' + style.reset.all, '\x1B[1;3;93;44mtext\x1B[m');
  });
});
