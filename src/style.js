import * as sgr from './ansi/sgr.js';
import {
  RESET_STATE,
  combineStates,
  addCommandsToState,
  stateTransition,
  stateReverseTransition,
  stringifyCommands,
  toState,
  optimize,
  extractState
} from './ansi/sgr-state.js';
import {matchCsi} from './ansi/csi.js';
import {capitalize, toCamelCase, fromSnakeCase, addGetter, addAliases, addGetters} from './meta.js';

export {RESET_STATE};

const styleSymbol = Symbol('styleObject'),
  isBrightSymbol = Symbol('isBright'),
  initStateSymbol = Symbol('initState'),
  stateSymbol = Symbol('currentState'),
  colorDepthSymbol = Symbol('colorDepth'),
  optionsSymbol = Symbol('options');

class ExtendedColor {
  constructor(styleObject, options, isBright) {
    this[styleSymbol] = styleObject;
    this[optionsSymbol] = options;
    this[isBrightSymbol] = isBright;
  }
  make(newCommands) {
    if (Array.isArray(newCommands)) newCommands[0] = this[optionsSymbol].extended;
    return this[styleSymbol].make(newCommands);
  }
  // options: bright
  get bright() {
    return new ExtendedColor(this[styleSymbol], this[optionsSymbol], true);
  }
  get dark() {
    return new ExtendedColor(this[styleSymbol], this[optionsSymbol], false);
  }
  get default() {
    return this.make(this[optionsSymbol].default);
  }
  // standard colors: defined externally
  // get red() {
  //   return this.make([this[optionsSymbol].base, sgr.ColorFormat.COLOR_256, (this[isBrightSymbol] ? 8 : 0) + sgr.Colors.RED]);
  // }
  // get brightRed() {
  //   return this.make([this[optionsSymbol].base, sgr.ColorFormat.COLOR_256, 8 + sgr.Colors.RED]);
  // }
  // 256 colors
  color(c) {
    return this.make(sgr.getRawColor256(c));
  }
  stdRgb256(r, g, b) {
    return this.make(sgr.getRawColor256((this[isBrightSymbol] ? 8 : 0) + sgr.colorStdRgb(r, g, b)));
  }
  brightStdRgb256(r, g, b) {
    return this.make(sgr.getRawColor256(8 + sgr.colorStdRgb(r, g, b)));
  }
  darkStdRgb256(r, g, b) {
    return this.make(sgr.getRawColor256(sgr.colorStdRgb(r, g, b)));
  }
  rgb256(r, g, b) {
    return this.make(sgr.getColor256(r, g, b));
  }
  hex256(hex) {
    return this.make(sgr.getHexColor256(hex));
  }
  rgb6(r, g, b) {
    return this.make(sgr.getColor6(r, g, b));
  }
  grayscale256(i) {
    return this.make(sgr.getGrayColor256(i));
  }
  grayscale24(i) {
    return this.make(sgr.getGrayColor24(i));
  }
  // true colors
  trueColor(r, g, b) {
    return this.make(sgr.getTrueColor(r, g, b));
  }
  trueGrayscale(i) {
    return this.make(sgr.getTrueColor(i, i, i));
  }
  hexTrueColor(hex) {
    return this.make(sgr.getHexTrueColor(hex));
  }
  // composite
  rgb(r, g, b) {
    return this[styleSymbol][colorDepthSymbol] > 8 ? this.trueColor(r, g, b) : this.rgb256(r, g, b);
  }
  grayscale(i) {
    return this[styleSymbol][colorDepthSymbol] > 8 ? this.trueGrayscale(i) : this.grayscale256(i);
  }
  hex(hex) {
    return this[styleSymbol][colorDepthSymbol] > 8 ? this.hexTrueColor(hex) : this.hex256(hex);
  }
}
addAliases(ExtendedColor, {stdRgb: 'stdRgb256', brightStdRgb: 'brightStdRgb256', darkStdRgb: 'darkStdRgb256'});

