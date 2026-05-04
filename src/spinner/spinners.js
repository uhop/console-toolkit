// Spinners are from https://github.com/sindresorhus/cli-spinners under the MIT license.
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
// See `cli-spinners` for more great options.

export const dots = {frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']};
export const sand = {frames: [...'⠁⠂⠄⡀⡈⡐⡠⣀⣁⣂⣄⣌⣔⣤⣥⣦⣮⣶⣷⣿⡿⠿⢟⠟⡛⠛⠫⢋⠋⠍⡉⠉⠑⠡⢁']};
export const line = {frames: ['-', '\\', '|', '/']};
export const pipe = {frames: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐']};
export const growVertical = {frames: ['▁', '▃', '▄', '▅', '▆', '▇', '▆', '▅', '▄', '▃']};
export const growHorizontal = {frames: ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎']};
export const noise = {frames: ['▓', '▒', '░']};
export const bounce = {frames: ['⠁', '⠂', '⠄', '⠂']};
export const arc = {frames: ['◜', '◠', '◝', '◞', '◡', '◟']};
export const squareQuarters = {frames: ['◰', '◳', '◲', '◱']};
export const circleQuarters = {frames: ['◴', '◷', '◶', '◵']};
export const circleHalves = {frames: ['◐', '◓', '◑', '◒']};
export const arrows = {frames: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙']};

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
