import {SgrState} from './ansi/sgr-state.js';

export {RESET_STATE} from './ansi/sgr-state.js';

/** Methods available on color namespace objects (fg, bg, colorDecoration). */
interface ColorMethods {
  color(c: number): Style;
  stdRgb256(r: number, g: number, b: number): Style;
  brightStdRgb256(r: number, g: number, b: number): Style;
  darkStdRgb256(r: number, g: number, b: number): Style;
  stdRgb(r: number, g: number, b: number): Style;
  brightStdRgb(r: number, g: number, b: number): Style;
  darkStdRgb(r: number, g: number, b: number): Style;
  rgb256(r: number, g: number, b: number): Style;
  hex256(hex: number): Style;
  rgb6(r: number, g: number, b: number): Style;
  grayscale256(i: number): Style;
  grayscale24(i: number): Style;
  trueColor(r: number, g: number, b: number): Style;
  trueGrayscale(i: number): Style;
  hexTrueColor(hex: number): Style;
  rgb(r: number, g: number, b: number): Style;
  grayscale(i: number): Style;
  hex(hex: number): Style;

  readonly bright: this;
  readonly dark: this;
  readonly default: Style;

  // standard color getters
  readonly black: Style;
  readonly red: Style;
  readonly green: Style;
  readonly yellow: Style;
  readonly blue: Style;
  readonly magenta: Style;
  readonly cyan: Style;
  readonly white: Style;
  readonly brightBlack: Style;
  readonly brightRed: Style;
  readonly brightGreen: Style;
  readonly brightYellow: Style;
  readonly brightBlue: Style;
  readonly brightMagenta: Style;
  readonly brightCyan: Style;
  readonly brightWhite: Style;
  readonly darkBlack: Style;
  readonly darkRed: Style;
  readonly darkGreen: Style;
  readonly darkYellow: Style;
  readonly darkBlue: Style;
  readonly darkMagenta: Style;
  readonly darkCyan: Style;
  readonly darkWhite: Style;
  readonly gray: Style;
  readonly grey: Style;
}

/** Chainable API for building SGR (Select Graphics Rendition) states.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-style}
 */
export class Style {
  /** @param initState - The initial SGR state.
   * @param currentState - The current SGR state (defaults to initState).
   * @param colorDepth - Color depth (1, 4, 8, or 24).
   */
  constructor(initState: any, currentState?: any, colorDepth?: number);

  /** Creates a new Style with additional SGR commands applied. */
  make(newCommands?: string | number | (string | number)[]): Style;
  addCommands: Style['make'];
  /** Adds SGR commands from an escape sequence string. */
  add(commandSequence: string): Style;
  /** Combines an SGR state into the current state. */
  addState(state: any): Style;
  /** Creates a new Style with the current state as the initial state. */
  mark(fn?: (style: Style) => void): Style;
  /** Returns the initial state, or passes it to a callback. */
  getInitialState(fn?: (state: SgrState) => void): SgrState | Style;
  /** Returns the current state, or passes it to a callback. */
  getState(fn?: (state: SgrState) => void): SgrState | Style;

  /** The color depth (1, 4, 8, or 24). */
  readonly colorDepth: number;
  /** Creates a new Style with a different color depth. */
  setColorDepth(colorDepth: number): Style;

  readonly fg: ColorMethods;
  readonly bg: ColorMethods;
  readonly foreground: ColorMethods;
  readonly background: ColorMethods;
  readonly colorDecoration: ColorMethods;
  readonly decoration: ColorMethods;

  readonly reset: {
    readonly all: Style;
    readonly bold: Style;
    readonly dim: Style;
    readonly italic: Style;
    readonly underline: Style;
    readonly blink: Style;
    readonly rapidBlink: Style;
    readonly inverse: Style;
    readonly hidden: Style;
    readonly strikethrough: Style;
    readonly overline: Style;
    readonly color: Style;
    readonly bgColor: Style;
    readonly font: Style;
    readonly decorationColor: Style;
  };