class Color extends ExtendedColor {
  // options: bright
  get bright() {
    return new Color(this[styleSymbol], this[optionsSymbol], true);
  }
  get dark() {
    return new Color(this[styleSymbol], this[optionsSymbol], false);
  }
  // standard colors: defined externally
  // get red() {
  //   return this.make((this[isBrightSymbol] ? this[optionsSymbol].brightBase : this[optionsSymbol].base) + sgr.Colors.RED);
  // }
  // get brightRed() {
  //   return this.make(this[optionsSymbol].brightBase + sgr.Colors.RED);
  // }
  stdRgb(r, g, b) {
    return this.make(
      (this[isBrightSymbol] ? this[optionsSymbol].brightBase : this[optionsSymbol].base) + sgr.colorStdRgb(r, g, b)
    );
  }
  brightStdRgb(r, g, b) {
    return this.make(this[optionsSymbol].brightBase + sgr.colorStdRgb(r, g, b));
  }
  darkStdRgb(r, g, b) {
    return this.make(this[optionsSymbol].base + sgr.colorStdRgb(r, g, b));
  }
}

class Bright {
  constructor(styleObject, isBright) {
    this[styleSymbol] = styleObject;
    this[isBrightSymbol] = isBright;
  }
  make(newCommands) {
    return this[styleSymbol].make(newCommands);
  }
  // options: bright
  get bright() {
    return new Bright(this[styleSymbol], true);
  }
  get dark() {
    return new Bright(this[styleSymbol], false);
  }
  // standard colors: defined externally
  // get red() {
  //   return this.make(this[isBrightSymbol] ? sgr.getBrightColor(sgr.Colors.RED) : sgr.getColor(sgr.Colors.RED));
  // }
  stdRgb(r, g, b) {
    return this.make(this[isBrightSymbol] ? sgr.getBrightStdRgb(r, g, b) : sgr.getStdRgb(r, g, b));
  }
  brightStdRgb(r, g, b) {
    return this.make(sgr.getBrightStdRgb(r, g, b));
  }
  darkStdRgb(r, g, b) {
    return this.make(sgr.getStdRgb(r, g, b));
  }
}

class Reset {
  constructor(styleObject) {
    this[styleSymbol] = styleObject;
  }
  make(newCommands) {
    return this[styleSymbol].make(newCommands);
  }
  // resettable properties: defined externally
  get all() {
    return this.make('');
  }
}

