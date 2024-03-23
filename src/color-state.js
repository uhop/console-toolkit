import {Commands} from './colors.js';

export const newState = (commands, oldState = {}) => {
  if (commands.length < 1) return oldState;
  const currentCommand = commands[0];
  switch (currentCommand) {
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
    case Commands.BLINKING:
      return newState(commands.slice(1), {...oldState, blinking: currentCommand});
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
    case Commands.RESET_BLINKING:
      return newState(commands.slice(1), {...oldState, blinking: undefined});
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
  }
  if ((currentCommand >= '30' && currentCommand <= '37') || (currentCommand >= '90' && currentCommand <= '97')) {
    return newState(commands.slice(1), {...oldState, foreground: currentCommand});
  }
  if ((currentCommand >= '40' && currentCommand <= '47') || (currentCommand >= '100' && currentCommand <= '107')) {
    return newState(commands.slice(1), {...oldState, background: currentCommand});
  }
  return oldState;
};

const equalColors = (a, b) => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((value, index) => value === b[index]);
  return false;
};

export const stateCommand = (prev, next) => {
  const commands = [];
  let resetCount = 0;

  if (!next.bold) ++resetCount;
  if (prev.bold !== next.bold) {
    commands.push(next.bold || Commands.RESET_BOLD);
  }

  if (!next.italic) ++resetCount;
  if (prev.italic !== next.italic) {
    commands.push(next.italic || Commands.RESET_ITALIC);
  }

  if (!next.underline) ++resetCount;
  if (prev.underline != next.underline) {
    commands.push(next.underline || Commands.RESET_UNDERLINE);
  }

  if (!next.blinking) ++resetCount;
  if (prev.blinking !== next.blinking) {
    commands.push(next.blinking || Commands.RESET_BLINKING);
  }

  if (!next.inverse) ++resetCount;
  if (prev.inverse !== next.inverse) {
    commands.push(next.inverse || Commands.RESET_INVERSE);
  }

  if (!next.hidden) ++resetCount;
  if (prev.hidden !== next.hidden) {
    commands.push(next.hidden || Commands.RESET_HIDDEN);
  }

  if (!next.strikethrough) ++resetCount;
  if (prev.strikethrough !== next.strikethrough) {
    commands.push(next.strikethrough || Commands.RESET_STRIKETHROUGH);
  }

  if (!next.overline) ++resetCount;
  if (prev.overline !== next.overline) {
    commands.push(next.overline || Commands.RESET_OVERLINE);
  }

  if (!next.foreground) ++resetCount;
  if (!equalColors(prev.foreground, next.foreground)) {
    if (next.foreground) {
      if (!next.foreground) {
        commands.push(Commands.RESET_COLOR);
      } else if (Array.isArray(next.foreground)) {
        commands.push(...next.foreground);
      } else {
        commands.push(next.foreground);
      }
    }
  }

  if (!next.background) ++resetCount;
  if (!equalColors(prev.background, next.background)) {
    if (next.background) {
      if (!next.background) {
        commands.push(Commands.RESET_BG_COLOR);
      } else if (Array.isArray(next.background)) {
        commands.push(...next.background);
      } else {
        commands.push(next.background);
      }
    }
  }

  if (!next.decoration) ++resetCount;
  if (!equalColors(prev.decoration, next.decoration)) {
    if (next.decoration) {
      if (!next.decoration) {
        commands.push(Commands.RESET_COLOR_DECORATION);
      } else if (Array.isArray(next.decoration)) {
        commands.push(...next.decoration);
      } else {
        commands.push(next.decoration);
      }
    }
  }

  // if all properties should be reset and we issued a few reset commands => RESET_ALL
  return resetCount == 11 && commands.length ? [Commands.RESET_ALL] : commands;
};
