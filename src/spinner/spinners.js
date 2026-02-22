// Spinners are from https://github.com/sindresorhus/cli-spinners under the MIT license.
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
// See `cli-spinners` for more great options.

/** Braille dots spinner. */
export const dots = {frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']};
/** Sand/hourglass spinner. */
export const sand = {frames: [...'⠁⠂⠄⡀⡈⡐⡠⣀⣁⣂⣄⣌⣔⣤⣥⣦⣮⣶⣷⣿⡿⠿⢟⠟⡛⠛⠫⢋⠋⠍⡉⠉⠑⠡⢁']};
/** Line spinner (|/-\). */
export const line = {frames: ['-', '\\', '|', '/']};
/** Pipe spinner. */
export const pipe = {frames: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐']};
/** Vertical growing bar spinner. */
export const growVertical = {frames: ['▁', '▃', '▄', '▅', '▆', '▇', '▆', '▅', '▄', '▃']};
/** Horizontal growing bar spinner. */
export const growHorizontal = {frames: ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']};
/** Random noise spinner. */
export const noise = {frames: ['▓', '▒', '░']};
/** Bouncing spinner. */
export const bounce = {frames: ['⠁', '⠂', '⠄', '⠂']};
/** Arc spinner. */
export const arc = {frames: ['◜', '◠', '◝', '◞', '◡', '◟']};
/** Square quarters spinner. */
export const squareQuarters = {frames: ['◰', '◳', '◲', '◱']};
/** Circle quarters spinner. */
export const circleQuarters = {frames: ['◴', '◷', '◶', '◵']};
/** Circle halves spinner. */
export const circleHalves = {frames: ['◐', '◓', '◑', '◒']};
/** Arrows spinner. */
export const arrows = {frames: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙']};

/** Clock spinner. */
export const clock = {
  frames: ['🕛 ', '🕐 ', '🕑 ', '🕒 ', '🕓 ', '🕔 ', '🕕 ', '🕖 ', '🕗 ', '🕘 ', '🕙 ', '🕚 '],
  notStarted: [' '],
  finished: ['✔ ']
};

/** Bouncing bar spinner. */
export const bouncingBar = {
  frames: [
    '[    ]',
    '[=   ]',
    '[==  ]',
    '[=== ]',
    '[====]',
    '[ ===]',
    '[  ==]',
    '[   =]',
    '[    ]',
    '[   =]',
    '[  ==]',
    '[ ===]',
    '[====]',
    '[=== ]',
    '[==  ]',
    '[=   ]'
  ],
  notStarted: ['[    ]'],
  finished: ['[####]']
};

/** Bouncing ball spinner. */
export const bouncingBall = {
  frames: [
    '( ●    )',
    '(  ●   )',
    '(   ●  )',
    '(    ● )',
    '(     ●)',
    '(    ● )',
    '(   ●  )',
    '(  ●   )',
    '( ●    )',
    '(●     )'
  ],
  notStarted: ['(      )'],
  finished: ['(●●●●●●)']
};