export class Style {
  constructor(initState = null, currentState, colorDepth = 24) {
    this[initStateSymbol] = toState(initState);
    this[stateSymbol] = currentState ? toState(currentState) : this[initStateSymbol];
    this[colorDepthSymbol] = colorDepth;
  }
  make(newCommands = []) {
    if (!Array.isArray(newCommands)) newCommands = [newCommands];
    return new Style(this[initStateSymbol], addCommandsToState(this[stateSymbol], newCommands), this[colorDepthSymbol]);
  }
  add(commandSequence) {
    const state = extractState(String(commandSequence), this[stateSymbol]);
    return state === this[stateSymbol] ? this : new Style(this[initStateSymbol], state, this[colorDepthSymbol]);
  }
  addState(state) {
    return new Style(this[initStateSymbol], combineStates(this[stateSymbol], toState(state)), this[colorDepthSymbol]);
  }
  mark(fn) {
    const newStyle = new Style(this[stateSymbol], null, this[colorDepthSymbol]);
    if (typeof fn != 'function') return newStyle;
    fn(newStyle);
    return this;
  }
  getInitialState(fn) {
    if (typeof fn != 'function') return this[initStateSymbol];
    fn(this[initStateSymbol]);
    return this;
  }
  getState(fn) {
    if (typeof fn != 'function') return this[stateSymbol];
    fn(this[stateSymbol]);
    return this;
  }
  // color depth
  get colorDepth() {
    return this[colorDepthSymbol]; // 1, 4, 8, 24
  }
  setColorDepth(colorDepth) {
    return new Style(this[initStateSymbol], this[stateSymbol], colorDepth);
  }
  // fg, bg, decoration, reset, bright
  get fg() {
    return new Color(this, sgr.FgColorOptions);
  }
  get bg() {
    return new Color(this, sgr.BgColorOptions);
  }
  get colorDecoration() {
    return new ExtendedColor(this, sgr.DecorationColorOptions);
  }
  get reset() {
    return new Reset(this);
  }
  get bright() {
    return new Bright(this, true);
  }
  get dark() {
    return new Bright(this, false);
  }
  // general commands: defined externally
  get resetAll() {
    return this.make('');
  }
  // color commands: defined externally
  stdRgb(r, g, b) {
    return this.make(sgr.getStdRgb(r, g, b));
  }
  brightStdRgb(r, g, b) {
    return this.make(sgr.getBrightStdRgb(r, g, b));
  }
  color(c) {
    return this.make(sgr.getRawColor256(c));
  }
  rgb256(r, g, b) {
    return this.make(sgr.getColor256(r, g, b));
  }
  hex256(hex) {
    return this.make(sgr.getHexColor256(hex));
  }
  rgb6(r, g, b) {
    return this.make(sgr.getColor6(r, g, b));
  }
  grayscale256(i) {
    return this.make(sgr.getGrayColor256(i));
  }
  grayscale24(i) {
    return this.make(sgr.getGrayColor24(i));
  }
  trueColor(r, g, b) {
    return this.make(sgr.getTrueColor(r, g, b));
  }
  trueGrayscale(i) {
    return this.make(sgr.getTrueColor(i, i, i));
  }
  hexTrueColor(hex) {
    return this.make(sgr.getHexTrueColor(hex));
  }
  rgb(r, g, b) {
    return this[colorDepthSymbol] > 8 ? this.trueColor(r, g, b) : this.rgb256(r, g, b);
  }
  grayscale(i) {
    return this[colorDepthSymbol] > 8 ? this.trueGrayscale(i) : this.grayscale256(i);
  }
  hex(hex) {
    return this[colorDepthSymbol] > 8 ? this.hexTrueColor(hex) : this.hex256(hex);
  }
  bgStdRgb(r, g, b) {
    return this.make(getBgStdRgb(r, g, b));
  }
  bgBrightStdRgb(r, g, b) {
    return this.make(sgr.getBgBrightStdRgb(r, g, b));
  }
  bgColor(c) {
    return this.make(sgr.getBgRawColor256(c));
  }
  bgRgb256(r, g, b) {
    return this.make(sgr.getBgColor256(r, g, b));
  }
  bgHex256(hex) {
    return this.make(sgr.getBgHexColor256(hex));
  }
  bgRgb6(r, g, b) {
    return this.make(sgr.getBgColor6(r, g, b));
  }
  bgGrayscale256(i) {
    return this.make(sgr.getBgGrayColor256(i));
  }
  bgGrayscale24(i) {
    return this.make(sgr.getBgGrayColor24(i));
  }
  bgTrueColor(r, g, b) {
    return this.make(sgr.getBgTrueColor(r, g, b));
  }
  bgTrueGrayscale(i) {
    return this.make(sgr.getBgTrueColor(i, i, i));
  }
  bgHexTrueColor(hex) {
    return this.make(sgr.getBgHexTrueColor(hex));
  }
  bgRgb(r, g, b) {
    return this[colorDepthSymbol] > 8 ? this.bgTrueColor(r, g, b) : this.bgRgb256(r, g, b);
  }
  bgGrayscale(i) {
    return this[colorDepthSymbol] > 8 ? this.bgTrueGrayscale(i) : this.bgGrayscale256(i);
  }
  bgHex(hex) {
    return this[colorDepthSymbol] > 8 ? this.bgHexTrueColor(hex) : this.bgHex256(hex);
  }
  decorationStdRgb256(r, g, b) {
    return this.make(sgr.getDecorationStdColor256(r, g, b));
  }
  decorationBrightStdRgb256(r, g, b) {
    return this.make(getDecorationBrightStdColor256(r, g, b));
  }
  decorationColor(c) {
    return this.make(sgr.getDecorationRawColor256(c));
  }
  decorationRgb256(r, g, b) {
    return this.make(sgr.getDecorationColor256(r, g, b));
  }
  decorationHex256(hex) {
    return this.make(sgr.getDecorationHexColor256(hex));
  }
  decorationRgb6(r, g, b) {
    return this.make(sgr.getDecorationColor6(r, g, b));
  }
  decorationGrayscale256(i) {
    return this.make(sgr.getDecorationGrayColor256(i));
  }
  decorationGrayscale24(i) {
    return this.make(sgr.getDecorationGrayColor24(i));
  }
  decorationTrueColor(r, g, b) {
    return this.make(sgr.getDecorationTrueColor(r, g, b));
  }
  decorationTrueGrayscale(i) {
    return this.make(sgr.getDecorationTrueColor(i, i, i));
  }
  decorationHexTrueColor(hex) {
    return this.make(sgr.getDecorationHexTrueColor(hex));
  }
  decorationRgb(r, g, b) {
    return this[colorDepthSymbol] > 8 ? this.decorationTrueColor(r, g, b) : this.decorationRgb256(r, g, b);
  }
  decorationGrayscale(i) {
    return this[colorDepthSymbol] > 8 ? this.decorationTrueGrayscale(i) : this.decorationGrayscale256(i);
  }
  decorationHex(hex) {
    return this[colorDepthSymbol] > 8 ? this.decorationHexTrueColor(hex) : this.decorationHex256(hex);
  }
  // wrap a string
  text(s) {
    s = String(s);
    let state = this[stateSymbol];
    const initialCommands = stateTransition(this[initStateSymbol], state);
    matchCsi.lastIndex = 0;
    for (const match of s.matchAll(matchCsi)) {
      if (match[3] !== 'm') continue;
      state = addCommandsToState(state, match[1].split(';'));
    }
    const cleanupCommands = stateReverseTransition(this[initStateSymbol], state);
    return stringifyCommands(initialCommands) + s + stringifyCommands(cleanupCommands);
  }
  // convert to string
  toString() {
    const initialCommands = stateTransition(this[initStateSymbol], this[stateSymbol]);
    return stringifyCommands(initialCommands);
  }
}

