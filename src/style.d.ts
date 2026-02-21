import {SgrState} from './ansi/sgr-state.js';

export {RESET_STATE} from './ansi/sgr-state.js';

/** Methods available on color namespace objects (fg, bg, colorDecoration). */
interface ColorMethods {
  /** Sets color by standard color number.
   * @param c - Color number (0-9).
   * @returns A new Style.
   */
  color(c: number): Style;
  /** Sets 256-color by standard RGB.
   * @param r - Red (0-5).
   * @param g - Green (0-5).
   * @param b - Blue (0-5).
   * @returns A new Style.
   */
  stdRgb256(r: number, g: number, b: number): Style;
  /** Sets bright 256-color by standard RGB.
   * @returns A new Style.
   */
  brightStdRgb256(r: number, g: number, b: number): Style;
  /** Sets dark 256-color by standard RGB.
   * @returns A new Style.
   */
  darkStdRgb256(r: number, g: number, b: number): Style;
  /** Sets color by standard RGB (alias for stdRgb256).
   * @returns A new Style.
   */
  stdRgb(r: number, g: number, b: number): Style;
  /** Sets bright color by standard RGB (alias for brightStdRgb256).
   * @returns A new Style.
   */
  brightStdRgb(r: number, g: number, b: number): Style;
  /** Sets dark color by standard RGB (alias for darkStdRgb256).
   * @returns A new Style.
   */
  darkStdRgb(r: number, g: number, b: number): Style;
  /** Sets 256-color by RGB.
   * @param r - Red (0-255).
   * @param g - Green (0-255).
   * @param b - Blue (0-255).
   * @returns A new Style.
   */
  rgb256(r: number, g: number, b: number): Style;
  /** Sets 256-color by hex.
   * @param hex - Hex color value.
   * @returns A new Style.
   */
  hex256(hex: number): Style;
  /** Sets 256-color by 6x6x6 RGB.
   * @param r - Red (0-5).
   * @param g - Green (0-5).
   * @param b - Blue (0-5).
   * @returns A new Style.
   */
  rgb6(r: number, g: number, b: number): Style;
  /** Sets 256-color grayscale by intensity.
   * @param i - Intensity (0-255).
   * @returns A new Style.
   */
  grayscale256(i: number): Style;
  /** Sets 256-color grayscale by index.
   * @param i - Index (0-23).
   * @returns A new Style.
   */
  grayscale24(i: number): Style;
  /** Sets true color by RGB.
   * @param r - Red (0-255).
   * @param g - Green (0-255).
   * @param b - Blue (0-255).
   * @returns A new Style.
   */
  trueColor(r: number, g: number, b: number): Style;
  /** Sets true color grayscale.
   * @param i - Intensity (0-255).
   * @returns A new Style.
   */
  trueGrayscale(i: number): Style;
  /** Sets true color by hex.
   * @param hex - Hex color value.
   * @returns A new Style.
   */
  hexTrueColor(hex: number): Style;
  /** Sets color by RGB (auto-selects true color or 256-color based on depth).
   * @returns A new Style.
   */
  rgb(r: number, g: number, b: number): Style;
  /** Sets grayscale (auto-selects based on depth).
   * @param i - Intensity.
   * @returns A new Style.
   */
  grayscale(i: number): Style;
  /** Sets color by hex (auto-selects based on depth).
   * @param hex - Hex color value.
   * @returns A new Style.
   */
  hex(hex: number): Style;

  /** Switches to bright color mode. */
  readonly bright: this;
  /** Switches to dark (standard) color mode. */
  readonly dark: this;
  /** Resets to default color. */
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
  /**
   * @param initState - The initial SGR state (SgrState, string, or null for reset).
   * @param currentState - The current SGR state (defaults to initState).
   * @param colorDepth - Color depth (1, 4, 8, or 24; default: 24).
   */
  constructor(initState: SgrState | string | null, currentState?: SgrState | string | null, colorDepth?: number);

