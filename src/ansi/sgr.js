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
  FONT_DEFAULT: '10',
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
  COLOR_EXTENDED: '38',
  BG_COLOR_EXTENDED: '48',
  COLOR_DEFAULT: '39',
  BG_COLOR_DEFAULT: '49',
  RESET_COLOR: '39',
  RESET_BG_COLOR: '49',
  OVERLINE: '53',
  RESET_OVERLINE: '55',
  COLOR_DECORATION: '58',
  RESET_COLOR_DECORATION: '59'
};

export const FORMAT_COLOR256 = '5';
export const FORMAT_TRUE_COLOR = '2';

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

export const getColor = color => 30 + colorNumber(color);
export const getBgColor = color => 40 + colorNumber(color);
export const getBrightColor = color => 90 + colorNumber(color);
export const getBrightBgColor = color => 100 + colorNumber(color);

export const setColor = color => setCommands(getColor(color));
export const setBgColor = color => setCommands(getBgColor(color));
export const setBrightColor = color => setCommands(getBrightColor(color));
export const setBrightBgColor = color => setCommands(getBrightBgColor(color));

export const fontNumber = font => (typeof font == 'number' && font >= 0 && font <= 10 ? font : 0);

export const getFont = font => 10 + fontNumber(font);
export const setFont = font => setCommands(setFont(font));

const oneSixth = 6.0 / 256;
const oneTwentyFourth = 24.0 / 256;
const get6 = colorComponent => Math.max(0, Math.min(5, Math.floor(colorComponent * oneSixth)));
const get24 = intensity => Math.max(0, Math.min(23, Math.floor(intensity * oneTwentyFourth)));

export const getStdColor256 = color => [Commands.COLOR_EXTENDED, FORMAT_COLOR256, colorNumber(color)];
export const getBrightStdColor256 = color => [Commands.COLOR_EXTENDED, FORMAT_COLOR256, 8 + colorNumber(color)];
export const getColor256 = (r, g, b) => [
  Commands.COLOR_EXTENDED,
  FORMAT_COLOR256,
  16 + 36 * get6(r) + 6 * get6(g) + get6(b)
];
export const getGrayColor256 = i => [Commands.COLOR_EXTENDED, FORMAT_COLOR256, 232 + get24(i)];
export const getRawColor256 = color => [Commands.COLOR_EXTENDED, FORMAT_COLOR256, color];

export const setStdColor256 = color => setCommands(getStdColor256(color));
export const setBrightStdColor256 = color => setCommands(getBrightStdColor256(color));
export const setColor256 = (r, g, b) => setCommands(getColor256(r, g, b));
export const setGrayColor256 = i => setCommands(getGrayColor256(i));
export const setRawColor256 = color => setCommands(getRawColor256(color));

export const getStdBgColor256 = color => [Commands.BG_COLOR_EXTENDED, FORMAT_COLOR256, colorNumber(color)];
export const getBrightStdBgColor256 = color => [Commands.BG_COLOR_EXTENDED, FORMAT_COLOR256, 8 + colorNumber(color)];
export const getBgColor256 = (r, g, b) => [
  Commands.BG_COLOR_EXTENDED,
  FORMAT_COLOR256,
  16 + 36 * get6(r) + 6 * get6(g) + get6(b)
];
export const getGrayBgColor256 = i => [Commands.BG_COLOR_EXTENDED, FORMAT_COLOR256, 232 + get24(i)];
export const getRawBgColor256 = color => [Commands.BG_COLOR_EXTENDED, FORMAT_COLOR256, color];

export const setStdBgColor256 = color => setCommands(getStdColor256(color));
export const setBrightStdBgColor256 = color => setCommands(getBrightStdBgColor256(color));
export const setBgColor256 = (r, g, b) => setCommands(getBgColor256(r, g, b));
export const setGrayBgColor256 = i => setCommands(getGrayBgColor256(i));
export const setRawBgColor256 = color => setCommands(getRawBgColor256(color));

export const getTrueColor = (r, g, b) => [Commands.COLOR_EXTENDED, FORMAT_TRUE_COLOR, r, g, b];
export const getTrueBgColor = (r, g, b) => [Commands.BG_COLOR_EXTENDED, FORMAT_TRUE_COLOR, r, g, b];
export const getHexTrueColor = hex => [
  Commands.COLOR_EXTENDED,
  FORMAT_TRUE_COLOR,
  (hex >> 16) & 0xff,
  (hex >> 8) & 0xff,
  hex & 0xff
];
export const getHexTrueBgColor = hex => [
  Commands.BG_COLOR_EXTENDED,
  FORMAT_TRUE_COLOR,
  (hex >> 16) & 0xff,
  (hex >> 8) & 0xff,
  hex & 0xff
];

export const setTrueColor = (r, g, b) => setCommands(getTrueColor(r, g, b));
export const setTrueBgColor = (r, g, b) => setCommands(getTrueBgColor(r, g, b));
export const setHexTrueColor = hex => setCommands(getHexTrueColor(hex));
export const setHexTrueBgColor = hex => setCommands(getHexTrueBgColor(hex));

export const getDecorationStdColor256 = color => [Commands.COLOR_DECORATION, FORMAT_COLOR256, colorNumber(color)];
export const getDecorationBrightStdColor256 = color => [
  Commands.COLOR_DECORATION,
  FORMAT_COLOR256,
  8 + colorNumber(color)
];
export const getDecorationColor256 = (r, g, b) => [
  Commands.COLOR_DECORATION,
  FORMAT_COLOR256,
  16 + 36 * get6(r) + 6 * get6(g) + get6(b)
];
export const getDecorationGrayColor256 = i => [Commands.COLOR_DECORATION, FORMAT_COLOR256, 232 + get24(i)];
export const getDecorationRawColor256 = color => [Commands.COLOR_DECORATION, FORMAT_COLOR256, color];

export const setDecorationStdColor256 = color => setCommands(getDecorationStdColor256(color));
export const setDecorationBrightStdColor256 = color => setCommands(getDecorationBrightStdColor256(color));
export const setDecorationColor256 = (r, g, b) => setCommands(getDecorationColor256(r, g, b));
export const setDecorationGrayColor256 = i => setCommands(getDecorationGrayColor256(i));
export const setDecorationRawColor256 = color => setCommands(getDecorationRawColor256(color));

export const getDecorationTrueColor = (r, g, b) => [Commands.COLOR_DECORATION, FORMAT_TRUE_COLOR, r, g, b];
export const getDecorationHexTrueColor = hex => [
  Commands.COLOR_DECORATION,
  FORMAT_TRUE_COLOR,
  (hex >> 16) & 0xff,
  (hex >> 8) & 0xff,
  hex & 0xff
];

export const setDecorationTrueColor = (r, g, b) => setCommands(getDecorationTrueColor(r, g, b));
export const setDecorationHexTrueColor = hex => setCommands(getDecorationHexTrueColor(hex));
