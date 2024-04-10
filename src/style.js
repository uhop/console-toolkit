import {
  Commands,
  Colors,
  colorNumber,
  colorStdRgb,
  getColor,
  getBrightColor,
  getBgColor,
  getBgBrightColor,
  ColorFormat,
  getRawColor256,
  getColor256,
  getHexColor256,
  getColor6,
  getGrayColor256,
  getGrayColor24,
  getTrueColor,
  getHexTrueColor,
  getBgBrightStdRgb,
  getBgRawColor256,
  getBgColor256,
  getBgHexColor256,
  getBgColor6,
  getBgGrayColor256,
  getBgGrayColor24,
  getBgTrueColor,
  getBgHexTrueColor,
  getDecorationRawColor256,
  getDecorationColor256,
  getDecorationHexColor256,
  getDecorationColor6,
  getDecorationGrayColor256,
  getDecorationGrayColor24,
  getDecorationTrueColor,
  getDecorationHexTrueColor,
  getBrightStdRgb,
  getStdRgb,
  getDecorationStdColor256,
  FgColorOptions,
  BgColorOptions,
  DecorationColorOptions
} from './ansi/sgr.js';
import {
  RESET_STATE,
  combineStates,
  addCommandsToState,
  stateTransition,
  stateReverseTransition,
  stringifyCommands,
  optimize
} from './ansi/sgr-state.js';
import {matchCsi} from './ansi/csi.js';
import {capitalize, toCamelCase, fromSnakeCase, addGetter, addAlias, addAliases} from './meta.js';

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
    return this.make(this[options].default);
  }
  // standard colors: defined externally
  // get red() {
  //   return this.make([this[optionsSymbol].base, ColorFormat.COLOR_256, (this[isBrightSymbol] ? 8 : 0) + Colors.RED]);
  // }
  // get brightRed() {
  //   return this.make([this[optionsSymbol].base, ColorFormat.COLOR_256, 8 + Colors.RED]);
  // }
  // 256 colors
  color(c) {
    return this.make(getRawColor256(c));
  }
  stdRgb256(r, g, b) {
    return this.make(getRawColor256((this[isBrightSymbol] ? 8 : 0) + colorStdRgb(r, g, b)));
  }
  brightStdRgb256(r, g, b) {
    return this.make(getRawColor256(8 + colorStdRgb(r, g, b)));
  }
  darkStdRgb256(r, g, b) {
    return this.make(getRawColor256(colorStdRgb(r, g, b)));
  }
  rgb256(r, g, b) {
    return this.make(getColor256(r, g, b));
  }
  hex256(hex) {
    return this.make(getHexColor256(hex));
  }
  rgb6(r, g, b) {
    return this.make(getColor6(r, g, b));
  }
  grayscale256(i) {
    return this.make(getGrayColor256(i));
  }
  grayscale24(i) {
    return this.make(getGrayColor24(i));
  }
  // true colors
  trueColor(r, g, b) {
    return this.make(getTrueColor(r, g, b));
  }
  trueGrayscale(i) {
    return this.make(getTrueColor(i, i, i));
  }
  hexTrueColor(hex) {
    return this.make(getHexTrueColor(hex));
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
addAlias(ExtendedColor, 'stdRgb', 'stdRgb256');
addAlias(ExtendedColor, 'brightStdRgb', 'brightStdRgb256');
addAlias(ExtendedColor, 'darkStdRgb', 'darkStdRgb256');

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
  //   return this.make((this[isBrightSymbol] ? this[optionsSymbol].brightBase : this[optionsSymbol].base) + Colors.RED);
  // }
  // get brightRed() {
  //   return this.make(this[optionsSymbol].brightBase + Colors.RED);
  // }
  stdRgb(r, g, b) {
    return this.make(
      (this[isBrightSymbol] ? this[optionsSymbol].brightBase : this[optionsSymbol].base) + colorStdRgb(r, g, b)
    );
  }
  brightStdRgb(r, g, b) {
    return this.make(this[optionsSymbol].brightBase + colorStdRgb(r, g, b));
  }
  darkStdRgb(r, g, b) {
    return this.make(this[optionsSymbol].base + colorStdRgb(r, g, b));
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
  //   return this.make(this[isBrightSymbol] ? getBrightColor(Colors.RED) : getColor(Colors.RED));
  // }
  stdRgb(r, g, b) {
    return this.make(this[isBrightSymbol] ? getBrightStdRgb(r, g, b) : getStdRgb(r, g, b));
  }
  brightStdRgb(r, g, b) {
    return this.make(getBrightStdRgb(r, g, b));
  }
  darkStdRgb(r, g, b) {
    return this.make(getStdRgb(r, g, b));
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
  constructor(initState = RESET_STATE, currentState, colorDepth = 24) {
    this[initStateSymbol] = initState;
    this[stateSymbol] = currentState || initState;
    this[colorDepthSymbol] = colorDepth;
  }
  make(newCommands = []) {
    if (!Array.isArray(newCommands)) newCommands = [newCommands];
    return new Style(this[initStateSymbol], addCommandsToState(this[stateSymbol], newCommands), this[colorDepthSymbol]);
  }
  add(commandSequence) {
    let state = this[stateSymbol];
    matchCsi.lastIndex = 0;
    for (const match of String(commandSequence).matchAll(matchCsi)) {
      if (match[3] !== 'm') continue;
      state = addCommandsToState(state, match[1].split(';'));
    }
    return state === this[stateSymbol] ? this : new Style(this[initStateSymbol], state, this[colorDepthSymbol]);
  }
  addState(state) {
    return new Style(this[initStateSymbol], combineStates(this[stateSymbol], state), this[colorDepthSymbol]);
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
    return new Color(this, FgColorOptions);
  }
  get bg() {
    return new Color(this, BgColorOptions);
  }
  get colorDecoration() {
    return new ExtendedColor(this, DecorationColorOptions);
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
    return this.make(getStdRgb(r, g, b));
  }
  brightStdRgb(r, g, b) {
    return this.make(getBrightStdRgb(r, g, b));
  }
  color(c) {
    return this.make(getRawColor256(c));
  }
  rgb256(r, g, b) {
    return this.make(getColor256(r, g, b));
  }
  hex256(hex) {
    return this.make(getHexColor256(hex));
  }
  rgb6(r, g, b) {
    return this.make(getColor6(r, g, b));
  }
  grayscale256(i) {
    return this.make(getGrayColor256(i));
  }
  grayscale24(i) {
    return this.make(getGrayColor24(i));
  }
  trueColor(r, g, b) {
    return this.make(getTrueColor(r, g, b));
  }
  trueGrayscale(i) {
    return this.make(getTrueColor(i, i, i));
  }
  hexTrueColor(hex) {
    return this.make(getHexTrueColor(hex));
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
    return this.make(getBgBrightStdRgb(r, g, b));
  }
  bgColor(c) {
    return this.make(getBgRawColor256(c));
  }
  bgRgb256(r, g, b) {
    return this.make(getBgColor256(r, g, b));
  }
  bgHex256(hex) {
    return this.make(getBgHexColor256(hex));
  }
  bgRgb6(r, g, b) {
    return this.make(getBgColor6(r, g, b));
  }
  bgGrayscale256(i) {
    return this.make(getBgGrayColor256(i));
  }
  bgGrayscale24(i) {
    return this.make(getBgGrayColor24(i));
  }
  bgTrueColor(r, g, b) {
    return this.make(getBgTrueColor(r, g, b));
  }
  bgTrueGrayscale(i) {
    return this.make(getBgTrueColor(i, i, i));
  }
  bgHexTrueColor(hex) {
    return this.make(getBgHexTrueColor(hex));
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
    return this.make(getDecorationStdColor256(r, g, b));
  }
  decorationBrightStdRgb256(r, g, b) {
    return this.make(getDecorationBrightStdColor256(r, g, b));
  }
  decorationColor(c) {
    return this.make(getDecorationRawColor256(c));
  }
  decorationRgb256(r, g, b) {
    return this.make(getDecorationColor256(r, g, b));
  }
  decorationHex256(hex) {
    return this.make(getDecorationHexColor256(hex));
  }
  decorationRgb6(r, g, b) {
    return this.make(getDecorationColor6(r, g, b));
  }
  decorationGrayscale256(i) {
    return this.make(getDecorationGrayColor256(i));
  }
  decorationGrayscale24(i) {
    return this.make(getDecorationGrayColor24(i));
  }
  decorationTrueColor(r, g, b) {
    return this.make(getDecorationTrueColor(r, g, b));
  }
  decorationTrueGrayscale(i) {
    return this.make(getDecorationTrueColor(i, i, i));
  }
  decorationHexTrueColor(hex) {
    return this.make(getDecorationHexTrueColor(hex));
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

for (const [name, value] of Object.entries(Colors)) {
  const nameLower = name.toLowerCase(),
    nameCap = capitalize(name);

  addGetter(ExtendedColor, nameLower, function () {
    return this.make([this[optionsSymbol].extended, ColorFormat.COLOR_256, (this[isBrightSymbol] ? 8 : 0) + value]);
  });
  addGetter(ExtendedColor, 'bright' + nameCap, function () {
    return this.make([this[optionsSymbol].extended, ColorFormat.COLOR_256, 8 + value]);
  });
  addGetter(ExtendedColor, 'dark' + nameCap, function () {
    return this.make([this[optionsSymbol].extended, ColorFormat.COLOR_256, value]);
  });

  addGetter(Color, nameLower, function () {
    return this.make(
      (this[isBrightSymbol] ? this[optionsSymbol].brightBase : this[optionsSymbol].base) + colorNumber(value)
    );
  });
  addGetter(Color, 'bright' + nameCap, function () {
    return this.make(this[optionsSymbol].brightBase + colorNumber(value));
  });
  addGetter(Color, 'dark' + nameCap, function () {
    return this.make(this[optionsSymbol].base + colorNumber(value));
  });

  addGetter(Bright, nameLower, function () {
    return this.make(this[isBrightSymbol] ? getBrightColor(value) : getColor(value));
  });
  addGetter(Bright, 'bright' + nameCap, make(getBrightColor(value)));
  addGetter(Bright, 'dark' + nameCap, make(getColor(value)));

  addGetter(Style, nameLower, make(getColor(value)));
  addGetter(Style, 'bright' + nameCap, make(getBrightColor(value)));
  addGetter(Style, 'bg' + nameCap, make(getBgColor(value)));
  addGetter(Style, 'bgBright' + nameCap, make(getBgBrightColor(value)));

  addAlias(Style, 'dark' + nameCap, nameLower);
  addAlias(Style, 'bgDark' + nameCap, 'bg' + nameCap);
}

addAliases(Style, {
  // method aliases
  addCommands: 'make',
  decoration: 'colorDecoration',

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

for (const [name, value] of Object.entries(Commands)) {
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

export const s = (strings, ...args) => {
  const callAsFunction = !Array.isArray(strings),
    initState = callAsFunction ? strings : {},
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
    ({result} = processStringConstant(strings, strings.length - 1, result, stack, style));
    return optimize(result, initState);
  };

  if (callAsFunction) return bq;
  return bq(strings, ...args);
};

// singleton
export const style = new Style({});

export default style;
