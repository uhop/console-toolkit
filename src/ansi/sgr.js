// SGR (Select Graphics Rendition) definitions and helpers.
// SGR is a part of CSI (Control Sequence Introducer) sequences.
// CSI is a part of Fe Escape sequences.
// Type Fe is supported by C1 control codes.
// See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.

// matcher
export const matchSgr = /\x1B\[([\x30-\x3F]*)([\x20-\x2F]*)m/g;

export const Colors = {BLACK: 0, RED: 1, GREEN: 2, YELLOW: 3, BLUE: 4, MAGENTA: 5, CYAN: 6, WHITE: 7, DEFAULT: 9};

export const Commands = {
  RESET_ALL: '0',
  BOLD: '1',
  DIM: '2',
  ITALIC: '3',
  UNDERLINE: '4',
  BLINK: '5',
  RAPID_BLINK: '6',
  INVERSE: '7',
  HIDDEN: '8',
  STRIKETHROUGH: '9',
  DEFAULT_FONT: '10',
  RESET_FONT: '10',
  FONT_GOTHIC: '20',
  RESET_BOLD: '22',
  RESET_DIM: '22',
  RESET_ITALIC: '23',
  RESET_UNDERLINE: '24',
  RESET_BLINK: '25',
  RESET_RAPID_BLINK: '25',
  RESET_INVERSE: '27',
  RESET_HIDDEN: '28',
  RESET_STRIKETHROUGH: '29',
  CURLY_UNDERLINE: '4:3',
  RESET_CURLY_UNDERLINE: '24',
  DOUBLE_UNDERLINE: '21',
  RESET_DOUBLE_UNDERLINE: '24',
  EXTENDED_COLOR: '38',
  BG_EXTENDED_COLOR: '48',
  DEFAULT_COLOR: '39',
  BG_DEFAULT_COLOR: '49',
  RESET_COLOR: '39',
  RESET_BG_COLOR: '49',
  OVERLINE: '53',
  RESET_OVERLINE: '55',
  DECORATION_COLOR: '58',
  DECORATION_DEFAULT_COLOR: '59',
  RESET_DECORATION_COLOR: '59'
};

export const ColorFormat = {COLOR_256: '5', TRUE_COLOR: '2'};
export const ColorFormatSize = {[ColorFormat.COLOR_256]: 3, [ColorFormat.TRUE_COLOR]: 5};

export const FgColorOptions = {
  base: 30,
  brightBase: 90,
  default: Commands.DEFAULT_COLOR,
  extended: Commands.EXTENDED_COLOR
};
export const BgColorOptions = {
  base: 40,
  brightBase: 100,
  default: Commands.BG_DEFAULT_COLOR,
  extended: Commands.BG_EXTENDED_COLOR
};
export const DecorationColorOptions = {
  base: 0,
  brightBase: 100,
  default: Commands.RESET_DECORATION_COLOR,
  extended: Commands.DECORATION_COLOR
};

const resetCommands = {};
for (const [k, v] of Object.entries(Commands)) {
  if (!k.startsWith('RESET_')) continue;
  const cmd = k.substring(6);
  if (!Commands.hasOwnProperty(cmd)) continue;
  resetCommands[Commands[cmd]] = v;
}

export const isFgColorCommand = command => (command >= '30' && command <= '37') || (command >= '90' && command <= '97');
export const isBgColorCommand = command =>
  (command >= '40' && command <= '47') || (command >= '100' && command <= '107');
export const isFontCommand = command => command >= '10' && command <= '20';

export const reset = command => {
  command = String(command).toUpperCase();
  if (Commands.hasOwnProperty(command)) {
    command = Commands[command];
  }
  if (resetCommands.hasOwnProperty(command)) return resetCommands[command];
  if (isFgColorCommand(command)) return Commands.RESET_COLOR;
  if (isBgColorCommand(command)) return Commands.RESET_BG_COLOR;
  if (isFontCommand(command)) return Commands.RESET_FONT;
  // return undefined in all other cases
};

export const setCommands = commands => `\x1B[${Array.isArray(commands) ? commands.join(';') : commands}m`;

export const colorNumber = color => {
  if (typeof color == 'string') {
    if (/^\d+$/.test(color)) {
      color = parseInt(color);
    } else {
      color = color.toUpperCase();
      return Colors.hasOwnProperty(color) ? Colors[color] : 0;
    }
  }
  return typeof color == 'number' && color >= 0 && color <= 9 ? color : 0;
};
export const colorStdRgb = (r, g, b) => (r ? 1 : 0) + (g ? 2 : 0) + (b ? 4 : 0);

export const getColor = color => 30 + colorNumber(color);
export const getBgColor = color => 40 + colorNumber(color);
export const getBrightColor = color => 90 + colorNumber(color);
export const getBgBrightColor = color => 100 + colorNumber(color);
export const getStdRgb = (r, g, b) => getColor(colorStdRgb(r, g, b));
export const getBgStdRgb = (r, g, b) => getBgColor(colorStdRgb(r, g, b));
export const getBrightStdRgb = (r, g, b) => getBrightColor(colorStdRgb(r, g, b));
export const getBgBrightStdRgb = (r, g, b) => getBgBrightColor(colorStdRgb(r, g, b));

export const setColor = color => setCommands(getColor(color));
export const setBgColor = color => setCommands(getBgColor(color));
export const setBrightColor = color => setCommands(getBrightColor(color));
export const setBgBrightColor = color => setCommands(getBgBrightColor(color));
export const setStdRgb = (r, g, b) => setCommands(getStdRgb(r, g, b));
export const setBgStdRgb = (r, g, b) => setCommands(getBgStdRgb(r, g, b));
export const setBrightStdRgb = (r, g, b) => setCommands(getBrightStdRgb(r, g, b));
export const setBgBrightStdRgb = (r, g, b) => setCommands(getBgBrightStdRgb(r, g, b));

export const fontNumber = font => (typeof font == 'number' && font >= 0 && font <= 10 ? font : 0);

export const getFont = font => 10 + fontNumber(font);
export const setFont = font => setCommands(setFont(font));

const oneSixth = 6.0 / 256;
const oneTwentyFourth = 24.0 / 256;
const get6 = colorComponent => Math.floor(colorComponent * oneSixth);
const get24 = intensity => Math.floor(intensity * oneTwentyFourth);
const lim = (from, to) => value => Math.max(from, Math.min(to, value)); // inclusive
const lim5 = lim(0, 5);
const lim23 = lim(0, 23);

export const getRawColor256 = color => [Commands.EXTENDED_COLOR, ColorFormat.COLOR_256, color];
export const getStdColor256 = color => getRawColor256(colorNumber(color));
export const getBrightStdColor256 = color => getRawColor256(8 + colorNumber(color));
export const getColor6 = (r, g, b) => getRawColor256(16 + 36 * lim5(r) + 6 * lim5(g) + lim5(b));
export const getColor256 = (r, g, b) => getColor6(get6(r), get6(g), get6(b));
export const getHexColor256 = hex => getColor256((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
export const getGrayColor24 = i => getRawColor256(232 + lim23(i));
export const getGrayColor256 = i => getGrayColor24(get24(i));

export const setRawColor256 = color => setCommands(getRawColor256(color));
export const setStdColor256 = color => setCommands(getStdColor256(color));
export const setBrightStdColor256 = color => setCommands(getBrightStdColor256(color));
export const setColor6 = (r, g, b) => setCommands(getColor6(r, g, b));
export const setColor256 = (r, g, b) => setCommands(getColor256(r, g, b));
export const setHexColor256 = (r, g, b) => setCommands(getHexColor256(r, g, b));
export const setGrayColor24 = i => setCommands(getGrayColor24(i));
export const setGrayColor256 = i => setCommands(getGrayColor256(i));

export const getBgRawColor256 = color => [Commands.BG_EXTENDED_COLOR, ColorFormat.COLOR_256, color];
export const getBgStdColor256 = color => getBgStdColor256(colorNumber(color));
export const getBgBrightStdColor256 = color => getBgStdColor256(8 + colorNumber(color));
export const getBgColor6 = (r, g, b) => getBgRawColor256(16 + 36 * lim5(r) + 6 * lim5(g) + lim5(b));
export const getBgColor256 = (r, g, b) => getBgColor6(get6(r), get6(g), get6(b));
export const getBgHexColor256 = hex => getBgColor256((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
export const getBgGrayColor24 = i => getBgRawColor256(232 + lim23(i));
export const getBgGrayColor256 = i => getBgGrayColor24(get24(i));

export const setBgRawColor256 = color => setCommands(getBgRawColor256(color));
export const setBgStdColor256 = color => setCommands(getBgStdColor256(color));
export const setBgBrightStdColor256 = color => setCommands(getBgBrightStdColor256(color));
export const setBgColor6 = (r, g, b) => setCommands(getBgColor6(r, g, b));
export const setBgColor256 = (r, g, b) => setCommands(getBgColor256(r, g, b));
export const setBgHexColor256 = (r, g, b) => setCommands(getBgHexColor256(r, g, b));
export const setBgGrayColor24 = i => setCommands(getBgGrayColor24(i));
export const setBgGrayColor256 = i => setCommands(geBgtGrayColor256(i));

export const getTrueColor = (r, g, b) => [Commands.EXTENDED_COLOR, ColorFormat.TRUE_COLOR, r, g, b];
export const getHexTrueColor = hex => getTrueColor((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
export const getBgTrueColor = (r, g, b) => [Commands.BG_EXTENDED_COLOR, ColorFormat.TRUE_COLOR, r, g, b];
export const getBgHexTrueColor = hex => getBgTrueColor((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);

export const setTrueColor = (r, g, b) => setCommands(getTrueColor(r, g, b));
export const setHexTrueColor = hex => setCommands(getHexTrueColor(hex));
export const setBgTrueColor = (r, g, b) => setCommands(getBgTrueColor(r, g, b));
export const setBgHexTrueColor = hex => setCommands(getBgHexTrueColor(hex));

export const getDecorationRawColor256 = color => [Commands.DECORATION_COLOR, ColorFormat.COLOR_256, color];
export const getDecorationStdColor256 = color => getDecorationRawColor256(colorNumber(color));
export const getDecorationBrightStdColor256 = color => getDecorationRawColor256(8 + colorNumber(color));
export const getDecorationColor6 = (r, g, b) => getDecorationRawColor256(16 + 36 * lim5(r) + 6 * lim5(g) + lim5(b));
export const getDecorationColor256 = (r, g, b) => getDecorationColor6(get6(r), get6(g), get6(b));
export const getDecorationHexColor256 = hex => getDecorationColor256((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
export const getDecorationGrayColor24 = i => getDecorationRawColor256(232 + lim23(i));
export const getDecorationGrayColor256 = i => getDecorationGrayColor24(get24(i));

export const setDecorationRawColor256 = color => setCommands(getDecorationRawColor256(color));
export const setDecorationStdColor256 = color => setCommands(getDecorationStdColor256(color));
export const setDecorationBrightStdColor256 = color => setCommands(getDecorationBrightStdColor256(color));
export const setDecorationColor6 = (r, g, b) => setCommands(getDecorationColor6(r, g, b));
export const setDecorationColor256 = (r, g, b) => setCommands(getDecorationColor256(r, g, b));
export const setDecorationHexColor256 = (r, g, b) => setCommands(getDecorationHexColor256(r, g, b));
export const setDecorationGrayColor24 = i => setCommands(getDecorationGrayColor24(i));
export const setDecorationGrayColor256 = i => setCommands(getDecorationGrayColor256(i));

export const getDecorationTrueColor = (r, g, b) => [Commands.DECORATION_COLOR, ColorFormat.TRUE_COLOR, r, g, b];
export const getDecorationHexTrueColor = hex =>
  getDecorationTrueColor((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);

export const setDecorationTrueColor = (r, g, b) => setCommands(getDecorationTrueColor(r, g, b));
export const setDecorationHexTrueColor = hex => setCommands(getDecorationHexTrueColor(hex));