// add color names to ExtendedColor, Bright and Style

const make = value =>
  function () {
    return this.make(value);
  };

for (const [name, value] of Object.entries(sgr.Colors)) {
  const nameLower = name.toLowerCase(),
    nameCap = capitalize(name);

  addGetters(ExtendedColor, {
    [nameLower]: function () {
      return this.make([this[optionsSymbol].extended, sgr.ColorFormat.COLOR_256, (this[isBrightSymbol] ? 8 : 0) + value]);
    },
    ['bright' + nameCap]: function () {
      return this.make([this[optionsSymbol].extended, sgr.ColorFormat.COLOR_256, 8 + value]);
    },
    ['dark' + nameCap]: function () {
      return this.make([this[optionsSymbol].extended, sgr.ColorFormat.COLOR_256, value]);
    }
  });

  addGetters(Color, {
    [nameLower]: function () {
      return this.make(
        (this[isBrightSymbol] ? this[optionsSymbol].brightBase : this[optionsSymbol].base) + sgr.colorNumber(value)
      );
    },
    ['bright' + nameCap]: function () {
      return this.make(this[optionsSymbol].brightBase + sgr.colorNumber(value));
    },
    ['dark' + nameCap]: function () {
      return this.make(this[optionsSymbol].base + sgr.colorNumber(value));
    }
  });

  addGetters(Bright, {
    [nameLower]: function () {
      return this.make(this[isBrightSymbol] ? sgr.getBrightColor(value) : sgr.getColor(value));
    },
    ['bright' + nameCap]: make(sgr.getBrightColor(value)),
    ['dark' + nameCap]: make(sgr.getColor(value))
  });

  addGetters(Style, {
    [nameLower]: make(sgr.getColor(value)),
    ['bright' + nameCap]: make(sgr.getBrightColor(value)),
    ['bg' + nameCap]: make(sgr.getBgColor(value)),
    ['bgBright' + nameCap]: make(sgr.getBgBrightColor(value))
  });

  addAliases(Style, {['dark' + nameCap]: nameLower, ['bgDark' + nameCap]: 'bg' + nameCap});
}

addAliases(Style, {
  // method aliases
  addCommands: 'make',
  decoration: 'colorDecoration',
  foreground: 'fg',
  background: 'bg',

  // color aliases
  gray: 'brightBlack',
  bgGray: 'bgBrightBlack',

  // alias "gray" to "grey"
  grey: 'brightBlack',
  bgGrey: 'bgBrightBlack',
  greyscale: 'grayscale',
  greyscale24: 'grayscale24',
  greyscale256: 'grayscale256',
  trueGreyscale: 'trueGrayscale',
  bgGreyscale: 'bgGrayscale',
  bgGreyscale24: 'bgGrayscale24',
  bgGreyscale256: 'bgGrayscale256',
  bgTrueGreyscale: 'bgTrueGrayscale',
  decorationGreyscale: 'decorationGrayscale',
  decorationGreyscale24: 'decorationGrayscale24',
  decorationGreyscale256: 'decorationGrayscale256',
  decorationTrueGreyscale: 'decorationTrueGrayscale'
});

