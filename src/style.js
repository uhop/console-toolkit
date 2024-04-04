import {
  Commands,
  setCommands,
  Colors,
  getColor,
  getBrightColor,
  getBgColor,
  getBrightBgColor,
  FORMAT_COLOR256,
  getRawColor256,
  getColor256,
  getColor6,
  getGrayColor256,
  getGrayColor24,
  getTrueColor,
  getHexTrueColor,
  getRawBgColor256,
  getBgColor256,
  getBgColor6,
  getGrayBgColor256,
  getGrayBgColor24,
  getTrueBgColor,
  getHexTrueBgColor,
  getDecorationRawColor256,
  getDecorationColor256,
  getDecorationColor6,
  getDecorationGrayColor256,
  getDecorationGrayColor24,
  getDecorationTrueColor,
  getDecorationHexTrueColor
} from './ansi/sgr.js';
import {RESET_STATE, newState, stateToCommands, stateTransition} from './ansi/sgr-state.js';
import {matchCsi} from './ansi/csi.js';
import {capitalize, toCamelCase, fromSnakeCase, addGetter, addAlias} from './meta.js';

const styleSymbol = Symbol('styleObject'),
  commands = Symbol('commands'),
  parentSymbol = Symbol('parent'),
  isBrightSymbol = Symbol('isBright'),
  initStateSymbol = Symbol('initState');

class ExtendedColor {
  constructor(styleObject, isBright) {
    this[styleSymbol] = styleObject;
    this[isBrightSymbol] = isBright;
  }
  make(newCommands) {
    return this[styleSymbol].make(newCommands);
  }
  // options: bright
  get bright() {
    this[isBrightSymbol] = true;
    return this;
  }
  // standard colors: defined externally
  // get red() {
  //   return this.make([FORMAT_COLOR256, (this[isBrightSymbol] ? 8 : 0) + Colors.RED]);
  // }
  // get brightRed() {
  //   return this.make([FORMAT_COLOR256, 8 + Colors.RED]);
  // }
  // 256 colors
  color(c) {
    return this.make(getRawColor256(c).slice(1));
  }
  rgb256(r, g, b) {
    return this.make(getColor256(r, g, b).slice(1));
  }
  rgb6(r, g, b) {
    return this.make(getColor6(r, g, b).slice(1));
  }
  grayscale256(i) {
    return this.make(getGrayColor256(i).slice(1));
  }
  grayscale24(i) {
    return this.make(getGrayColor24(i).slice(1));
  }
  // true colors
  trueColor(r, g, b) {
    return this.make(getTrueColor(r, g, b).slice(1));
  }
  grayscale(i) {
    return this.make(getTrueColor(i, i, i).slice(1));
  }
  hexTrueColor(hex) {
    return this.make(getHexTrueColor(hex).slice(1));
  }
}