  readonly bright: {
    readonly bright: any;
    readonly dark: any;
    readonly black: Style;
    readonly red: Style;
    readonly green: Style;
    readonly yellow: Style;
    readonly blue: Style;
    readonly magenta: Style;
    readonly cyan: Style;
    readonly white: Style;
    readonly brightBlack: Style;
    readonly brightRed: Style;
    readonly brightGreen: Style;
    readonly brightYellow: Style;
    readonly brightBlue: Style;
    readonly brightMagenta: Style;
    readonly brightCyan: Style;
    readonly brightWhite: Style;
    readonly darkBlack: Style;
    readonly darkRed: Style;
    readonly darkGreen: Style;
    readonly darkYellow: Style;
    readonly darkBlue: Style;
    readonly darkMagenta: Style;
    readonly darkCyan: Style;
    readonly darkWhite: Style;
    stdRgb(r: number, g: number, b: number): Style;
    brightStdRgb(r: number, g: number, b: number): Style;
    darkStdRgb(r: number, g: number, b: number): Style;
  };

  readonly dark: Style['bright'];

  // SGR command getters
  readonly resetAll: Style;
  readonly resetBold: Style;
  readonly resetDim: Style;
  readonly bold: Style;
  readonly dim: Style;
  readonly italic: Style;
  readonly underline: Style;
  readonly blink: Style;
  readonly rapidBlink: Style;
  readonly inverse: Style;
  readonly hidden: Style;
  readonly strikethrough: Style;
  readonly overline: Style;
  readonly defaultFont: Style;
  readonly resetFont: Style;
  readonly fontGothic: Style;
  readonly resetItalic: Style;
  readonly resetUnderline: Style;
  readonly resetBlink: Style;
  readonly resetRapidBlink: Style;
  readonly resetInverse: Style;
  readonly resetHidden: Style;
  readonly resetStrikethrough: Style;
  readonly curlyUnderline: Style;
  readonly resetCurlyUnderline: Style;
  readonly doubleUnderline: Style;
  readonly resetDoubleUnderline: Style;
  readonly defaultColor: Style;
  readonly bgDefaultColor: Style;
  readonly resetColor: Style;
  readonly resetBgColor: Style;
  readonly resetOverline: Style;
  readonly decorationDefaultColor: Style;
  readonly resetDecorationColor: Style;

  // standard color getters
  readonly black: Style;
  readonly red: Style;
  readonly green: Style;
  readonly yellow: Style;
  readonly blue: Style;
  readonly magenta: Style;
  readonly cyan: Style;
  readonly white: Style;
  readonly brightBlack: Style;
  readonly brightRed: Style;
  readonly brightGreen: Style;
  readonly brightYellow: Style;
  readonly brightBlue: Style;
  readonly brightMagenta: Style;
  readonly brightCyan: Style;
  readonly brightWhite: Style;
  readonly darkBlack: Style;
  readonly darkRed: Style;
  readonly darkGreen: Style;
  readonly darkYellow: Style;
  readonly darkBlue: Style;
  readonly darkMagenta: Style;
  readonly darkCyan: Style;
  readonly darkWhite: Style;
  readonly bgBlack: Style;
  readonly bgRed: Style;
  readonly bgGreen: Style;
  readonly bgYellow: Style;
  readonly bgBlue: Style;
  readonly bgMagenta: Style;
  readonly bgCyan: Style;
  readonly bgWhite: Style;
  readonly bgBrightBlack: Style;
  readonly bgBrightRed: Style;
  readonly bgBrightGreen: Style;
  readonly bgBrightYellow: Style;
  readonly bgBrightBlue: Style;
  readonly bgBrightMagenta: Style;
  readonly bgBrightCyan: Style;
  readonly bgBrightWhite: Style;
  readonly bgDarkBlack: Style;
  readonly bgDarkRed: Style;
  readonly bgDarkGreen: Style;
  readonly bgDarkYellow: Style;
  readonly bgDarkBlue: Style;
  readonly bgDarkMagenta: Style;
  readonly bgDarkCyan: Style;
  readonly bgDarkWhite: Style;
  readonly gray: Style;
  readonly grey: Style;
  readonly bgGray: Style;
  readonly bgGrey: Style;

