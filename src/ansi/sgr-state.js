// Support for states based on SGR commands. See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.

import {
  Commands,
  ColorFormatSize,
  isFgColorCommand,
  isBgColorCommand,
  isFontCommand,
  setCommands,
  matchSgr
} from './sgr.js';

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

const defaultState = Symbol('defaultState');

let toState;

export const extractState = (s, initState = defaultState) => {
  let state = toState(initState);
  matchSgr.lastIndex = 0;
  for (const match of s.matchAll(matchSgr)) state = addCommandsToState(state, match[1].split(';'));
  return state;
};

toState = value => {
  switch (typeof value) {
    case 'object':
      if (!value) return RESET_STATE;
      if (typeof value.getState == 'function') return value.getState();
      return value;
    case 'string':
      if (!value) break;
      return extractState(value);
  }
  return {};
};
export {toState};

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
  for (const s of states) {
    const currentState = toState(s);
    for (const [name, value] of Object.entries(currentState)) {
      if (value !== undefined) state[name] = value;
    }
  }
  return state;
};

export const commandsToState = commands => {
  let state = {};
  for (let i = 0; i < commands.length; ++i) {
    const currentCommand = commands[i];
    switch (currentCommand) {
      case '': // reset
      case Commands.RESET_ALL:
        state = RESET_STATE;
        continue;
      case Commands.BOLD:
      case Commands.DIM:
        state.bold = currentCommand;
        continue;
      case Commands.ITALIC:
        state.italic = currentCommand;
        continue;
      case Commands.UNDERLINE:
      case Commands.DOUBLE_UNDERLINE:
      case Commands.CURLY_UNDERLINE:
        state.underline = currentCommand;
        continue;
      case Commands.BLINK:
      case Commands.RAPID_BLINK:
        state.blink = currentCommand;
        continue;
      case Commands.INVERSE:
        state.inverse = currentCommand;
        continue;
      case Commands.HIDDEN:
        state.hidden = currentCommand;
        continue;
      case Commands.STRIKETHROUGH:
        state.strikethrough = currentCommand;
        continue;
      case Commands.OVERLINE:
        state.overline = currentCommand;
        continue;
      case Commands.RESET_BOLD:
        // case Commands.RESET_DIM:
        state.bold = null;
        continue;
      case Commands.RESET_ITALIC:
        state.italic = null;
        continue;
      case Commands.RESET_UNDERLINE:
        // case Commands.RESET_DOUBLE_UNDERLINE:
        // case Commands.RESET_CURLY_UNDERLINE:
        state.underline = null;
        continue;
      case Commands.RESET_BLINK:
        // case RESET_RAPID_BLINK:
        state.blink = null;
        continue;
      case Commands.RESET_INVERSE:
        state.inverse = null;
        continue;
      case Commands.RESET_HIDDEN:
        state.hidden = null;
        continue;
      case Commands.RESET_STRIKETHROUGH:
        state.strikethrough = null;
        continue;
      case Commands.RESET_OVERLINE:
        state.overline = null;
        continue;
      case Commands.RESET_DECORATION_COLOR:
        state.decoration = null;
        continue;
      case Commands.EXTENDED_COLOR: {
        const next = ColorFormatSize[commands[i + 1]],
          color = commands.slice(i, i + next);
        i += next - 1;
        state.foreground = color;
        continue;
      }
      case Commands.BG_EXTENDED_COLOR: {
        const next = ColorFormatSize[commands[i + 1]],
          color = commands.slice(i, i + next);
        i += next - 1;
        state.background = color;
        continue;
      }
      case Commands.DECORATION_COLOR: {
        const next = ColorFormatSize[commands[i + 1]],
          color = commands.slice(i, i + next);
        i += next - 1;
        state.decoration = color;
        continue;
      }
      case Commands.DEFAULT_COLOR:
        state.foreground = null;
        continue;
      case Commands.BG_DEFAULT_COLOR:
        state.background = null;
        continue;
      case Commands.DEFAULT_FONT:
        state.font = null;
        continue;
    }
    if (isFgColorCommand(currentCommand)) {
      state.foreground = currentCommand;
      continue;
    }
    if (isBgColorCommand(currentCommand)) {
      state.background = currentCommand;
      continue;
    }
    if (isFontCommand(currentCommand)) {
      state.font = currentCommand;
      continue;
    }
  }
  return state;
};

export const addCommandsToState = (state, commands) => combineStates(state, commandsToState(commands));

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
  state = toState(state);
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

export const stateToResetCommands = state => {
  state = toState(state);
  const commands = [];
  let resetCount = 0;

  for (const [name, value] of Object.entries(state)) {
    if (resetColorProperties.hasOwnProperty(name)) {
      // colors
      if (value || value === null) {
        commands.push(resetColorProperties[name]);
        ++resetCount;
      }
      continue;
    }
    if (value || value === null) {
      commands.push(Commands['RESET_' + name.toUpperCase()]);
      ++resetCount;
    }
  }

  return resetCount === TOTAL_RESETS ? [''] : commands;
};

export const stateTransition = (prev, next) => {
  prev = toState(prev);
  next = toState(next);
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
      if (name === 'bold') {
        // special transition for bold and dim
        if (prev[name] !== value) {
          if (prev[name] !== null) commands.push(Commands.RESET_BOLD);
          commands.push(value);
        }
        continue;
      }
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
  prev = toState(prev);
  next = toState(next);
  const commands = [];
  let resetCount = 0;

  for (const name of Object.keys(RESET_STATE)) {
    const value = prev[name];
    if (resetColorProperties.hasOwnProperty(name)) {
      // color
      if (!value) {
        if (next[name]) commands.push(resetColorProperties[name]);
        if (value === null) ++resetCount;
        continue;
      }
      if (!equalColors(next[name], value)) pushColor(commands, value);
      continue;
    }
    if (!value) {
      if (next[name]) commands.push(Commands['RESET_' + name.toUpperCase()]);
      if (value === null) ++resetCount;
      continue;
    }
    if (name === 'bold') {
      // special transition for bold and dim
      if (next[name] !== value) {
        if (next[name] !== null) commands.push(Commands.RESET_BOLD);
        commands.push(value);
      }
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

export const stringifyCommands = commands => (commands?.length ? setCommands(commands) : '');

export const optimize = (s, initState = defaultState) => {
  let state = toState(initState),
    result = '',
    start = 0;
  matchSgr.lastIndex = 0;
  for (const match of s.matchAll(matchSgr)) {
    if (start < match.index) {
      const commands = initState !== state ? stateTransition(initState, state) : [];
      result += stringifyCommands(commands);
      initState = state;
      result += s.substring(start, match.index);
    }
    state = addCommandsToState(state, match[1].split(';'));
    start = match.index + match[0].length;
  }
  const commands = initState !== state ? stateTransition(initState, state) : [];
  result += stringifyCommands(commands);
  if (start < s.length) result += s.substring(start);
  return result;
};
