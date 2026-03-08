import test from 'tape-six';
import style, {Style, s, c, RESET_STATE} from 'console-toolkit/style';
import type {SgrState} from 'console-toolkit/ansi/sgr-state.js';

test('Style constructor signatures', t => {
  const s1: Style = new Style(null);
  const s2: Style = new Style('\x1b[31m');
  const s3: Style = new Style(null, null, 4);

  t.ok(s1 instanceof Style, 'null initState');
  t.ok(s2 instanceof Style, 'string initState');
  t.ok(s3 instanceof Style, 'with colorDepth');
});

test('Style chainable SGR commands', t => {
  const s1: Style = style.bold;
  const s2: Style = style.italic;
  const s3: Style = style.underline;
  const s4: Style = style.dim;
  const s5: Style = style.inverse;
  const s6: Style = style.hidden;
  const s7: Style = style.strikethrough;
  const s8: Style = style.overline;
  const s9: Style = style.blink;
  const s10: Style = style.curlyUnderline;
  const s11: Style = style.doubleUnderline;

  t.ok(s1 instanceof Style, 'bold');
  t.ok(s2 instanceof Style && s3 instanceof Style, 'italic/underline');
  t.ok(s4 instanceof Style && s5 instanceof Style, 'dim/inverse');
  t.ok(s6 instanceof Style && s7 instanceof Style, 'hidden/strikethrough');
  t.ok(s8 instanceof Style && s9 instanceof Style, 'overline/blink');
  t.ok(s10 instanceof Style && s11 instanceof Style, 'curly/double underline');
});

test('Style standard color getters', t => {
  const r1: Style = style.red;
  const r2: Style = style.bgRed;
  const r3: Style = style.brightRed;
  const r4: Style = style.bgBrightRed;
  const r5: Style = style.darkRed;
  const r6: Style = style.bgDarkRed;
  const r7: Style = style.gray;
  const r8: Style = style.grey;
  const r9: Style = style.bgGray;
  const r10: Style = style.bgGrey;

  t.ok(r1 instanceof Style && r2 instanceof Style, 'red / bgRed');
  t.ok(r3 instanceof Style && r4 instanceof Style, 'brightRed / bgBrightRed');
  t.ok(r5 instanceof Style && r6 instanceof Style, 'darkRed / bgDarkRed');
  t.ok(r7 instanceof Style && r8 instanceof Style, 'gray / grey');
  t.ok(r9 instanceof Style && r10 instanceof Style, 'bgGray / bgGrey');
});

test('Style fg color methods', t => {
  const r1: Style = style.color(1);
  const r2: Style = style.rgb256(255, 0, 0);
  const r3: Style = style.hex256(0xff0000);
  const r4: Style = style.rgb6(5, 0, 0);
  const r5: Style = style.grayscale256(128);
  const r6: Style = style.grayscale24(12);
  const r7: Style = style.trueColor(255, 0, 0);
  const r8: Style = style.trueGrayscale(128);
  const r9: Style = style.hexTrueColor(0xff0000);
  const r10: Style = style.rgb(255, 0, 0);
  const r11: Style = style.grayscale(128);
  const r12: Style = style.hex(0xff0000);
  const r13: Style = style.stdRgb(5, 0, 0);
  const r14: Style = style.brightStdRgb(5, 0, 0);
  const r15: Style = style.greyscale(128);

  t.ok(r1 instanceof Style && r2 instanceof Style && r3 instanceof Style, 'color/rgb256/hex256');
  t.ok(r4 instanceof Style && r5 instanceof Style && r6 instanceof Style, 'rgb6/grayscale256/grayscale24');
  t.ok(r7 instanceof Style && r8 instanceof Style && r9 instanceof Style, 'trueColor/trueGrayscale/hexTrueColor');
  t.ok(r10 instanceof Style && r11 instanceof Style && r12 instanceof Style, 'rgb/grayscale/hex');
  t.ok(r13 instanceof Style && r14 instanceof Style, 'stdRgb/brightStdRgb');
  t.ok(r15 instanceof Style, 'greyscale alias');
});

test('Style bg color methods', t => {
  const r1: Style = style.bgColor(1);
  const r2: Style = style.bgRgb256(255, 0, 0);
  const r3: Style = style.bgHex256(0xff0000);
  const r4: Style = style.bgRgb6(5, 0, 0);
  const r5: Style = style.bgTrueColor(255, 0, 0);
  const r6: Style = style.bgRgb(255, 0, 0);
  const r7: Style = style.bgHex(0xff0000);
  const r8: Style = style.bgStdRgb(5, 0, 0);

  t.ok(r1 instanceof Style && r2 instanceof Style, 'bgColor/bgRgb256');
  t.ok(r3 instanceof Style && r4 instanceof Style, 'bgHex256/bgRgb6');
  t.ok(r5 instanceof Style && r6 instanceof Style, 'bgTrueColor/bgRgb');
  t.ok(r7 instanceof Style && r8 instanceof Style, 'bgHex/bgStdRgb');
});

