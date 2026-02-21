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

export const ColorFormat: {
  COLOR_256: string;
  TRUE_COLOR: string;
};

export const ColorFormatSize: Record<string, number>;

export interface ColorOptions {
  base: number;
  brightBase: number;
  default: string;
  extended: string;
}

export const FgColorOptions: ColorOptions;
export const BgColorOptions: ColorOptions;
export const DecorationColorOptions: ColorOptions;

/** Checks if a command is a foreground color command. */
export function isFgColorCommand(command: string): boolean;
/** Checks if a command is a background color command. */
export function isBgColorCommand(command: string): boolean;
export function isFontCommand(command: string): boolean;

/** Returns the reset command for a given SGR command. */
export function reset(command: string | number): string | undefined;

/** Creates an SGR escape sequence from one or more commands. */
export function setCommands(commands: string | string[] | number): string;

/** Converts a color name or number to a standard color number (0-9). */
export function colorNumber(color: string | number): number;
export function colorStdRgb(r: number, g: number, b: number): number;

/** Returns the foreground color SGR code. */
export function getColor(color: string | number): number;
export function getBgColor(color: string | number): number;
export function getBrightColor(color: string | number): number;
export function getBgBrightColor(color: string | number): number;
export function getStdRgb(r: number, g: number, b: number): number;
export function getBgStdRgb(r: number, g: number, b: number): number;
export function getBrightStdRgb(r: number, g: number, b: number): number;
export function getBgBrightStdRgb(r: number, g: number, b: number): number;

export function setColor(color: string | number): string;
export function setBgColor(color: string | number): string;
export function setBrightColor(color: string | number): string;
export function setBgBrightColor(color: string | number): string;
export function setStdRgb(r: number, g: number, b: number): string;
export function setBgStdRgb(r: number, g: number, b: number): string;
export function setBrightStdRgb(r: number, g: number, b: number): string;
export function setBgBrightStdRgb(r: number, g: number, b: number): string;

export function fontNumber(font: number): number;
export function getFont(font: number): number;
export function setFont(font: number): string;

export function getRawColor256(color: number): string[];
export function getStdColor256(color: string | number): string[];
export function getBrightStdColor256(color: string | number): string[];
export function getColor6(r: number, g: number, b: number): string[];
export function getColor256(r: number, g: number, b: number): string[];
export function getHexColor256(hex: number): string[];
export function getGrayColor24(i: number): string[];
export function getGrayColor256(i: number): string[];

export function setRawColor256(color: number): string;
export function setStdColor256(color: string | number): string;
export function setBrightStdColor256(color: string | number): string;
export function setColor6(r: number, g: number, b: number): string;
export function setColor256(r: number, g: number, b: number): string;
export function setHexColor256(hex: number): string;
export function setGrayColor24(i: number): string;
export function setGrayColor256(i: number): string;

export function getBgRawColor256(color: number): string[];
export function getBgStdColor256(color: string | number): string[];
export function getBgBrightStdColor256(color: string | number): string[];
export function getBgColor6(r: number, g: number, b: number): string[];
export function getBgColor256(r: number, g: number, b: number): string[];
export function getBgHexColor256(hex: number): string[];
export function getBgGrayColor24(i: number): string[];
export function getBgGrayColor256(i: number): string[];

export function setBgRawColor256(color: number): string;
export function setBgStdColor256(color: string | number): string;
export function setBgBrightStdColor256(color: string | number): string;
export function setBgColor6(r: number, g: number, b: number): string;
export function setBgColor256(r: number, g: number, b: number): string;
export function setBgHexColor256(hex: number): string;
export function setBgGrayColor24(i: number): string;
export function setBgGrayColor256(i: number): string;

/** Returns the foreground true color (24-bit) SGR command array. */
export function getTrueColor(r: number, g: number, b: number): string[];
export function getHexTrueColor(hex: number): string[];
/** Returns the background true color (24-bit) SGR command array. */
export function getBgTrueColor(r: number, g: number, b: number): string[];
export function getBgHexTrueColor(hex: number): string[];

export function setTrueColor(r: number, g: number, b: number): string;
export function setHexTrueColor(hex: number): string;
export function setBgTrueColor(r: number, g: number, b: number): string;
export function setBgHexTrueColor(hex: number): string;

export function getDecorationRawColor256(color: number): string[];
export function getDecorationStdColor256(color: string | number): string[];
export function getDecorationBrightStdColor256(color: string | number): string[];
export function getDecorationColor6(r: number, g: number, b: number): string[];
export function getDecorationColor256(r: number, g: number, b: number): string[];
export function getDecorationHexColor256(hex: number): string[];
export function getDecorationGrayColor24(i: number): string[];
export function getDecorationGrayColor256(i: number): string[];

export function setDecorationRawColor256(color: number): string;
export function setDecorationStdColor256(color: string | number): string;
export function setDecorationBrightStdColor256(color: string | number): string;
export function setDecorationColor6(r: number, g: number, b: number): string;
export function setDecorationColor256(r: number, g: number, b: number): string;
export function setDecorationHexColor256(hex: number): string;
export function setDecorationGrayColor24(i: number): string;
export function setDecorationGrayColor256(i: number): string;

export function getDecorationTrueColor(r: number, g: number, b: number): string[];
export function getDecorationHexTrueColor(hex: number): string[];

export function setDecorationTrueColor(r: number, g: number, b: number): string;
export function setDecorationHexTrueColor(hex: number): string;
