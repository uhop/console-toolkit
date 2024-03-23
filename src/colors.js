export const findEscSequence = /\x1B\[([\d;:]+)m/g;

export const colors = {BLACK: 0, RED: 1, GREEN: 2, YELLOW: 3, BLUE: 4, MAGENTA: 5, CYAN: 6, WHITE: 7, DEFAULT: 9};

export const Commands = {
  RESET_ALL: '0',
  BOLD: '1',
  DIM: '2',
  ITALIC: '3',
  UNDERLINE: '4',
  BLINKING: '5',
  INVERSE: '7',
  HIDDEN: '8',
  STRIKETHROUGH: '9',
  RESET_BOLD: '22',
  RESET_DIM: '22',
  RESET_ITALIC: '23',
  RESET_UNDERLINE: '24',
  RESET_BLINKING: '25',
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
resetCommands[Commands.BOLD] = Commands.RESET_BOLD;
resetCommands[Commands.DIM] = Commands.RESET_DIM;
resetCommands[Commands.ITALIC] = Commands.RESET_ITALIC;
resetCommands[Commands.UNDERLINE] = Commands.RESET_UNDERLINE;
resetCommands[Commands.DOUBLE_UNDERLINE] = Commands.RESET_DOUBLE_UNDERLINE;
resetCommands[Commands.BLINKING] = Commands.RESET_BLINKING;
resetCommands[Commands.INVERSE] = Commands.RESET_INVERSE;
resetCommands[Commands.HIDDEN] = Commands.HIDDEN;
resetCommands[Commands.STRIKETHROUGH] = Commands.STRIKETHROUGH;
resetCommands[Commands.COLOR_EXTENDED] = Commands.RESET_COLOR;
resetCommands[Commands.BG_COLOR_EXTENDED] = Commands.RESET_BG_COLOR;

export const reset = command => {
  if (typeof command == 'string') {
    command = command.toUpperCase();
    const value = Commands['RESET_' + command];
    if (typeof value == 'string') return value;
    command = Commands[command];
  }
  const value = resetCommands[command];
  if ((value >= '30' && value <= '37') || (value >= '90' && value <= '97')) return Commands.RESET_COLOR;
  if ((value >= '40' && value <= '47') || (value >= '100' && value <= '107')) return Commands.RESET_BG_COLOR;
  // return undefined
};

export const setCommands = commands => `\x1B[${Array.isArray(commands) ? commands.join(';') : commands}m`;

export const colorNumber = color => {
  if (typeof color == 'string') {
    if (/^\d+$/.test(color)) {
      color = parseInt(color);
    } else {
      color = color.toUpperCase();
      return colors.hasOwnProperty(color) ? colors[color] : 0;
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

const get6 = colorComponent => Math.round(colorComponent / 17);
const get24 = intensity => Math.max(0, Math.min(23, Math.round((intensity - 8) / 10)));

export const getStdColor256 = color => [Commands.COLOR_EXTENDED, FORMAT_COLOR256, colorNumber(color)];
export const getBrightStdColor256 = color => [Commands.COLOR_EXTENDED, FORMAT_COLOR256, 8 + colorNumber(color)];
export const getColor256 = (r, g, b) => [Commands.COLOR_EXTENDED, FORMAT_COLOR256, 16 + 36 * get6(r) + 6 * get6(g) + get6(b)];
export const getGrayColor256 = i => [Commands.COLOR_EXTENDED, FORMAT_COLOR256, 232 + get24(i)];

export const setStdColor256 = color => setCommands(getStdColor256(color));
export const setBrightStdColor256 = color => setCommands(getBrightStdColor256(color));
export const setColor256 = (r, g, b) => setCommands(getColor256(r, g, b));
export const setGrayColor256 = i => setCommands(getGrayColor256(i));

export const getStdBgColor256 = color => [Commands.BG_COLOR_EXTENDED, FORMAT_COLOR256, colorNumber(color)];
export const getBrightStdBgColor256 = color => [Commands.BG_COLOR_EXTENDED, FORMAT_COLOR256, 8 + colorNumber(color)];
export const getBgColor256 = (r, g, b) => [Commands.BG_COLOR_EXTENDED, FORMAT_COLOR256, 16 + 36 * get6(r) + 6 * get6(g) + get6(b)];
export const getGrayBgColor256 = i => [Commands.BG_COLOR_EXTENDED, FORMAT_COLOR256, 232 + get24(i)];

export const setStdBgColor256 = color => setCommands(getStdColor256(color));
export const setBrightStdBgColor256 = color => setCommands(getBrightStdBgColor256(color));
export const setBgColor256 = (r, g, b) => setCommands(getBgColor256(r, g, b));
export const setGrayBgColor256 = i => setCommands(getGrayBgColor256(i));

export const getTrueColor = (r, g, b) => [Commands.COLOR_EXTENDED, FORMAT_TRUE_COLOR, r, g, b];
export const getTrueBgColor = (r, g, b) => [Commands.BG_COLOR_EXTENDED, FORMAT_TRUE_COLOR, r, g, b];

export const setTrueColor = (r, g, b) => setCommands(getTrueColor(r, g, b));
export const setTrueBgColor = (r, g, b) => setCommands(getTrueBgColor(r, g, b));

export const getDecorationStdColor256 = color => [Commands.COLOR_DECORATION, FORMAT_COLOR256, colorNumber(color)];
export const getDecorationBrightStdColor256 = color => [Commands.COLOR_DECORATION, FORMAT_COLOR256, 8 + colorNumber(color)];
export const getDecorationColor256 = (r, g, b) => [Commands.COLOR_DECORATION, FORMAT_COLOR256, 16 + 36 * get6(r) + 6 * get6(g) + get6(b)];
export const getDecorationGrayColor256 = i => [Commands.COLOR_DECORATION, FORMAT_COLOR256, 232 + get24(i)];

export const setDecorationStdColor256 = color => setCommands(getDecorationStdColor256(color));
export const setDecorationBrightStdColor256 = color => setCommands(getDecorationBrightStdColor256(color));
export const setDecorationColor256 = (r, g, b) => setCommands(getDecorationColor256(r, g, b));
export const setDecorationGrayColor256 = i => setCommands(getDecorationGrayColor256(i));

export const getDecorationTrueColor = (r, g, b) => [Commands.COLOR_DECORATION, FORMAT_TRUE_COLOR, r, g, b];
export const setDecorationTrueColor = (r, g, b) => setCommands(getDecorationTrueColor(r, g, b));
