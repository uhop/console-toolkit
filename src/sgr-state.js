// Support for states based on SGR commands. See https://en.wikipedia.org/wiki/ANSI_escape_code for more details.

import {Commands, FORMAT_COLOR256, isFgColorCommand, isBgColorCommand, isFontCommand} from './sgr.js';

export const newState = (commands, oldState = {}) => {
  if (commands.length < 1) return oldState;
  const currentCommand = commands[0];
  switch (currentCommand) {
    case '': // reset
    case Commands.RESET_ALL:
      return newState(commands.slice(1), {});
    case Commands.BOLD:
    case Commands.DIM:
      return newState(commands.slice(1), {...oldState, bold: currentCommand});
    case Commands.ITALIC:
      return newState(commands.slice(1), {...oldState, italic: currentCommand});
    case Commands.UNDERLINE:
    case Commands.DOUBLE_UNDERLINE:
    case Commands.CURLY_UNDERLINE:
      return newState(commands.slice(1), {...oldState, underline: currentCommand});
    case Commands.BLINK:
      return newState(commands.slice(1), {...oldState, blink: currentCommand});
    case Commands.INVERSE:
      return newState(commands.slice(1), {...oldState, inverse: currentCommand});
    case Commands.HIDDEN:
      return newState(commands.slice(1), {...oldState, hidden: currentCommand});
    case Commands.STRIKETHROUGH:
      return newState(commands.slice(1), {...oldState, strikethrough: currentCommand});
    case Commands.OVERLINE:
      return newState(commands.slice(1), {...oldState, overline: currentCommand});
    case Commands.RESET_BOLD:
      return newState(commands.slice(1), {...oldState, bold: undefined});
    // case Commands.RESET_DIM: return newState(commands.slice(1), {...oldState, bold: undefined});
    case Commands.RESET_ITALIC:
      return newState(commands.slice(1), {...oldState, italic: undefined});
    case Commands.RESET_UNDERLINE:
      return newState(commands.slice(1), {...oldState, underline: undefined});
    // case Commands.RESET_DOUBLE_UNDERLINE: return newState(commands.slice(1), {...oldState, underline: undefined});
    // case Commands.RESET_CURLY_UNDERLINE: return newState(commands.slice(1), {...oldState, underline: undefined});
    case Commands.RESET_BLINK:
      return newState(commands.slice(1), {...oldState, blink: undefined});
    case Commands.RESET_INVERSE:
      return newState(commands.slice(1), {...oldState, inverse: undefined});
    case Commands.RESET_HIDDEN:
      return newState(commands.slice(1), {...oldState, hidden: undefined});
    case Commands.RESET_STRIKETHROUGH:
      return newState(commands.slice(1), {...oldState, strikethrough: undefined});
    case Commands.RESET_OVERLINE:
      return newState(commands.slice(1), {...oldState, overline: undefined});
    case Commands.RESET_COLOR_DECORATION:
      return newState(commands.slice(1), {...oldState, decoration: undefined});
    case Commands.COLOR_EXTENDED: {
      const next = commands[1] === FORMAT_COLOR256 ? 3 : 5,
        color = commands.slice(0, next);
      return newState(commands.slice(next), {...oldState, foreground: color});
    }
    case Commands.BG_COLOR_EXTENDED: {
      const next = commands[1] === FORMAT_COLOR256 ? 3 : 5,
        color = commands.slice(0, next);
      return newState(commands.slice(next), {...oldState, background: color});
    }
    case Commands.COLOR_DECORATION: {
      const next = commands[1] === FORMAT_COLOR256 ? 3 : 5,
        color = commands.slice(0, next);
      return newState(commands.slice(next), {...oldState, decoration: color});
    }
    case Commands.COLOR_DEFAULT:
      return newState(commands.slice(1), {...oldState, foreground: undefined});
    case Commands.BG_COLOR_DEFAULT:
      return newState(commands.slice(1), {...oldState, background: undefined});
    case Commands.FONT_DEFAULT:
      return newState(commands.slice(1), {...oldState, font: undefined});
  }
  if (isFgColorCommand(currentCommand)) {
    return newState(commands.slice(1), {...oldState, foreground: currentCommand});
  }
  if (isBgColorCommand(currentCommand)) {
    return newState(commands.slice(1), {...oldState, background: currentCommand});
  }
  if (isFontCommand(currentCommand)) {
    return newState(commands.slice(1), {...oldState, font: currentCommand});
  }
  return oldState;
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

export const stateToCommands = state => {
  const commands = [];

  if (state.bold) commands.push(state.bold);
  if (state.italic) commands.push(state.italic);
  if (state.underline) commands.push(state.underline);
  if (state.blink) commands.push(state.blink);
  if (state.inverse) commands.push(state.inverse);
  if (state.hidden) commands.push(state.hidden);
  if (state.strikethrough) commands.push(state.strikethrough);
  if (state.overline) commands.push(state.overline);

  if (state.font) commands.push(state.font);

  if (state.foreground) pushColor(commands, state.foreground);
  if (state.background) pushColor(commands, state.background);
  if (state.decoration) pushColor(commands, state.decoration);

  return commands;
};

const TOTAL_RESETS = 12;

const getStateResets = state => {
  let resetCount = 0;

  if (!state.bold) ++resetCount;
  if (!state.italic) ++resetCount;
  if (!state.underline) ++resetCount;
  if (!state.blink) ++resetCount;
  if (!state.inverse) ++resetCount;
  if (!state.hidden) ++resetCount;
  if (!state.strikethrough) ++resetCount;
  if (!state.overline) ++resetCount;
  if (!state.font) ++resetCount;
  if (!state.foreground) ++resetCount;
  if (!state.background) ++resetCount;
  if (!state.decoration) ++resetCount;

  return resetCount;
};

const addCommands = (commands, prev, next, property, resetCommand) => {
  if (next[property]) {
    if (prev[property] !== next[property]) commands.push(next[property]);
  } else {
    if (prev[property]) commands.push(resetCommand);
  }
};

const addColorCommands = (commands, prev, next, property, resetCommand) => {
  if (next[property]) {
    if (!equalColors(prev[property], next[property])) pushColor(commands, next[property]);
  } else {
    if (prev[property]) commands.push(resetCommand);
  }
};

export const stateCommand = (prev, next) => {
  const commands = [],
    prevResets = getStateResets(prev),
    nextResets = getStateResets(next);

  if (nextResets === TOTAL_RESETS) {
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
