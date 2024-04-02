// Support for states based on SGR commands. See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.

import {Commands, FORMAT_COLOR256, isFgColorCommand, isBgColorCommand, isFontCommand} from './sgr.js';

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

const TOTAL_RESETS = 12;

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
      case Commands.RESET_COLOR_DECORATION:
        state = {...state, decoration: null};
        continue;
      case Commands.COLOR_EXTENDED: {
        const next = commands[i + 1] === FORMAT_COLOR256 ? 3 : 5,
          color = commands.slice(i, i + next);
        i += next - 1;
        state = {...state, foreground: color};
        continue;
      }
      case Commands.BG_COLOR_EXTENDED: {
        const next = commands[i + 1] === FORMAT_COLOR256 ? 3 : 5,
          color = commands.slice(i, i + next);
        i += next - 1;
        state = {...state, background: color};
        continue;
      }
      case Commands.COLOR_DECORATION: {
        const next = commands[i + 1] === FORMAT_COLOR256 ? 3 : 5,
          color = commands.slice(i, i + next);
        i += next - 1;
        state = {...state, decoration: color};
        continue;
      }
      case Commands.COLOR_DEFAULT:
        state = {...state, foreground: null};
        continue;
      case Commands.BG_COLOR_DEFAULT:
        state = {...state, background: null};
        continue;
      case Commands.FONT_DEFAULT:
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
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  return a.length === b.length && a.every((value, index) => value === b[index]);
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
  decoration: Commands.RESET_COLOR_DECORATION
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

  return resetCount === TOTAL_RESETS ? [Commands.RESET_ALL] : commands;
};

const addCommands = (commands, prev, next, property, resetCommand) => {
  if (next[property]) {
    if (prev[property] !== next[property]) commands.push(next[property]);
  } else if (next[property] === null) {
    if (prev[property] !== null) commands.push(resetCommand);
  }
};

const addColorCommands = (commands, prev, next, property, resetCommand) => {
  if (next[property]) {
    if (!equalColors(prev[property], next[property])) pushColor(commands, next[property]);
  } else if (next[property] === null) {
    if (prev[property] !== null) commands.push(resetCommand);
  }
};

export const stateTransition = (prev, next) => {
  const commands = [],
    nextResets = getStateResets(next);

  if (nextResets === TOTAL_RESETS) {
    const prevResets = getStateResets(prev);
    if (prevResets !== TOTAL_RESETS) commands.push(Commands.RESET_ALL);
    return commands;
  }

  addCommands(commands, prev, next, 'bold', Commands.RESET_BOLD);
  addCommands(commands, prev, next, 'italic', Commands.RESET_ITALIC);
  addCommands(commands, prev, next, 'underline', Commands.RESET_UNDERLINE);
  addCommands(commands, prev, next, 'blink', Commands.RESET_BLINK);
  addCommands(commands, prev, next, 'inverse', Commands.RESET_INVERSE);
  addCommands(commands, prev, next, 'hidden', Commands.RESET_HIDDEN);
  addCommands(commands, prev, next, 'strikethrough', Commands.RESET_STRIKETHROUGH);
  addCommands(commands, prev, next, 'overline', Commands.RESET_OVERLINE);
  addCommands(commands, prev, next, 'font', Commands.RESET_FONT);

  addColorCommands(commands, prev, next, 'foreground', Commands.RESET_COLOR);
  addColorCommands(commands, prev, next, 'background', Commands.RESET_BG_COLOR);
  addColorCommands(commands, prev, next, 'decoration', Commands.RESET_COLOR_DECORATION);

  return commands;
};