  /** Creates a new Style with additional SGR commands applied.
   * @param newCommands - SGR command(s) to add.
   * @returns A new Style.
   */
  make(newCommands?: string | number | (string | number)[]): Style;
  /** Alias for `make`. */
  addCommands: Style['make'];
  /** Adds SGR commands from an escape sequence string.
   * @param commandSequence - An ANSI escape sequence string.
   * @returns A new Style.
   */
  add(commandSequence: string): Style;
  /** Combines an SGR state into the current state.
   * @param state - State to combine (SgrState, string, or null).
   * @returns A new Style.
   */
  addState(state: SgrState | string | null): Style;
  /** Creates a new Style with the current state as the initial state.
   * @param fn - Optional callback receiving the new Style. If provided, returns `this` instead.
   * @returns A new Style, or `this` if `fn` is provided.
   */
  mark(fn?: (style: Style) => void): Style;
  /** Returns the initial state, or passes it to a callback.
   * @param fn - Optional callback. If provided, returns `this` instead.
   * @returns The initial SgrState, or `this` if `fn` is provided.
   */
  getInitialState(fn?: (state: SgrState) => void): SgrState | Style;
  /** Returns the current state, or passes it to a callback.
   * @param fn - Optional callback. If provided, returns `this` instead.
   * @returns The current SgrState, or `this` if `fn` is provided.
   */
  getState(fn?: (state: SgrState) => void): SgrState | Style;

  /** The color depth (1, 4, 8, or 24). */
  readonly colorDepth: number;
  /** Creates a new Style with a different color depth.
   * @param colorDepth - Color depth (1, 4, 8, or 24).
   * @returns A new Style.
   */
  setColorDepth(colorDepth: number): Style;

  /** Foreground color namespace. */
  readonly fg: ColorMethods;
  /** Background color namespace. */
  readonly bg: ColorMethods;
  /** Foreground color namespace (alias for `fg`). */
  readonly foreground: ColorMethods;
  /** Background color namespace (alias for `bg`). */
  readonly background: ColorMethods;
  /** Decoration (underline) color namespace. */
  readonly colorDecoration: ColorMethods;
  /** Decoration color namespace (alias for `colorDecoration`). */
  readonly decoration: ColorMethods;

  /** Reset namespace — each property returns a Style with that attribute reset. */
  readonly reset: {
    /** Resets all attributes. */
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

  /** Bright color namespace — provides bright standard colors and RGB methods. */
  readonly bright: {
    /** Returns the bright namespace (self-reference). */
    readonly bright: Style['bright'];
    /** Returns the dark namespace. */
    readonly dark: Style['bright'];
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

  /** Dark (standard) color namespace — mirrors bright namespace structure. */
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

  /** Wraps a string with SGR escape sequences for the current style.
   * @param s - The string to wrap.
   * @returns The styled string.
   */
  text(s: string): string;
  /** Wraps an array of strings with SGR escape sequences for the current style.
   * @param s - The strings to wrap.
   * @returns The styled strings.
   */
  text(s: string[]): string[];
  /** Converts the style to an SGR escape sequence string.
   * @returns The SGR escape sequence.
   */
  toString(): string;
}

/** Configuration for the `s` and `c` tagged template literal functions. */
interface BqStates {
  /** Initial SGR state for the template. */
  initState?: SgrState | string | null;
  /** SGR state to set before processing. */
  setState?: SgrState | string | null;
}

/** Tagged template literal function for styled text. Can be called directly or configured with states first. */
type BqFunction = {
  /** Direct tagged template usage.
   * @param strings - Template string parts.
   * @param args - Interpolated values.
   * @returns The styled string.
   */
  (strings: TemplateStringsArray, ...args: any[]): string;
  /** Configured usage — returns a tagged template function with the given states.
   * @param states - Initial and current SGR state configuration.
   * @returns A tagged template function.
   */
  (states: BqStates): (strings: TemplateStringsArray, ...args: any[]) => string;
};

/** Tagged template literal for styled text. Does NOT add cleanup codes at the end. */
export const s: BqFunction;
/** Tagged template literal for styled text. Adds cleanup codes at the end. */
export const c: BqFunction;

/** The default Style singleton with an empty initial state. */
export const style: Style;

export default style;
