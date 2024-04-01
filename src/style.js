import {
  Commands,
  setCommands,
  Colors,
  getColor,
  getBrightColor,
  getBgColor,
  getBrightBgColor,
  FORMAT_COLOR256,
  getColor256,
  getGrayColor256,
  getRawColor256,
  getTrueColor,
  getHexTrueColor,
  getBgColor256,
  getGrayBgColor256,
  getRawBgColor256,
  getTrueBgColor,
  getHexTrueBgColor
} from './sgr.js';
import {RESET_STATE, newState, stateToCommands, stateCommand} from './sgr-state.js';
import {matchCsi} from './csi.js';

// TODO: Add a helper for styling text.

const styleSymbol = Symbol('styleObject'),
  commands = Symbol('commands'),
  isBrightSymbol = Symbol('isBright'),
  initStateSymbol = Symbol('initState');

class ExtendedColor {
  constructor(styleObject, isBright) {
    this[styleSymbol] = styleObject;
    this[isBrightSymbol] = isBright;
  }
  // options: bright
  get bright() {
    this[isBrightSymbol] = true;
    return this;
  }
  // standard colors: defined externally
  // get red() {
  //   this[styleSymbol][commands].push(FORMAT_COLOR256, (this[isBrightSymbol] ? 8 : 0) + Colors.RED);
  //   return this[styleSymbol];
  // }
  // get brightRed() {
  //   this[styleSymbol][commands].push(FORMAT_COLOR256, 8 + Colors.RED);
  //   return this[styleSymbol];
  // }
  // 256 colors
  color(c) {
    this[styleSymbol][commands].push(...getRawColor256(c).slice(1));
    return this[styleSymbol];
  }
  rgb256(r, g, b) {
    this[styleSymbol][commands].push(...getColor256(r, g, b).slice(1));
    return this[styleSymbol];
  }
  gray(i) {
    this[styleSymbol][commands].push(...getGrayColor256(i).slice(1));
    return this[styleSymbol];
  }
  // true colors
  trueColor(r, g, b) {
    this[styleSymbol][commands].push(...getTrueColor(r, g, b).slice(1));
    return this[styleSymbol];
  }
  hexTrueColor(hex) {
    this[styleSymbol][commands].push(...getHexTrueColor(hex).slice(1));
    return this[styleSymbol];
  }
}

class Bright {
  constructor(styleObject) {
    this[styleSymbol] = styleObject;
  }
  // standard colors: defined externally
  // get red() {
  //   this[styleSymbol][commands].push(getBrightColor(Colors.RED));
  //   return this[styleSymbol];
  // }
}

class Reset {
  constructor(styleObject) {
    this[styleSymbol] = styleObject;
  }
  // resettable properties: defined externally
  // get all() {
  //   this[styleSymbol][commands].push(Commands.RESET_ALL);
  //   return this[styleSymbol];
  // }
}

