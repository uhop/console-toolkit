/** RegExp matching SGR (Select Graphics Rendition) escape sequences. */
export const matchSgr: RegExp;

/** Standard color name-to-number mapping. */
export const Colors: {
  BLACK: 0;
  RED: 1;
  GREEN: 2;
  YELLOW: 3;
  BLUE: 4;
  MAGENTA: 5;
  CYAN: 6;
  WHITE: 7;
  DEFAULT: 9;
};

/** SGR command code constants. */
export const Commands: {
  RESET_ALL: string;
  BOLD: string;
  DIM: string;
  ITALIC: string;
  UNDERLINE: string;
  BLINK: string;
  RAPID_BLINK: string;
  INVERSE: string;
  HIDDEN: string;
  STRIKETHROUGH: string;
  DEFAULT_FONT: string;
  RESET_FONT: string;
  FONT_GOTHIC: string;
  RESET_BOLD: string;
  RESET_DIM: string;
  RESET_ITALIC: string;
  RESET_UNDERLINE: string;
  RESET_BLINK: string;
  RESET_RAPID_BLINK: string;
  RESET_INVERSE: string;
  RESET_HIDDEN: string;
  RESET_STRIKETHROUGH: string;
  CURLY_UNDERLINE: string;
  RESET_CURLY_UNDERLINE: string;
  DOUBLE_UNDERLINE: string;
  RESET_DOUBLE_UNDERLINE: string;
  EXTENDED_COLOR: string;
  BG_EXTENDED_COLOR: string;
  DEFAULT_COLOR: string;
  BG_DEFAULT_COLOR: string;
  RESET_COLOR: string;
  RESET_BG_COLOR: string;
  OVERLINE: string;
  RESET_OVERLINE: string;
  DECORATION_COLOR: string;
  DECORATION_DEFAULT_COLOR: string;
  RESET_DECORATION_COLOR: string;
};

/** Color format identifiers for extended colors. */
export const ColorFormat: {
  /** 256-color mode identifier. */
  COLOR_256: string;
  /** True color (24-bit) mode identifier. */
  TRUE_COLOR: string;
};

/** Maps color format identifiers to their parameter count. */
export const ColorFormatSize: Record<string, number>;

/** Configuration for a color category (foreground, background, or decoration). */
export interface ColorOptions {
  /** Base SGR code for standard colors. */
  base: number;
  /** Base SGR code for bright colors. */
  brightBase: number;
  /** SGR command for default color. */
  default: string;
  /** SGR command for extended color prefix. */
  extended: string;
}

/** Foreground color configuration. */
export const FgColorOptions: ColorOptions;
/** Background color configuration. */
export const BgColorOptions: ColorOptions;
/** Decoration (underline) color configuration. */
export const DecorationColorOptions: ColorOptions;

/** Checks if a command is a foreground color command.
 * @param command - The SGR command string.
 * @returns True if it is a foreground color command.
 */
export function isFgColorCommand(command: string): boolean;
/** Checks if a command is a background color command.
 * @param command - The SGR command string.
 * @returns True if it is a background color command.
 */
export function isBgColorCommand(command: string): boolean;
/** Checks if a command is a font command.
 * @param command - The SGR command string.
 * @returns True if it is a font command.
 */
export function isFontCommand(command: string): boolean;

/** Returns the reset command for a given SGR command.
 * @param command - The SGR command string or number.
 * @returns The corresponding reset command, or `undefined` if none.
 */
export function reset(command: string | number): string | undefined;

/** Creates an SGR escape sequence from one or more commands.
 * @param commands - A single command, array of commands, or numeric code.
 * @returns The SGR escape sequence string.
 */
export function setCommands(commands: string | string[] | number): string;

/** Converts a color name or number to a standard color number (0-9).
 * @param color - Color name (e.g., 'red') or number.
 * @returns The standard color number.
 */
export function colorNumber(color: string | number): number;
/** Converts RGB values to a standard color number (0-7).
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns The standard color number from 0 to 7
 */
export function colorStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): number;

/** Returns the foreground color SGR code.
 * @param color - Color name or number.
 * @returns The SGR code.
 */
export function getColor(color: string | number): number;
/** Returns the background color SGR code.
 * @param color - Color name or number.
 * @returns The SGR code.
 */
