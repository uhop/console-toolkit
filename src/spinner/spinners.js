'use strict';

// Spinners are from https://github.com/sindresorhus/cli-spinners under the MIT license.
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
// See `cli-spinners` for more great options.

export const dots = {frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']};
export const sand = {frames: [...'⠁⠂⠄⡀⡈⡐⡠⣀⣁⣂⣄⣌⣔⣤⣥⣦⣮⣶⣷⣿⡿⠿⢟⠟⡛⠛⠫⢋⠋⠍⡉⠉⠑⠡⢁']};
export const line = {frames: ['-', '\\', '|', '/']};
export const pipe = {frame: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐']};
export const growVertical = {frame: ['▁', '▃', '▄', '▅', '▆', '▇', '▆', '▅', '▄', '▃']};
export const growHorizontal = {frame: ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']};
export const noise = {frame: ['▓', '▒', '░']};
export const bounce = {frame: ['⠁', '⠂', '⠄', '⠂']};
export const arc = {frame: ['◜', '◠', '◝', '◞', '◡', '◟']};
export const squareQuarters = {frames: ['◰', '◳', '◲', '◱']};
export const circleQuarters = {frames: ['◴', '◷', '◶', '◵']};
export const circleHalves = {frames: ['◐', '◓', '◑', '◒']};
export const arrows = {frame: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙']};

export const clock = {
  frames: ['🕛 ', '🕐 ', '🕑 ', '🕒 ', '🕓 ', '🕔 ', '🕕 ', '🕖 ', '🕗 ', '🕘 ', '🕙 ', '🕚 '],
  notStarted: [' '],
  finished: ['✔ ']
};

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
