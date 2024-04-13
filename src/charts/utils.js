import {Commands} from '../ansi/sgr.js';

export const makeBgFromFg = state => ({
  background: !state.foreground
    ? null
    : Array.isArray(state.foreground)
    ? [Commands.BG_EXTENDED_COLOR, ...state.foreground.slice(1)]
    : Number(state.foreground) + 10
});

export const makeFgFromBg = state => ({
  foreground: !state.background
    ? null
    : Array.isArray(state.background)
    ? [Commands.EXTENDED_COLOR, ...state.background.slice(1)]
    : Number(state.background) - 10
});
