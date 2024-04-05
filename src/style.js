import {
  Commands,
  setCommands,
  Colors,
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
import {RESET_STATE, newState, stateTransition, stateReverseTransition} from './ansi/sgr-state.js';
import {matchCsi} from './ansi/csi.js';
import {capitalize, toCamelCase, fromSnakeCase, addGetter, addAlias} from './meta.js';

const styleSymbol = Symbol('styleObject'),
  isBrightSymbol = Symbol('isBright'),
  initStateSymbol = Symbol('initState'),
  currentStateSymbol = Symbol('currentState'),
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
    return this.make(getRawColor256((this[isBrightSymbol] ? 8 : 0) + (r ? 1 : 0) + (g ? 2 : 0) + (b ? 4 : 0)));
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
  //   return this.make((this[isBrightSymbol] ? this[optionsSymbol].brightBase : this[optionsSymbol].base) + Colors.RED]);
  // }
  // get brightRed() {
  //   return this.make(this[optionsSymbol].brightBase + Colors.RED]);
  // }
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
    this[currentStateSymbol] = currentState || initState;
    this[colorDepthSymbol] = colorDepth;
  }
  make(newCommands = []) {
    if (!Array.isArray(newCommands)) newCommands = [newCommands];
    return new Style(this[initStateSymbol], newState(newCommands, this[currentStateSymbol]), this[colorDepthSymbol]);
  }
  add(commandSequence) {
    let state = this[currentStateSymbol];
    matchCsi.lastIndex = 0;
    for (const match of String(commandSequence).matchAll(matchCsi)) {
      if (match[3] !== 'm') continue;
      state = newState(match[1].split(';'), state);
    }
    return state === this[currentStateSymbol] ? this : new Style(this[initStateSymbol], state, this[colorDepthSymbol]);
  }
  mark(fn) {
    fn(new Style(this[currentStateSymbol], null, this[colorDepthSymbol]));
    return this;
  }
  // color depth
  get colorDepth() {
    return this[colorDepthSymbol]; // 1, 4, 8, 24
  }
  setColorDepth(colorDepth) {
    return new Style(this[initStateSymbol], this[currentStateSymbol], colorDepth);
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
    let state = this[currentStateSymbol];
    const initialCommands = stateTransition(this[initStateSymbol], state);
    matchCsi.lastIndex = 0;
    for (const match of s.matchAll(matchCsi)) {
      if (match[3] !== 'm') continue;
      state = newState(match[1].split(';'), state);
    }
    const cleanupCommands = stateReverseTransition(this[initStateSymbol], state);
    return (
      (initialCommands.length ? setCommands(initialCommands) : '') +
      s +
      (cleanupCommands.length ? setCommands(cleanupCommands) : '')
    );
  }
  // convert to string
  toString() {
    const initialCommands = stateTransition(this[initStateSymbol], this[currentStateSymbol]);
    return initialCommands.length ? setCommands(initialCommands) : '';
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

addAlias(ExtendedColor, 'gray', 'brightBlack');
addAlias(ExtendedColor, 'grey', 'brightBlack');
addAlias(Style, 'gray', 'brightBlack');
addAlias(Style, 'grey', 'brightBlack');
addAlias(Style, 'bgGray', 'bgBrightBlack');
addAlias(Style, 'bgGrey', 'bgBrightBlack');

addAlias(ExtendedColor, 'greyscale', 'grayscale');
addAlias(ExtendedColor, 'greyscale24', 'grayscale24');
addAlias(ExtendedColor, 'greyscale256', 'grayscale256');
addAlias(ExtendedColor, 'trueGreyscale', 'trueGrayscale');
addAlias(Style, 'greyscale', 'grayscale');
addAlias(Style, 'greyscale24', 'grayscale24');
addAlias(Style, 'greyscale256', 'grayscale256');
addAlias(Style, 'trueGreyscale', 'trueGrayscale');
addAlias(Style, 'bgGreyscale', 'bgGrayscale');
addAlias(Style, 'bgGreyscale24', 'bgGrayscale24');
addAlias(Style, 'bgGreyscale256', 'bgGrayscale256');
addAlias(Style, 'bgTrueGreyscale', 'bgTrueGrayscale');
addAlias(Style, 'decorationGreyscale', 'decorationGrayscale');
addAlias(Style, 'decorationGreyscale24', 'decorationGrayscale24');
addAlias(Style, 'decorationGreyscale256', 'decorationGrayscale256');
addAlias(Style, 'decorationTrueGreyscale', 'decorationTrueGrayscale');

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

// singleton
export const style = new Style({});

export default style;