  // fg color methods
  stdRgb(r: number, g: number, b: number): Style;
  brightStdRgb(r: number, g: number, b: number): Style;
  color(c: number): Style;
  rgb256(r: number, g: number, b: number): Style;
  hex256(hex: number): Style;
  rgb6(r: number, g: number, b: number): Style;
  grayscale256(i: number): Style;
  grayscale24(i: number): Style;
  trueColor(r: number, g: number, b: number): Style;
  trueGrayscale(i: number): Style;
  hexTrueColor(hex: number): Style;
  rgb(r: number, g: number, b: number): Style;
  grayscale(i: number): Style;
  hex(hex: number): Style;
  greyscale(i: number): Style;
  greyscale24(i: number): Style;
  greyscale256(i: number): Style;
  trueGreyscale(i: number): Style;

  // bg color methods
  bgStdRgb(r: number, g: number, b: number): Style;
  bgBrightStdRgb(r: number, g: number, b: number): Style;
  bgColor(c: number): Style;
  bgRgb256(r: number, g: number, b: number): Style;
  bgHex256(hex: number): Style;
  bgRgb6(r: number, g: number, b: number): Style;
  bgGrayscale256(i: number): Style;
  bgGrayscale24(i: number): Style;
  bgTrueColor(r: number, g: number, b: number): Style;
  bgTrueGrayscale(i: number): Style;
  bgHexTrueColor(hex: number): Style;
  bgRgb(r: number, g: number, b: number): Style;
  bgGrayscale(i: number): Style;
  bgHex(hex: number): Style;
  bgGreyscale(i: number): Style;
  bgGreyscale24(i: number): Style;
  bgGreyscale256(i: number): Style;
  bgTrueGreyscale(i: number): Style;

  // decoration color methods
  decorationStdRgb256(r: number, g: number, b: number): Style;
  decorationBrightStdRgb256(r: number, g: number, b: number): Style;
  decorationColor(c: number): Style;
  decorationRgb256(r: number, g: number, b: number): Style;
  decorationHex256(hex: number): Style;
  decorationRgb6(r: number, g: number, b: number): Style;
  decorationGrayscale256(i: number): Style;
  decorationGrayscale24(i: number): Style;
  decorationTrueColor(r: number, g: number, b: number): Style;
  decorationTrueGrayscale(i: number): Style;
  decorationHexTrueColor(hex: number): Style;
  decorationRgb(r: number, g: number, b: number): Style;
  decorationGrayscale(i: number): Style;
  decorationHex(hex: number): Style;
  decorationGreyscale(i: number): Style;
  decorationGreyscale24(i: number): Style;
  decorationGreyscale256(i: number): Style;
  decorationTrueGreyscale(i: number): Style;

  /** Wraps a string with SGR escape sequences for the current style. */
  text(s: string): string;
  /** Wraps an array of strings with SGR escape sequences for the current style. */
  text(s: string[]): string[];
  /** Converts the style to an SGR escape sequence string. */
  toString(): string;
}

/** Configuration for the `s` and `c` tagged template literal functions. */
interface BqStates {
  initState?: any;
  setState?: any;
}

type BqFunction = {
  (strings: TemplateStringsArray, ...args: any[]): string;
  (states: BqStates): (strings: TemplateStringsArray, ...args: any[]) => string;
};

/** Tagged template literal for styled text. Does NOT add cleanup codes at the end. */
export const s: BqFunction;
/** Tagged template literal for styled text. Adds cleanup codes at the end. */
export const c: BqFunction;

/** The default Style singleton with an empty initial state. */
export const style: Style;

export default style;
