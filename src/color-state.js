import {Commands} from './colors.js';

const newState = (commands, oldState = {}) => {
  if (commands.length < 1) return oldState;
  const currentCommand = commands[0];
  switch (currentCommand) {
    case Commands.RESET_ALL:
      return newState(commands.slice(1), {});
    case Commands.BOLD:
      return newState(commands.slice(1), {...oldState, bold: true, dim: false});
    case Commands.DIM:
      return newState(commands.slice(1), {...oldState, bold: false, dim: true});
    case Commands.ITALIC:
      return newState(commands.slice(1), {...oldState, italic: true});
    case Commands.UNDERLINE:
      return newState(commands.slice(1), {...oldState, underline: true, doubleUnderline: false});
    case Commands.DOUBLE_UNDERLINE:
      return newState(commands.slice(1), {...oldState, underline: false, doubleUnderline: true});
    case Commands.BLINKING:
      return newState(commands.slice(1), {...oldState, blinking: true});
    case Commands.INVERSE:
      return newState(commands.slice(1), {...oldState, inverse: true});
    case Commands.HIDDEN:
      return newState(commands.slice(1), {...oldState, hidden: true});
    case Commands.STRIKETHROUGH:
      return newState(commands.slice(1), {...oldState, strikethrough: true});
    case Commands.RESET_BOLD:
      return newState(commands.slice(1), {...oldState, bold: false, dim: false});
    // case Commands.RESET_DIM: return newState(commands.slice(1), {...oldState, bold: false, dim: false});
    case Commands.RESET_ITALIC:
      return newState(commands.slice(1), {...oldState, italic: false});
    case Commands.RESET_UNDERLINE:
      return newState(commands.slice(1), {...oldState, underline: false, doubleUnderline: false});
    // case Commands.RESET_DOUBLE_UNDERLINE: return newState(commands.slice(1), {...oldState, underline: false, doubleUnderline: false});
    case Commands.RESET_BLINKING:
      return newState(commands.slice(1), {...oldState, blinking: false});
    case Commands.RESET_INVERSE:
      return newState(commands.slice(1), {...oldState, inverse: false});
    case Commands.RESET_HIDDEN:
      return newState(commands.slice(1), {...oldState, hidden: false});
    case Commands.RESET_STRIKETHROUGH:
      return newState(commands.slice(1), {...oldState, strikethrough: false});
    case Commands.COLOR_EXTENDED: {
      const next = commands[1] === FORMAT_COLOR256 ? 3 : 5,
        color = commands.slice(1, next);
      return newState(commands.slice(next), {...oldState, foreground: color});
    }
    case Commands.BG_COLOR_EXTENDED: {
      const next = commands[1] === FORMAT_COLOR256 ? 3 : 5,
        color = commands.slice(1, next);
      return newState(commands.slice(next), {...oldState, background: color});
    }
    case COLOR_DEFAULT:
      return newState(commands.slice(1), {...oldState, foreground: undefined});
    case BG_COLOR_DEFAULT:
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

export default newState;