export function getBgColor(color: string | number): number;
/** Returns the bright foreground color SGR code.
 * @param color - Color name or number.
 * @returns The SGR code.
 */
export function getBrightColor(color: string | number): number;
/** Returns the bright background color SGR code.
 * @param color - Color name or number.
 * @returns The SGR code.
 */
export function getBgBrightColor(color: string | number): number;
/** Returns the foreground standard RGB color SGR code.
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns The SGR code.
 */
export function getStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): number;
/** Returns the background standard RGB color SGR code.
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns The SGR code.
 */
export function getBgStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): number;
/** Returns the bright foreground standard RGB color SGR code.
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns The SGR code.
 */
export function getBrightStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): number;
/** Returns the bright background standard RGB color SGR code.
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns The SGR code.
 */
export function getBgBrightStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): number;

/** Sets the foreground color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setColor(color: string | number): string;
/** Sets the background color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setBgColor(color: string | number): string;
/** Sets the bright foreground color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setBrightColor(color: string | number): string;
/** Sets the bright background color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setBgBrightColor(color: string | number): string;
/** Sets the foreground standard RGB color.
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns SGR escape sequence.
 */
export function setStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): string;
/** Sets the background standard RGB color.
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns SGR escape sequence.
 */
export function setBgStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): string;
/** Sets the bright foreground standard RGB color.
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns SGR escape sequence.
 */
export function setBrightStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): string;
/** Sets the bright background standard RGB color.
 * @param r - Red component (truthy/falsy).
 * @param g - Green component (truthy/falsy).
 * @param b - Blue component (truthy/falsy).
 * @returns SGR escape sequence.
 */
export function setBgBrightStdRgb(r: number | boolean, g: number | boolean, b: number | boolean): string;

/** Converts a font number to a valid font index.
 * @param font - Font number.
 * @returns The font index.
 */
export function fontNumber(font: number): number;
/** Returns the SGR code for a font.
 * @param font - Font number.
 * @returns The SGR code.
 */
export function getFont(font: number): number;
/** Sets the font.
 * @param font - Font number.
 * @returns SGR escape sequence.
 */
export function setFont(font: number): string;

/** Returns foreground 256-color command array for a raw palette index.
 * @param color - Palette index (0-255).
 * @returns SGR command array.
 */
export function getRawColor256(color: number): string[];
/** Returns foreground 256-color command array for a standard color.
 * @param color - Color name or number.
 * @returns SGR command array.
 */
export function getStdColor256(color: string | number): string[];
/** Returns foreground 256-color command array for a bright standard color.
 * @param color - Color name or number.
 * @returns SGR command array.
 */
export function getBrightStdColor256(color: string | number): string[];
/** Returns foreground 256-color command array for a 6x6x6 RGB color.
 * @param r - Red component (0-5).
 * @param g - Green component (0-5).
 * @param b - Blue component (0-5).
 * @returns SGR command array.
 */
export function getColor6(r: number, g: number, b: number): string[];
/** Returns foreground 256-color command array for an RGB color.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR command array.
 */
export function getColor256(r: number, g: number, b: number): string[];
/** Returns foreground 256-color command array for a hex color.
 * @param hex - Hex color value (e.g., 0xFF0000).
 * @returns SGR command array.
 */
export function getHexColor256(hex: number): string[];
/** Returns foreground 256-color command array for a 24-shade gray.
 * @param i - Gray index (0-23).
 * @returns SGR command array.
 */
export function getGrayColor24(i: number): string[];
/** Returns foreground 256-color command array for a gray by intensity.
 * @param i - Gray intensity (0-255).
 * @returns SGR command array.
 */
export function getGrayColor256(i: number): string[];

/** Sets foreground 256-color by raw palette index.
 * @param color - Palette index (0-255).
 * @returns SGR escape sequence.
 */
export function setRawColor256(color: number): string;
/** Sets foreground 256-color by standard color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setStdColor256(color: string | number): string;
/** Sets foreground 256-color by bright standard color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setBrightStdColor256(color: string | number): string;
/** Sets foreground 256-color by 6x6x6 RGB.
 * @param r - Red (0-5).
 * @param g - Green (0-5).
 * @param b - Blue (0-5).
 * @returns SGR escape sequence.
 */
