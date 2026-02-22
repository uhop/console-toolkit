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

/** The fully reset SGR state with all properties set to `null`.
 * @type {object}
 */
export const RESET_STATE = {
  bold: null,
  dim: null,
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

/** Extracts the cumulative SGR state from a string by parsing all SGR sequences.
 * @param {string} s - The string to parse.
 * @param {object} [initState] - Initial state to build upon.
 * @returns {object} The resulting SGR state.
 */
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

/** Combines multiple SGR states, with later states overriding earlier ones.
 * @param {...(object|string)} states - States to combine.
 * @returns {object} The combined state.
 */
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

/** Converts an array of SGR command strings into an SGR state object.
 * @param {string[]} commands - Array of SGR command strings.
 * @returns {object} The resulting state.
 */
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
        state.bold = currentCommand;
        continue;
      case Commands.DIM:
        state.dim = currentCommand;
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
        state.bold = state.dim = null;
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

/** Adds SGR commands to an existing state.
 * @param {object} state - The current state.
 * @param {string[]} commands - Commands to add.
 * @returns {object} The updated state.
 */
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

const chainedStates = {bold: 1, dim: 1};

/** Converts an SGR state to an array of SGR command strings.
 * @param {object|string} state - The state to convert.
 * @returns {string[]} The command strings.
 */
export const stateToCommands = state => {
  state = toState(state);
  const commands = [];
  let resetCount = 0;

  // process chained states separately
  if (state.bold === null) {
    commands.push(Commands.RESET_BOLD);
    ++resetCount;
  }
  if (state.dim === null) {
    commands.push(Commands.RESET_DIM);
    ++resetCount;
  }
  state.bold && commands.push(state.bold);
  state.dim && commands.push(state.dim);

  for (const [name, value] of Object.entries(state)) {
    if (chainedStates[name] === 1) continue; // skip chained states
    if (resetColorProperties.hasOwnProperty(name)) {
      // colors
      if (value === null) {
        commands.push(resetColorProperties[name]);
        ++resetCount;
        continue;
      }
      value && pushColor(commands, value);
      continue;
    }
    if (value === null) {
      commands.push(Commands['RESET_' + name.toUpperCase()]);
      ++resetCount;
      continue;
    }
    value && commands.push(value);
  }

  return resetCount === TOTAL_RESETS ? [''] : commands;
};

/** Computes the minimal SGR commands needed to transition from one state to another.
 * @param {object|string} prev - The previous state.
 * @param {object|string} next - The next state.
 * @returns {string[]} The transition commands.
 */
export const stateTransition = (prev, next) => {
  prev = toState(prev);
  next = toState(next);
  const commands = [];
  let resetCount = 0;

  // process chained states separately
  if (prev.bold !== next.bold) {
    if (next.bold === null) {
      commands.push(Commands.RESET_BOLD);
    } else if (next.bold) {
      if (next.dim === null && prev.dim !== null) commands.push(Commands.RESET_DIM);
      commands.push(next.bold);
    }
    next.dim && commands.push(next.dim);
  } else {
    if (prev.dim !== next.dim) {
      if (next.dim === null) {
        commands.push(Commands.RESET_DIM);
        next.bold && commands.push(next.bold);
      } else {
        next.dim && commands.push(next.dim);
      }
    }
  }
  if (next.bold === null) ++resetCount;
  if (next.dim === null) ++resetCount;

  for (const name of Object.keys(RESET_STATE)) {
    if (chainedStates[name] === 1) continue; // skip chained states
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

/** Computes the minimal SGR commands to reverse a state transition (from next back to prev).
 * @param {object|string} prev - The state to restore.
 * @param {object|string} next - The current state.
 * @returns {string[]} The reverse transition commands.
 */
export const stateReverseTransition = (prev, next) => {
  prev = toState(prev);
  next = toState(next);
  const commands = [];
  let resetCount = 0;

  // process chained states separately
  if (next.bold !== prev.bold) {
    if (!prev.bold) {
      commands.push(Commands.RESET_BOLD);
    } else {
      if (!prev.dim && next.dim) commands.push(Commands.RESET_DIM);
      commands.push(prev.bold);
    }
    prev.dim && commands.push(prev.dim);
  } else {
    if (next.dim !== prev.dim) {
      if (!prev.dim) {
        commands.push(Commands.RESET_DIM);
        prev.bold && commands.push(prev.bold);
      } else {
        prev.dim && commands.push(prev.dim);
      }
    }
  }
  if (prev.bold === null) ++resetCount;
  if (prev.dim === null) ++resetCount;

  for (const name of Object.keys(RESET_STATE)) {
    if (chainedStates[name] === 1) continue; // skip chained states
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
    if (next[name] !== value) commands.push(value);
  }

  if (resetCount === TOTAL_RESETS) {
    const nextResets = getStateResets(next);
    return nextResets === TOTAL_RESETS ? [] : [''];
  }

  return commands;
};

/** Converts an array of SGR commands to an escape sequence string, or empty string if no commands.
 * @param {string[]} commands
 * @returns {string}
 */
export const stringifyCommands = commands => (commands?.length ? setCommands(commands) : '');

/** Optimizes SGR sequences in a string by computing minimal state transitions.
 * @param {string} s - The string to optimize.
 * @param {object} [initState] - Initial state.
 * @returns {string} The optimized string.
 */
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
