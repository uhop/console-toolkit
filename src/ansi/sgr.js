// SGR (Select Graphics Rendition) definitions and helpers.
// SGR is a part of CSI (Control Sequence Introducer) sequences.
// CSI is a part of Fe Escape sequences.
// Type Fe is supported by C1 control codes.
// See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.

// matcher
/** RegExp matching SGR (Select Graphics Rendition) escape sequences.
 * @type {RegExp}
 */
export const matchSgr = /\x1B\[([\x30-\x3F]*)([\x20-\x2F]*)m/g;

/** Standard color name-to-number mapping.
 * @type {{BLACK: 0, RED: 1, GREEN: 2, YELLOW: 3, BLUE: 4, MAGENTA: 5, CYAN: 6, WHITE: 7, DEFAULT: 9}}
 */
export const Colors = {BLACK: 0, RED: 1, GREEN: 2, YELLOW: 3, BLUE: 4, MAGENTA: 5, CYAN: 6, WHITE: 7, DEFAULT: 9};

/** SGR command code constants (e.g., BOLD='1', UNDERLINE='4'). */
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

/** Color format identifiers for extended colors.
 * @type {{COLOR_256: string, TRUE_COLOR: string}}
 */
export const ColorFormat = {COLOR_256: '5', TRUE_COLOR: '2'};
/** Maps color format identifiers to their parameter count.
 * @type {Record<string, number>}
 */
export const ColorFormatSize = {[ColorFormat.COLOR_256]: 3, [ColorFormat.TRUE_COLOR]: 5};

/** Foreground color configuration.
 * @type {import('./sgr.js').ColorOptions}
 */
export const FgColorOptions = {
  base: 30,
  brightBase: 90,
  default: Commands.DEFAULT_COLOR,
  extended: Commands.EXTENDED_COLOR
};
/** Background color configuration.
 * @type {import('./sgr.js').ColorOptions}
 */
export const BgColorOptions = {
  base: 40,
  brightBase: 100,
  default: Commands.BG_DEFAULT_COLOR,
  extended: Commands.BG_EXTENDED_COLOR
};
/** Decoration (underline) color configuration.
 * @type {import('./sgr.js').ColorOptions}
 */
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

/** Checks if a command is a foreground color command.
 * @param {string} command
 * @returns {boolean}
 */
export const isFgColorCommand = command => (command >= '30' && command <= '37') || (command >= '90' && command <= '97');
/** Checks if a command is a background color command.
 * @param {string} command
 * @returns {boolean}
 */
export const isBgColorCommand = command =>
  (command >= '40' && command <= '47') || (command >= '100' && command <= '107');
/** Checks if a command is a font command.
 * @param {string} command
 * @returns {boolean}
 */
export const isFontCommand = command => command >= '10' && command <= '20';

/** Returns the reset command for a given SGR command.
 * @param {string} command - The SGR command string or name.
 * @returns {string|undefined} The reset command, or undefined if not found.
 */
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

/** Creates an SGR escape sequence from one or more commands.
 * @param {string|string[]|number[]} commands - Command(s) to encode.
 * @returns {string} The SGR escape sequence.
 */
export const setCommands = commands => `\x1B[${Array.isArray(commands) ? commands.join(';') : commands}m`;

/** Converts a color name or number to a standard color number (0-9).
 * @param {string|number} color - Color name or number.
 * @returns {number} The color number.
 */
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
/** Converts RGB values to a standard color number.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {number} a color number from 0 to 7
 */
export const colorStdRgb = (r, g, b) => (r ? 1 : 0) + (g ? 2 : 0) + (b ? 4 : 0);

/** Returns the foreground color SGR code.
 * @param {string|number} color - Color name or number.
 * @returns {number}
 */
export const getColor = color => 30 + colorNumber(color);
/** Returns the background color SGR code.
 * @param {string|number} color - Color name or number.
 * @returns {number}
 */
export const getBgColor = color => 40 + colorNumber(color);
/** Returns the bright foreground color SGR code.
 * @param {string|number} color - Color name or number.
 * @returns {number}
 */
export const getBrightColor = color => 90 + colorNumber(color);
/** Returns the bright background color SGR code.
 * @param {string|number} color - Color name or number.
 * @returns {number}
 */
export const getBgBrightColor = color => 100 + colorNumber(color);
/** Returns the foreground standard RGB color SGR code.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {number}
 */
export const getStdRgb = (r, g, b) => getColor(colorStdRgb(r, g, b));
/** Returns the background standard RGB color SGR code.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {number}
 */
export const getBgStdRgb = (r, g, b) => getBgColor(colorStdRgb(r, g, b));
/** Returns the bright foreground standard RGB color SGR code.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {number}
 */
export const getBrightStdRgb = (r, g, b) => getBrightColor(colorStdRgb(r, g, b));
/** Returns the bright background standard RGB color SGR code.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {number}
 */
export const getBgBrightStdRgb = (r, g, b) => getBgBrightColor(colorStdRgb(r, g, b));

/** Sets the foreground color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setColor = color => setCommands(getColor(color));
/** Sets the background color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setBgColor = color => setCommands(getBgColor(color));
/** Sets the bright foreground color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setBrightColor = color => setCommands(getBrightColor(color));
/** Sets the bright background color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setBgBrightColor = color => setCommands(getBgBrightColor(color));
/** Sets the foreground standard RGB color.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {string} SGR escape sequence.
 */
export const setStdRgb = (r, g, b) => setCommands(getStdRgb(r, g, b));
/** Sets the background standard RGB color.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {string} SGR escape sequence.
 */
export const setBgStdRgb = (r, g, b) => setCommands(getBgStdRgb(r, g, b));
/** Sets the bright foreground standard RGB color.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {string} SGR escape sequence.
 */
export const setBrightStdRgb = (r, g, b) => setCommands(getBrightStdRgb(r, g, b));
/** Sets the bright background standard RGB color.
 * @param {number|boolean} r - Red component (truthy/falsy).
 * @param {number|boolean} g - Green component (truthy/falsy).
 * @param {number|boolean} b - Blue component (truthy/falsy).
 * @returns {string} SGR escape sequence.
 */
export const setBgBrightStdRgb = (r, g, b) => setCommands(getBgBrightStdRgb(r, g, b));

/** Converts a font number to a valid font index.
 * @param {number} font - Font number.
 * @returns {number} The font index.
 */
export const fontNumber = font => (typeof font == 'number' && font >= 0 && font <= 10 ? font : 0);

/** Returns the SGR code for a font.
 * @param {number} font - Font number.
 * @returns {number}
 */
export const getFont = font => 10 + fontNumber(font);
/** Sets the font.
 * @param {number} font - Font number.
 * @returns {string} SGR escape sequence.
 */
export const setFont = font => setCommands(getFont(font));

const oneSixth = 6.0 / 256;
const oneTwentyFourth = 24.0 / 256;
const get6 = colorComponent => Math.floor(colorComponent * oneSixth);
const get24 = intensity => Math.floor(intensity * oneTwentyFourth);
const lim = (from, to) => value => Math.max(from, Math.min(to, value)); // inclusive
const lim5 = lim(0, 5);
const lim23 = lim(0, 23);

/** Returns foreground 256-color command array for a raw palette index.
 * @param {number} color - Palette index (0-255).
 * @returns {string[]}
 */
export const getRawColor256 = color => [Commands.EXTENDED_COLOR, ColorFormat.COLOR_256, color];
/** Returns foreground 256-color command array for a standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string[]}
 */
export const getStdColor256 = color => getRawColor256(colorNumber(color));
/** Returns foreground 256-color command array for a bright standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string[]}
 */
export const getBrightStdColor256 = color => getRawColor256(8 + colorNumber(color));
/** Returns foreground 256-color command array for a 6x6x6 RGB color.
 * @param {number} r - Red component (0-5).
 * @param {number} g - Green component (0-5).
 * @param {number} b - Blue component (0-5).
 * @returns {string[]}
 */
export const getColor6 = (r, g, b) => getRawColor256(16 + 36 * lim5(r) + 6 * lim5(g) + lim5(b));
/** Returns foreground 256-color command array for an RGB color.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string[]}
 */
export const getColor256 = (r, g, b) => getColor6(get6(r), get6(g), get6(b));
/** Returns foreground 256-color command array for a hex color.
 * @param {number} hex - Hex color value (e.g., 0xFF0000).
 * @returns {string[]}
 */
export const getHexColor256 = hex => getColor256((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
/** Returns foreground 256-color command array for a 24-shade gray.
 * @param {number} i - Gray index (0-23).
 * @returns {string[]}
 */
export const getGrayColor24 = i => getRawColor256(232 + lim23(i));
/** Returns foreground 256-color command array for a gray by intensity.
 * @param {number} i - Gray intensity (0-255).
 * @returns {string[]}
 */
export const getGrayColor256 = i => getGrayColor24(get24(i));

/** Sets foreground 256-color by raw palette index.
 * @param {number} color - Palette index (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setRawColor256 = color => setCommands(getRawColor256(color));
/** Sets foreground 256-color by standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setStdColor256 = color => setCommands(getStdColor256(color));
/** Sets foreground 256-color by bright standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setBrightStdColor256 = color => setCommands(getBrightStdColor256(color));
/** Sets foreground 256-color by 6x6x6 RGB.
 * @param {number} r - Red (0-5).
 * @param {number} g - Green (0-5).
 * @param {number} b - Blue (0-5).
 * @returns {string} SGR escape sequence.
 */
export const setColor6 = (r, g, b) => setCommands(getColor6(r, g, b));
/** Sets foreground 256-color by RGB.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setColor256 = (r, g, b) => setCommands(getColor256(r, g, b));
/** Sets foreground 256-color by hex.
 * @param {number} hex - Hex color value.
 * @returns {string} SGR escape sequence.
 */
export const setHexColor256 = hex => setCommands(getHexColor256(hex));
/** Sets foreground 256-color gray by index.
 * @param {number} i - Gray index (0-23).
 * @returns {string} SGR escape sequence.
 */
export const setGrayColor24 = i => setCommands(getGrayColor24(i));
/** Sets foreground 256-color gray by intensity.
 * @param {number} i - Gray intensity (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setGrayColor256 = i => setCommands(getGrayColor256(i));

/** Returns background 256-color command array for a raw palette index.
 * @param {number} color - Palette index (0-255).
 * @returns {string[]}
 */
export const getBgRawColor256 = color => [Commands.BG_EXTENDED_COLOR, ColorFormat.COLOR_256, color];
/** Returns background 256-color command array for a standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string[]}
 */
export const getBgStdColor256 = color => getBgRawColor256(colorNumber(color));
/** Returns background 256-color command array for a bright standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string[]}
 */
export const getBgBrightStdColor256 = color => getBgStdColor256(8 + colorNumber(color));
/** Returns background 256-color command array for a 6x6x6 RGB color.
 * @param {number} r - Red (0-5).
 * @param {number} g - Green (0-5).
 * @param {number} b - Blue (0-5).
 * @returns {string[]}
 */
export const getBgColor6 = (r, g, b) => getBgRawColor256(16 + 36 * lim5(r) + 6 * lim5(g) + lim5(b));
/** Returns background 256-color command array for an RGB color.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string[]}
 */
export const getBgColor256 = (r, g, b) => getBgColor6(get6(r), get6(g), get6(b));
/** Returns background 256-color command array for a hex color.
 * @param {number} hex - Hex color value.
 * @returns {string[]}
 */
export const getBgHexColor256 = hex => getBgColor256((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
/** Returns background 256-color command array for a 24-shade gray.
 * @param {number} i - Gray index (0-23).
 * @returns {string[]}
 */
export const getBgGrayColor24 = i => getBgRawColor256(232 + lim23(i));
/** Returns background 256-color command array for a gray by intensity.
 * @param {number} i - Gray intensity (0-255).
 * @returns {string[]}
 */
export const getBgGrayColor256 = i => getBgGrayColor24(get24(i));

/** Sets background 256-color by raw palette index.
 * @param {number} color - Palette index (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setBgRawColor256 = color => setCommands(getBgRawColor256(color));
/** Sets background 256-color by standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setBgStdColor256 = color => setCommands(getBgStdColor256(color));
/** Sets background 256-color by bright standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setBgBrightStdColor256 = color => setCommands(getBgBrightStdColor256(color));
/** Sets background 256-color by 6x6x6 RGB.
 * @param {number} r - Red (0-5).
 * @param {number} g - Green (0-5).
 * @param {number} b - Blue (0-5).
 * @returns {string} SGR escape sequence.
 */
export const setBgColor6 = (r, g, b) => setCommands(getBgColor6(r, g, b));
/** Sets background 256-color by RGB.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setBgColor256 = (r, g, b) => setCommands(getBgColor256(r, g, b));
/** Sets background 256-color by hex.
 * @param {number} hex - Hex color value.
 * @returns {string} SGR escape sequence.
 */
export const setBgHexColor256 = hex => setCommands(getBgHexColor256(hex));
/** Sets background 256-color gray by index.
 * @param {number} i - Gray index (0-23).
 * @returns {string} SGR escape sequence.
 */
export const setBgGrayColor24 = i => setCommands(getBgGrayColor24(i));
/** Sets background 256-color gray by intensity.
 * @param {number} i - Gray intensity (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setBgGrayColor256 = i => setCommands(getBgGrayColor256(i));

/** Returns the foreground true color (24-bit) SGR command array.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string[]}
 */
export const getTrueColor = (r, g, b) => [Commands.EXTENDED_COLOR, ColorFormat.TRUE_COLOR, r, g, b];
/** Returns the foreground true color command array from hex.
 * @param {number} hex - Hex color value.
 * @returns {string[]}
 */
export const getHexTrueColor = hex => getTrueColor((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
/** Returns the background true color (24-bit) SGR command array.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string[]}
 */
export const getBgTrueColor = (r, g, b) => [Commands.BG_EXTENDED_COLOR, ColorFormat.TRUE_COLOR, r, g, b];
/** Returns the background true color command array from hex.
 * @param {number} hex - Hex color value.
 * @returns {string[]}
 */
export const getBgHexTrueColor = hex => getBgTrueColor((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);

/** Sets foreground true color.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setTrueColor = (r, g, b) => setCommands(getTrueColor(r, g, b));
/** Sets foreground true color from hex.
 * @param {number} hex - Hex color value.
 * @returns {string} SGR escape sequence.
 */
export const setHexTrueColor = hex => setCommands(getHexTrueColor(hex));
/** Sets background true color.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setBgTrueColor = (r, g, b) => setCommands(getBgTrueColor(r, g, b));
/** Sets background true color from hex.
 * @param {number} hex - Hex color value.
 * @returns {string} SGR escape sequence.
 */
export const setBgHexTrueColor = hex => setCommands(getBgHexTrueColor(hex));

/** Returns decoration 256-color command array for a raw palette index.
 * @param {number} color - Palette index (0-255).
 * @returns {string[]}
 */
export const getDecorationRawColor256 = color => [Commands.DECORATION_COLOR, ColorFormat.COLOR_256, color];
/** Returns decoration 256-color command array for a standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string[]}
 */
export const getDecorationStdColor256 = color => getDecorationRawColor256(colorNumber(color));
/** Returns decoration 256-color command array for a bright standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string[]}
 */
export const getDecorationBrightStdColor256 = color => getDecorationRawColor256(8 + colorNumber(color));
/** Returns decoration 256-color command array for a 6x6x6 RGB color.
 * @param {number} r - Red (0-5).
 * @param {number} g - Green (0-5).
 * @param {number} b - Blue (0-5).
 * @returns {string[]}
 */
export const getDecorationColor6 = (r, g, b) => getDecorationRawColor256(16 + 36 * lim5(r) + 6 * lim5(g) + lim5(b));
/** Returns decoration 256-color command array for an RGB color.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string[]}
 */
export const getDecorationColor256 = (r, g, b) => getDecorationColor6(get6(r), get6(g), get6(b));
/** Returns decoration 256-color command array for a hex color.
 * @param {number} hex - Hex color value.
 * @returns {string[]}
 */
export const getDecorationHexColor256 = hex => getDecorationColor256((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
/** Returns decoration 256-color command array for a 24-shade gray.
 * @param {number} i - Gray index (0-23).
 * @returns {string[]}
 */
export const getDecorationGrayColor24 = i => getDecorationRawColor256(232 + lim23(i));
/** Returns decoration 256-color command array for a gray by intensity.
 * @param {number} i - Gray intensity (0-255).
 * @returns {string[]}
 */
export const getDecorationGrayColor256 = i => getDecorationGrayColor24(get24(i));

/** Sets decoration 256-color by raw palette index.
 * @param {number} color - Palette index (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setDecorationRawColor256 = color => setCommands(getDecorationRawColor256(color));
/** Sets decoration 256-color by standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setDecorationStdColor256 = color => setCommands(getDecorationStdColor256(color));
/** Sets decoration 256-color by bright standard color.
 * @param {string|number} color - Color name or number.
 * @returns {string} SGR escape sequence.
 */
export const setDecorationBrightStdColor256 = color => setCommands(getDecorationBrightStdColor256(color));
/** Sets decoration 256-color by 6x6x6 RGB.
 * @param {number} r - Red (0-5).
 * @param {number} g - Green (0-5).
 * @param {number} b - Blue (0-5).
 * @returns {string} SGR escape sequence.
 */
export const setDecorationColor6 = (r, g, b) => setCommands(getDecorationColor6(r, g, b));
/** Sets decoration 256-color by RGB.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setDecorationColor256 = (r, g, b) => setCommands(getDecorationColor256(r, g, b));
/** Sets decoration 256-color by hex.
 * @param {number} hex - Hex color value.
 * @returns {string} SGR escape sequence.
 */
export const setDecorationHexColor256 = hex => setCommands(getDecorationHexColor256(hex));
/** Sets decoration 256-color gray by index.
 * @param {number} i - Gray index (0-23).
 * @returns {string} SGR escape sequence.
 */
export const setDecorationGrayColor24 = i => setCommands(getDecorationGrayColor24(i));
/** Sets decoration 256-color gray by intensity.
 * @param {number} i - Gray intensity (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setDecorationGrayColor256 = i => setCommands(getDecorationGrayColor256(i));

/** Returns decoration true color command array.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string[]}
 */
export const getDecorationTrueColor = (r, g, b) => [Commands.DECORATION_COLOR, ColorFormat.TRUE_COLOR, r, g, b];
/** Returns decoration true color command array from hex.
 * @param {number} hex - Hex color value.
 * @returns {string[]}
 */
export const getDecorationHexTrueColor = hex =>
  getDecorationTrueColor((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);

/** Sets decoration true color.
 * @param {number} r - Red (0-255).
 * @param {number} g - Green (0-255).
 * @param {number} b - Blue (0-255).
 * @returns {string} SGR escape sequence.
 */
export const setDecorationTrueColor = (r, g, b) => setCommands(getDecorationTrueColor(r, g, b));
/** Sets decoration true color from hex.
 * @param {number} hex - Hex color value.
 * @returns {string} SGR escape sequence.
 */
export const setDecorationHexTrueColor = hex => setCommands(getDecorationHexTrueColor(hex));