export function setColor6(r: number, g: number, b: number): string;
/** Sets foreground 256-color by RGB.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR escape sequence.
 */
export function setColor256(r: number, g: number, b: number): string;
/** Sets foreground 256-color by hex.
 * @param hex - Hex color value.
 * @returns SGR escape sequence.
 */
export function setHexColor256(hex: number): string;
/** Sets foreground 256-color gray by index.
 * @param i - Gray index (0-23).
 * @returns SGR escape sequence.
 */
export function setGrayColor24(i: number): string;
/** Sets foreground 256-color gray by intensity.
 * @param i - Gray intensity (0-255).
 * @returns SGR escape sequence.
 */
export function setGrayColor256(i: number): string;

/** Returns background 256-color command array for a raw palette index.
 * @param color - Palette index (0-255).
 * @returns SGR command array.
 */
export function getBgRawColor256(color: number): string[];
/** Returns background 256-color command array for a standard color.
 * @param color - Color name or number.
 * @returns SGR command array.
 */
export function getBgStdColor256(color: string | number): string[];
/** Returns background 256-color command array for a bright standard color.
 * @param color - Color name or number.
 * @returns SGR command array.
 */
export function getBgBrightStdColor256(color: string | number): string[];
/** Returns background 256-color command array for a 6x6x6 RGB color.
 * @param r - Red (0-5).
 * @param g - Green (0-5).
 * @param b - Blue (0-5).
 * @returns SGR command array.
 */
export function getBgColor6(r: number, g: number, b: number): string[];
/** Returns background 256-color command array for an RGB color.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR command array.
 */
export function getBgColor256(r: number, g: number, b: number): string[];
/** Returns background 256-color command array for a hex color.
 * @param hex - Hex color value.
 * @returns SGR command array.
 */
export function getBgHexColor256(hex: number): string[];
/** Returns background 256-color command array for a 24-shade gray.
 * @param i - Gray index (0-23).
 * @returns SGR command array.
 */
export function getBgGrayColor24(i: number): string[];
/** Returns background 256-color command array for a gray by intensity.
 * @param i - Gray intensity (0-255).
 * @returns SGR command array.
 */
export function getBgGrayColor256(i: number): string[];

/** Sets background 256-color by raw palette index.
 * @param color - Palette index (0-255).
 * @returns SGR escape sequence.
 */
export function setBgRawColor256(color: number): string;
/** Sets background 256-color by standard color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setBgStdColor256(color: string | number): string;
/** Sets background 256-color by bright standard color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setBgBrightStdColor256(color: string | number): string;
/** Sets background 256-color by 6x6x6 RGB.
 * @param r - Red (0-5).
 * @param g - Green (0-5).
 * @param b - Blue (0-5).
 * @returns SGR escape sequence.
 */
export function setBgColor6(r: number, g: number, b: number): string;
/** Sets background 256-color by RGB.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR escape sequence.
 */
export function setBgColor256(r: number, g: number, b: number): string;
/** Sets background 256-color by hex.
 * @param hex - Hex color value.
 * @returns SGR escape sequence.
 */
export function setBgHexColor256(hex: number): string;
/** Sets background 256-color gray by index.
 * @param i - Gray index (0-23).
 * @returns SGR escape sequence.
 */
export function setBgGrayColor24(i: number): string;
/** Sets background 256-color gray by intensity.
 * @param i - Gray intensity (0-255).
 * @returns SGR escape sequence.
 */
export function setBgGrayColor256(i: number): string;

/** Returns the foreground true color (24-bit) SGR command array.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR command array.
 */
export function getTrueColor(r: number, g: number, b: number): string[];
/** Returns the foreground true color command array from hex.
 * @param hex - Hex color value.
 * @returns SGR command array.
 */
export function getHexTrueColor(hex: number): string[];
/** Returns the background true color (24-bit) SGR command array.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR command array.
 */
export function getBgTrueColor(r: number, g: number, b: number): string[];
/** Returns the background true color command array from hex.
 * @param hex - Hex color value.
 * @returns SGR command array.
 */
export function getBgHexTrueColor(hex: number): string[];

/** Sets foreground true color.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR escape sequence.
 */