addAliases(ExtendedColor, {
  // color aliases
  gray: 'brightBlack',

  // alias "gray" to "grey"
  grey: 'brightBlack',
  greyscale: 'grayscale',
  greyscale24: 'grayscale24',
  greyscale256: 'grayscale256',
  trueGreyscale: 'trueGrayscale'
});

addAliases(Color, {
  // color aliases
  gray: 'brightBlack',

  // alias "gray" to "grey"
  grey: 'brightBlack'
});

// add commands to Reset, Style

const skipCommands = {EXTENDED_COLOR: 1, BG_EXTENDED_COLOR: 1, DECORATION_COLOR: 1};

for (const [name, value] of Object.entries(sgr.Commands)) {
  if (name.startsWith('RESET_')) {
    addGetter(Reset, toCamelCase(fromSnakeCase(name).slice(1)), make(value));
  }
  if (skipCommands[name] !== 1) {
    addGetter(Style, toCamelCase(fromSnakeCase(name)), make(value));
  }
}

// the back quote function

const matchOps = /\{\{([\.\w]+)\}\}/g;

const processPart = s => {
  s = String(s);
  const result = [];
  let start = (matchOps.lastIndex = 0);
  for (const match of s.matchAll(matchOps)) {
    result.push(s.substring(start, match.index), match[1].split('.'));
    start = match.index + match[0].length;
  }
  if (start < s.length) result.push(s.substring(start));
  return result;
};

const processStringConstant = (strings, i, result, stack, style) => {
  const pos = () => (i < strings.length ? 'string before argument #' + i : 'string after the last argument');
  for (const input of processPart(strings[i])) {
    if (typeof input == 'string') {
      // process a string
      style = style.add(input);
      result += style + input;
      style = style.mark();
      continue;
    }
    // process commands
    for (const command of input) {
      switch (command) {
        case 'save':
          const setupCommands = stateTransition(style[initStateSymbol], style[stateSymbol]);
          result += stringifyCommands(setupCommands);
          stack.push(style);
          style = style.mark();
          continue;
        case 'restore':
          {
            const newStyle = style;
            style = stack.pop();
            if (!style) throw new ReferenceError(`Unmatched restore (${pos()})`);
            const cleanupCommands = stateReverseTransition(style[stateSymbol], newStyle[stateSymbol]);
            result += stringifyCommands(cleanupCommands);
            style = style.mark();
          }
          continue;
      }
      style = style[command];
      if (!style) throw new TypeError(`Wrong style property: "${command}" (${pos()})`);
    }
    if (!(style instanceof Style)) throw new TypeError(`The final object is not Style (${pos()})`);
    result += style;
    style = style.mark();
  }
  return {result, style};
};

const makeBq = clear => (strings, ...args) => {
  const callAsFunction = !Array.isArray(strings),
    initState = callAsFunction && strings,
    stack = [];
  let style = new Style(initState);

  const bq = (strings, ...args) => {
    let result = '';
    for (let i = 0; i < args.length; ++i) {
      // process a string constant
      ({result, style} = processStringConstant(strings, i, result, stack, style));
      // process an argument
      const arg = args[i];
      if (typeof arg == 'function') {
        style = arg(style);
        if (!(style instanceof Style)) throw new TypeError(`The returned object is not Style (argument #${i})`);
        result += style;
        style = style.mark();
        continue;
      }
      const input = String(arg);
      style = style.add(input);
      result += input;
      style = style.mark();
    }
    ({result, style} = processStringConstant(strings, strings.length - 1, result, stack, style));
    if (clear) {
        const cleanupCommands = stateReverseTransition(initState, style[stateSymbol]);
        result += stringifyCommands(cleanupCommands);
    }
    return optimize(result, initState);
  };

  if (callAsFunction) return bq;
  return bq(strings, ...args);
};

export const s = makeBq();
export const c = makeBq(true);

// singleton
export const style = new Style({});

export default style;
