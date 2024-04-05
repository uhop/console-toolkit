// Support for states based on SGR commands. See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.

import {Commands, ColorFormatSize, isFgColorCommand, isBgColorCommand, isFontCommand} from './sgr.js';

export const RESET_STATE = {
  bold: null,
  italic: null,
  underline: null,
  blink: null,
  inverse: null,
  hidden: null,
  strikethrough: null,
  overline: null,
  foreground: null,
  background: null,
  decoration: null,
  font: null
};

const TOTAL_RESETS = Array.from(Object.keys(RESET_STATE)).length;

const getStateResets = state => {
  let resetCount = 0;

  for (const name of Object.keys(RESET_STATE)) {
    if (state[name] === null) ++resetCount;
  }

  return resetCount;
};

export const combineStates = (...states) => {
  let state = {};
  for (const currentState of states) {
    for (const [name, value] of Object.entries(currentState)) {
      if (value !== undefined) state[name] = value;
    }
  }
  return state;
};

export const newState = (commands, state = {}) => {
  for (let i = 0; i < commands.length; ++i) {
    const currentCommand = commands[i];
    switch (currentCommand) {
      case '': // reset
      case Commands.RESET_ALL:
        state = RESET_STATE;
        continue;
      case Commands.BOLD:
      case Commands.DIM:
        state = {...state, bold: currentCommand};
        continue;
      case Commands.ITALIC:
        state = {...state, italic: currentCommand};
        continue;
      case Commands.UNDERLINE:
      case Commands.DOUBLE_UNDERLINE:
      case Commands.CURLY_UNDERLINE:
        state = {...state, underline: currentCommand};
        continue;
      case Commands.BLINK:
      case Commands.RAPID_BLINK:
        state = {...state, blink: currentCommand};
        continue;
      case Commands.INVERSE:
        state = {...state, inverse: currentCommand};
        continue;
      case Commands.HIDDEN:
        state = {...state, hidden: currentCommand};
        continue;
      case Commands.STRIKETHROUGH:
        state = {...state, strikethrough: currentCommand};
        continue;
      case Commands.OVERLINE:
        state = {...state, overline: currentCommand};
        continue;
      case Commands.RESET_BOLD:
        // case Commands.RESET_DIM:
        state = {...state, bold: null};
        continue;
      case Commands.RESET_ITALIC:
        state = {...state, italic: null};
        continue;
      case Commands.RESET_UNDERLINE:
        // case Commands.RESET_DOUBLE_UNDERLINE:
        // case Commands.RESET_CURLY_UNDERLINE:
        state = {...state, underline: null};
        continue;
      case Commands.RESET_BLINK:
        // case RESET_RAPID_BLINK:
        state = {...state, blink: null};
        continue;
      case Commands.RESET_INVERSE:
        state = {...state, inverse: null};
        continue;
      case Commands.RESET_HIDDEN:
        state = {...state, hidden: null};
        continue;
      case Commands.RESET_STRIKETHROUGH:
        state = {...state, strikethrough: null};
        continue;
      case Commands.RESET_OVERLINE:
        state = {...state, overline: null};
        continue;
      case Commands.RESET_DECORATION_COLOR:
        state = {...state, decoration: null};
        continue;
      case Commands.EXTENDED_COLOR: {
        const next = ColorFormatSize[commands[i + 1]],
          color = commands.slice(i, i + next);
        i += next - 1;
        state = {...state, foreground: color};
        continue;
      }
      case Commands.BG_EXTENDED_COLOR: {
        const next = ColorFormatSize[commands[i + 1]],
          color = commands.slice(i, i + next);
        i += next - 1;
        state = {...state, background: color};
        continue;
      }
      case Commands.DECORATION_COLOR: {
        const next = ColorFormatSize[commands[i + 1]],
          color = commands.slice(i, i + next);
        i += next - 1;
        state = {...state, decoration: color};
        continue;
      }
      case Commands.DEFAULT_COLOR:
        state = {...state, foreground: null};
        continue;
      case Commands.BG_DEFAULT_COLOR:
        state = {...state, background: null};
        continue;
      case Commands.DEFAULT_FONT:
        state = {...state, font: null};
        continue;
    }
    if (isFgColorCommand(currentCommand)) {
      state = {...state, foreground: currentCommand};
      continue;
    }
    if (isBgColorCommand(currentCommand)) {
      state = {...state, background: currentCommand};
      continue;
    }
    if (isFontCommand(currentCommand)) {
      state = {...state, font: currentCommand};
      continue;
    }
  }
  return state;
};

const equalColors = (a, b) => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b))
    return a.length === b.length && a.every((value, index) => value === b[index]);
  return false;
};

const pushColor = (commands, color) => {
  if (Array.isArray(color)) {
    commands.push(...color);
  } else {
    commands.push(color);
  }
  return commands;
};

const resetColorProperties = {
  foreground: Commands.RESET_COLOR,
  background: Commands.RESET_BG_COLOR,
  decoration: Commands.RESET_DECORATION_COLOR
};

export const stateToCommands = state => {
  const commands = [];
  let resetCount = 0;

  for (const [name, value] of Object.entries(state)) {
    if (resetColorProperties.hasOwnProperty(name)) {
      // colors
      if (value === null) {
        commands.push(resetColorProperties[name]);
        ++resetCount;
        continue;
      }
      pushColor(commands, value);
      continue;
    }
    if (value === null) {
      commands.push(Commands['RESET_' + name.toUpperCase()]);
      ++resetCount;
      continue;
    }
    commands.push(value);
  }

  return resetCount === TOTAL_RESETS ? [''] : commands;
};

export const stateTransition = (prev, next) => {
  const commands = [];
  let resetCount = 0;

  for (const name of Object.keys(RESET_STATE)) {
    const value = next[name];
    if (resetColorProperties.hasOwnProperty(name)) {
      // color
      if (value === null) {
        if (prev[name] !== null) commands.push(resetColorProperties[name]);
        ++resetCount;
        continue;
      }
      if (value) {
        if (!equalColors(prev[name], value)) pushColor(commands, value);
      }
      continue;
    }
    if (value === null) {
      if (prev[name] !== null) commands.push(Commands['RESET_' + name.toUpperCase()]);
      ++resetCount;
      continue;
    }
    if (value) {
      if (prev[name] !== value) commands.push(value);
    }
  }

  if (resetCount === TOTAL_RESETS) {
    const prevResets = getStateResets(prev);
    return prevResets === TOTAL_RESETS ? [] : [''];
  }

  return commands;
};

export const stateReverseTransition = (prev, next) => {
  const commands = [];
  let resetCount = 0;

  for (const name of Object.keys(RESET_STATE)) {
    const value = prev[name];
    if (resetColorProperties.hasOwnProperty(name)) {
      // color
      if (!value) {
        if (next[name]) commands.push(resetColorProperties[name]);
        ++resetCount;
        continue;
      }
      if (!equalColors(next[name], value)) pushColor(commands, value);
      continue;
    }
    if (!value) {
      if (next[name]) commands.push(Commands['RESET_' + name.toUpperCase()]);
      ++resetCount;
      continue;
    }
    if (next[name] !== value) commands.push(value);
  }

  if (resetCount === TOTAL_RESETS) {
    const nextResets = getStateResets(next);
    return nextResets === TOTAL_RESETS ? [] : [''];
  }

  return commands;
};