class Bright {
  constructor(styleObject) {
    this[styleSymbol] = styleObject;
  }
  make(newCommands) {
    return this[styleSymbol].make(newCommands);
  }
  // standard colors: defined externally
  // get red() {
  //   return this.make(getBrightColor(Colors.RED));
  // }
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

const collectCommands = style =>
  style[parentSymbol] ? collectCommands(style[parentSymbol]).concat(style[commands]) : style[commands];

export class Style {
  constructor(initState = RESET_STATE, newCommands, parent = null) {
    this[initStateSymbol] = initState;
    this[commands] = newCommands || [];
    this[parentSymbol] = parent;
  }
  make(newCommands = []) {
    return new Style(this[initStateSymbol], Array.isArray(newCommands) ? newCommands : [newCommands], this);
  }
  // fg, bg, decoration, reset, bright
  get fg() {
    const newStyle = this.make(Commands.COLOR_EXTENDED);
    return new ExtendedColor(newStyle);
  }
  get bg() {
    const newStyle = this.make(Commands.BG_COLOR_EXTENDED);
    return new ExtendedColor(newStyle);
  }
  get colorDecoration() {
    const newStyle = this.make(Commands.COLOR_DECORATION);
    return new ExtendedColor(newStyle);
  }
  get reset() {
    return new Reset(this);
  }
  get bright() {
    return new Bright(this);
  }
  // general commands: defined externally
  get resetAll() {
    return this.make('');
  }
  // color commands: defined externally
  color(c) {
    return this.make(getRawColor256(c));
  }
  rgb256(r, g, b) {
    return this.make(getColor256(r, g, b));
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
  grayscale(i) {
    return this.make(getTrueColor(i, i, i));
  }
  hexTrueColor(hex) {
    return this.make(getHexTrueColor(hex));
  }
  bgColor(c) {
    return this.make(getRawBgColor256(c));
  }
  bgRgb256(r, g, b) {
    return this.make(getBgColor256(r, g, b));
  }
  bgRgb6(r, g, b) {
    return this.make(getBgColor6(r, g, b));
  }
  bgGrayscale256(i) {
    return this.make(getGrayBgColor256(i));
  }
  bgGrayscale24(i) {
    return this.make(getGrayBgColor24(i));
  }
  trueBgColor(r, g, b) {
    return this.make(getTrueBgColor(r, g, b));
  }
  bgGrayscale(i) {
    return this.make(getTrueBgColor(i, i, i));
  }
  hexTrueBgColor(hex) {
    return this.make(getHexTrueBgColor(hex));
  }
  decorationColor(c) {
    return this.make(getDecorationRawColor256(c));
  }
  decorationRgb256(r, g, b) {
    return this.make(getDecorationColor256(r, g, b));
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
  decorationGrayscale(i) {
    return this.make(getDecorationTrueColor(i, i, i));
  }
  decorationHexTrueColor(hex) {
    return this.make(getDecorationHexTrueColor(hex));
  }
  // wrap a string
  text(s) {
    const commandsSoFar = collectCommands(this),
      initialState = newState(commandsSoFar, this[initStateSymbol]);
    let state = initialState;
    matchCsi.lastIndex = 0;
    for (const match of s.matchAll(matchCsi)) {
      if (match[3] !== 'm') continue;
      state = newState(match[1].split(';'), state);
    }
    const initialCommands = stateTransition(this[initStateSymbol], state),
      finalCommands = stateTransition(state, this[initStateSymbol]);
    return (
      (initialCommands.length ? setCommands(initialCommands) : '') +
      s +
      (finalCommands.length ? setCommands(finalCommands) : '')
    );
  }
  // convert to string
  toString() {
    const commandsSoFar = collectCommands(this),
      optimizedCommands = stateToCommands(newState(commandsSoFar, this[initStateSymbol]));
    return optimizedCommands.length ? setCommands(optimizedCommands) : '';
  }
}

// add color names to ExtendedColor, Bright and Style

const make = value =>
  function () {
    return this.make(value);
  };

for (const [name, value] of Object.entries(Colors)) {
  addGetter(ExtendedColor, name.toLowerCase(), function () {
    return this.make([FORMAT_COLOR256, (this[isBrightSymbol] ? 8 : 0) + value]);
  });
  addGetter(ExtendedColor, 'bright' + capitalize(name), make([FORMAT_COLOR256, 8 + value]));
  addGetter(Bright, name.toLowerCase(), make(getBrightColor(value)));
  addGetter(Style, name.toLowerCase(), make(getColor(value)));
  addGetter(Style, 'bright' + capitalize(name), make(getBrightColor(value)));
  addGetter(Style, 'bg' + capitalize(name), make(getBgColor(value)));
  addGetter(Style, 'bgBright' + capitalize(name), make(getBrightBgColor(value)));
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
addAlias(Style, 'greyscale', 'grayscale');
addAlias(Style, 'greyscale24', 'grayscale24');
addAlias(Style, 'greyscale256', 'grayscale256');
addAlias(Style, 'bgGreyscale', 'bgGrayscale');
addAlias(Style, 'bgGreyscale24', 'bgGrayscale24');
addAlias(Style, 'bgGreyscale256', 'bgGrayscale256');
addAlias(Style, 'decorationGreyscale', 'decorationGrayscale');
addAlias(Style, 'decorationGreyscale24', 'decorationGrayscale24');
addAlias(Style, 'decorationGreyscale256', 'decorationGrayscale256');

addAlias(ExtendedColor, 'rgb', 'trueColor');
addAlias(Style, 'rgb', 'trueColor');
addAlias(Style, 'bgRgb', 'trueBgColor');
addAlias(Style, 'decorationRgb', 'decorationTrueColor');

addAlias(ExtendedColor, 'hex', 'hexTrueColor');
addAlias(Style, 'hex', 'hexTrueColor');
addAlias(Style, 'bgHex', 'hexTrueBgColor');
addAlias(Style, 'decorationHex', 'decorationHexTrueColor');

// add commands to Reset, Style

const skipCommands = {COLOR_EXTENDED: 1, BG_COLOR_EXTENDED: 1, COLOR_DECORATION: 1};

for (const [name, value] of Object.entries(Commands)) {
  if (name.startsWith('RESET_')) {
    addGetter(Reset, toCamelCase(fromSnakeCase(name).slice(1)), make(value));
  }
  if (skipCommands[name] !== 1) {
    addGetter(Style, toCamelCase(fromSnakeCase(name)), make(value));
  }
}

// singleton
export const style = new Style();

export default style;