export class Style {
  constructor(initState = RESET_STATE) {
    this[initStateSymbol] = initState;
    this[commands] = [];
  }
  // fg, bg, decoration, reset
  get fg() {
    this[commands].push(Commands.COLOR_EXTENDED);
    return new ExtendedColor(this);
  }
  get bg() {
    this[commands].push(Commands.BG_COLOR_EXTENDED);
    return new ExtendedColor(this);
  }
  get colorDecoration() {
    this[commands].push(Commands.COLOR_DECORATION);
    return new ExtendedColor(this);
  }
  get reset() {
    return new Reset(this);
  }
  get bright() {
    return new Bright(this);
  }
  // general commands: defined externally
  // color commands: defined externally
  color(c) {
    this[commands].push(...getRawColor256(c));
    return this;
  }
  rgb256(r, g, b) {
    this[commands].push(...getColor256(r, g, b));
    return this;
  }
  gray(i) {
    this[commands].push(...getGrayColor256(i));
    return this;
  }
  trueColor(r, g, b) {
    this[commands].push(...getTrueColor(r, g, b));
    return this;
  }
  hexTrueColor(hex) {
    this[commands].push(...getHexTrueColor(hex));
    return this;
  }
  bgColor(c) {
    this[commands].push(...getRawBgColor256(c));
    return this;
  }
  bgRgb256(r, g, b) {
    this[commands].push(...getBgColor256(r, g, b));
    return this;
  }
  bgGray(i) {
    this[commands].push(...getGrayBgColor256(i));
    return this;
  }
  trueBgColor(r, g, b) {
    this[commands].push(...getTrueBgColor(r, g, b));
    return this;
  }
  hexTrueBgColor(hex) {
    this[commands].push(...getHexTrueBgColor(hex));
    return this;
  }
  decorationColor(c) {
    this[commands].push(...getDecorationRawColor256(c));
    return this;
  }
  rgb256(r, g, b) {
    this[commands].push(...getDecorationColor256(r, g, b));
    return this;
  }
  gray(i) {
    this[commands].push(...getDecorationGrayColor256(i));
    return this;
  }
  trueColor(r, g, b) {
    this[commands].push(...getDecorationTrueColor(r, g, b));
    return this;
  }
  hexTrueColor(hex) {
    this[commands].push(...getHexDecorationTrueColor(hex));
    return this;
  }
  // wrap a string
  text(s) {
    const initialState = newState(this[commands], this[initStateSymbol]);
    let state = initialState;
    matchCsi.lastIndex = 0;
    for (const match of s.matchAll(matchCsi)) {
      if (match[3] !== 'm') continue;
      state = newState(match[1].split(';'), state);
    }
    const initialCommands = stateCommand(this[initStateSymbol], state),
      finalCommands = stateCommand(state, this[initStateSymbol]);
    return (
      (initialCommands.length ? setCommands(initialCommands) : '') +
      s +
      (finalCommands.length ? setCommands(finalCommands) : '')
    );
  }
  // convert to string
  toString() {
    const commandsSoFar = stateToCommands(newState(this[commands], this[initStateSymbol]));
    return commandsSoFar.length ? setCommands(commandsSoFar) : '';
  }
}

// utilities

const capitalize = name => (name ? name[0].toUpperCase() + name.substring(1).toLowerCase() : name);
const toCamelCase = names => names.map((name, index) => (index ? capitalize(name) : name.toLowerCase())).join('');

// add color names to ExtendedColor, Bright and Style

for (const [name, value] of Object.entries(Colors)) {
  Object.defineProperty(ExtendedColor.prototype, name.toLowerCase(), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[styleSymbol][commands].push(FORMAT_COLOR256, (this[isBrightSymbol] ? 8 : 0) + value);
      return this[styleSymbol];
    }
  });
  Object.defineProperty(ExtendedColor.prototype, 'bright' + capitalize(name), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[styleSymbol][commands].push(FORMAT_COLOR256, 8 + value);
      return this[styleSymbol];
    }
  });
  Object.defineProperty(Bright.prototype, name.toLowerCase(), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[styleSymbol][commands].push(getBrightColor(value));
      return this[styleSymbol];
    }
  });
  Object.defineProperty(Style.prototype, name.toLowerCase(), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[commands].push(getColor(value));
      return this;
    }
  });
  Object.defineProperty(Style.prototype, 'bright' + capitalize(name), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[commands].push(getBrightColor(value));
      return this;
    }
  });
  Object.defineProperty(Style.prototype, 'bg' + capitalize(name), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[commands].push(getBgColor(value));
      return this;
    }
  });
  Object.defineProperty(Style.prototype, 'bgBright' + capitalize(name), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[commands].push(getBrightBgColor(value));
      return this;
    }
  });
}

// add reset commands to Reset

for (const [name, value] of Object.entries(Commands)) {
  if (!name.startsWith('RESET_')) continue;
  Object.defineProperty(Reset.prototype, toCamelCase(name.substring(6).split('_')), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[styleSymbol][commands].push(value);
      return this[styleSymbol];
    }
  });
}

// add commands to Style

const skipCommands = {COLOR_EXTENDED: 1, BG_COLOR_EXTENDED: 1, COLOR_DECORATION: 1};

for (const [name, value] of Object.entries(Commands)) {
  if (skipCommands[name] === 1) continue;
  Object.defineProperty(Style.prototype, toCamelCase(name.split('_')), {
    configurable: true,
    enumerable: true,
    get: function () {
      this[commands].push(value);
      return this;
    }
  });
}

export default Style;