test('Style decoration color methods', t => {
  const r1: Style = style.decorationColor(1);
  const r2: Style = style.decorationRgb256(255, 0, 0);
  const r3: Style = style.decorationTrueColor(255, 0, 0);
  const r4: Style = style.decorationRgb(255, 0, 0);
  const r5: Style = style.decorationHex(0xff0000);

  t.ok(r1 instanceof Style && r2 instanceof Style, 'decorationColor/decorationRgb256');
  t.ok(r3 instanceof Style && r4 instanceof Style, 'decorationTrueColor/decorationRgb');
  t.ok(r5 instanceof Style, 'decorationHex');
});

test('Style color namespaces', t => {
  const fgRed: Style = style.fg.red;
  const bgRed: Style = style.bg.red;
  const decRed: Style = style.colorDecoration.red;
  const fgBright: Style = style.fg.bright.red;
  const bgDark: Style = style.bg.dark.red;
  const fgRgb: Style = style.fg.trueColor(255, 0, 0);
  const bgHex: Style = style.bg.hex(0xff0000);
  const fgDefault: Style = style.fg.default;

  t.ok(fgRed instanceof Style, 'fg.red');
  t.ok(bgRed instanceof Style, 'bg.red');
  t.ok(decRed instanceof Style, 'colorDecoration.red');
  t.ok(fgBright instanceof Style, 'fg.bright.red');
  t.ok(bgDark instanceof Style, 'bg.dark.red');
  t.ok(fgRgb instanceof Style, 'fg.trueColor');
  t.ok(bgHex instanceof Style, 'bg.hex');
  t.ok(fgDefault instanceof Style, 'fg.default');
});

test('Style namespace aliases', t => {
  const fg: Style = style.foreground.red;
  const bg: Style = style.background.red;
  const dec: Style = style.decoration.red;

  t.ok(fg instanceof Style, 'foreground alias');
  t.ok(bg instanceof Style, 'background alias');
  t.ok(dec instanceof Style, 'decoration alias');
});

test('Style bright/dark namespaces', t => {
  const r1: Style = style.bright.red;
  const r2: Style = style.dark.red;
  const r3: Style = style.bright.stdRgb(5, 0, 0);
  const r4: Style = style.dark.brightStdRgb(5, 0, 0);

  t.ok(r1 instanceof Style, 'bright.red');
  t.ok(r2 instanceof Style, 'dark.red');
  t.ok(r3 instanceof Style, 'bright.stdRgb');
  t.ok(r4 instanceof Style, 'dark.brightStdRgb');
});

test('Style reset namespace', t => {
  const r1: Style = style.reset.all;
  const r2: Style = style.reset.bold;
  const r3: Style = style.reset.color;
  const r4: Style = style.reset.bgColor;
  const r5: Style = style.reset.font;
  const r6: Style = style.reset.decorationColor;

  t.ok(r1 instanceof Style, 'reset.all');
  t.ok(r2 instanceof Style, 'reset.bold');
  t.ok(r3 instanceof Style && r4 instanceof Style, 'reset.color/bgColor');
  t.ok(r5 instanceof Style && r6 instanceof Style, 'reset.font/decorationColor');
});

test('Style make/add/addState/mark', t => {
  const r1: Style = style.make(31);
  const r2: Style = style.make('31');
  const r3: Style = style.make([1, 31]);
  const r4: Style = style.add('\x1b[31m');
  const r5: Style = style.addState(null);
  const r6: Style = style.addState('\x1b[31m');
  const r7: Style = style.mark();

  t.ok(r1 instanceof Style, 'make with number');
  t.ok(r2 instanceof Style, 'make with string');
  t.ok(r3 instanceof Style, 'make with array');
  t.ok(r4 instanceof Style, 'add');
  t.ok(r5 instanceof Style && r6 instanceof Style, 'addState');
  t.ok(r7 instanceof Style, 'mark');
});

test('Style text method', t => {
  const str: string = style.bold.red.text('hello');
  const arr: string[] = style.bold.red.text(['hello', 'world']);
  const seq: string = style.bold.red.toString();

  t.equal(typeof str, 'string', 'text(string) returns string');
  t.ok(Array.isArray(arr), 'text(string[]) returns string[]');
  t.equal(typeof seq, 'string', 'toString returns string');
});

test('Style colorDepth', t => {
  const depth: number = style.colorDepth;
  const r1: Style = style.setColorDepth(4);

  t.equal(typeof depth, 'number', 'colorDepth is number');
  t.ok(r1 instanceof Style, 'setColorDepth returns Style');
});

test('s and c tagged templates', t => {
  const r1: string = s`hello`;
  const r2: string = c`hello`;

  t.equal(typeof r1, 'string', 's returns string');
  t.equal(typeof r2, 'string', 'c returns string');
});

test('RESET_STATE export', t => {
  t.notEqual(RESET_STATE, undefined, 'RESET_STATE is defined');
});

test('style default export', t => {
  t.ok(style instanceof Style, 'default export is a Style instance');
});