export function setTrueColor(r: number, g: number, b: number): string;
/** Sets foreground true color from hex.
 * @param hex - Hex color value.
 * @returns SGR escape sequence.
 */
export function setHexTrueColor(hex: number): string;
/** Sets background true color.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR escape sequence.
 */
export function setBgTrueColor(r: number, g: number, b: number): string;
/** Sets background true color from hex.
 * @param hex - Hex color value.
 * @returns SGR escape sequence.
 */
export function setBgHexTrueColor(hex: number): string;

/** Returns decoration 256-color command array for a raw palette index.
 * @param color - Palette index (0-255).
 * @returns SGR command array.
 */
export function getDecorationRawColor256(color: number): string[];
/** Returns decoration 256-color command array for a standard color.
 * @param color - Color name or number.
 * @returns SGR command array.
 */
export function getDecorationStdColor256(color: string | number): string[];
/** Returns decoration 256-color command array for a bright standard color.
 * @param color - Color name or number.
 * @returns SGR command array.
 */
export function getDecorationBrightStdColor256(color: string | number): string[];
/** Returns decoration 256-color command array for a 6x6x6 RGB color.
 * @param r - Red (0-5).
 * @param g - Green (0-5).
 * @param b - Blue (0-5).
 * @returns SGR command array.
 */
export function getDecorationColor6(r: number, g: number, b: number): string[];
/** Returns decoration 256-color command array for an RGB color.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR command array.
 */
export function getDecorationColor256(r: number, g: number, b: number): string[];
/** Returns decoration 256-color command array for a hex color.
 * @param hex - Hex color value.
 * @returns SGR command array.
 */
export function getDecorationHexColor256(hex: number): string[];
/** Returns decoration 256-color command array for a 24-shade gray.
 * @param i - Gray index (0-23).
 * @returns SGR command array.
 */
export function getDecorationGrayColor24(i: number): string[];
/** Returns decoration 256-color command array for a gray by intensity.
 * @param i - Gray intensity (0-255).
 * @returns SGR command array.
 */
export function getDecorationGrayColor256(i: number): string[];

/** Sets decoration 256-color by raw palette index.
 * @param color - Palette index (0-255).
 * @returns SGR escape sequence.
 */
export function setDecorationRawColor256(color: number): string;
/** Sets decoration 256-color by standard color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setDecorationStdColor256(color: string | number): string;
/** Sets decoration 256-color by bright standard color.
 * @param color - Color name or number.
 * @returns SGR escape sequence.
 */
export function setDecorationBrightStdColor256(color: string | number): string;
/** Sets decoration 256-color by 6x6x6 RGB.
 * @param r - Red (0-5).
 * @param g - Green (0-5).
 * @param b - Blue (0-5).
 * @returns SGR escape sequence.
 */
export function setDecorationColor6(r: number, g: number, b: number): string;
/** Sets decoration 256-color by RGB.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR escape sequence.
 */
export function setDecorationColor256(r: number, g: number, b: number): string;
/** Sets decoration 256-color by hex.
 * @param hex - Hex color value.
 * @returns SGR escape sequence.
 */
export function setDecorationHexColor256(hex: number): string;
/** Sets decoration 256-color gray by index.
 * @param i - Gray index (0-23).
 * @returns SGR escape sequence.
 */
export function setDecorationGrayColor24(i: number): string;
/** Sets decoration 256-color gray by intensity.
 * @param i - Gray intensity (0-255).
 * @returns SGR escape sequence.
 */
export function setDecorationGrayColor256(i: number): string;

/** Returns decoration true color command array.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR command array.
 */
export function getDecorationTrueColor(r: number, g: number, b: number): string[];
/** Returns decoration true color command array from hex.
 * @param hex - Hex color value.
 * @returns SGR command array.
 */
export function getDecorationHexTrueColor(hex: number): string[];

/** Sets decoration true color.
 * @param r - Red (0-255).
 * @param g - Green (0-255).
 * @param b - Blue (0-255).
 * @returns SGR escape sequence.
 */
export function setDecorationTrueColor(r: number, g: number, b: number): string;
/** Sets decoration true color from hex.
 * @param hex - Hex color value.
 * @returns SGR escape sequence.
 */
export function setDecorationHexTrueColor(hex: number): string;
