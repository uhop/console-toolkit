import {ProgressBarSkin} from './index.js';

/** Full blocks with 1/8th-cell steps over a light-shade track: `█████▌░░░░`. The default. */
export const blocks: ProgressBarSkin;
/** Full blocks with 1/8th-cell steps over a blank track; give `trackStyle` a background color. */
export const solid: ProgressBarSkin;
/** Full blocks with 1/8th-cell steps between thin end caps: `▕█████▌    ▏`. */
export const capped: ProgressBarSkin;
/** Full blocks with shade steps (`░▒▓`) over a blank track. */
export const shades: ProgressBarSkin;
/** Full blocks with half-cell steps over a light-shade track. */
export const halves: ProgressBarSkin;
/** A heavy line over a thin line, with half-cell steps: `━━━━━╸────`. */
export const line: ProgressBarSkin;
/** A heavy line for both parts, told apart by `fillStyle` and `trackStyle` colors: `━━━━━╸━━━━`. */
export const colorLine: ProgressBarSkin;
/** Braille dots with 1/8th-cell steps: `⣿⣿⣿⣿⣿⡆⣀⣀⣀⣀`. */
export const dots: ProgressBarSkin;
/** ASCII with a head: `[====>     ]`. */
export const ascii: ProgressBarSkin;
/** ASCII hashes over dashes: `[#####-----]`. */
export const hash: ProgressBarSkin;
