// @ts-self-types="./skins.d.ts"
import {fullBlock, hBlocks8th, lHalf, shadeDark, shadeLight, shadeMedium} from '../symbols.js';

const eighths = hBlocks8th.slice(1, 8);

export const blocks = {fill: fullBlock, partials: eighths, track: shadeLight};
export const solid = {fill: fullBlock, partials: eighths, track: ' '};
export const capped = {fill: fullBlock, partials: eighths, track: ' ', left: '\u{2595}', right: '\u{258F}'};
export const shades = {fill: fullBlock, partials: [shadeLight, shadeMedium, shadeDark], track: ' '};
export const halves = {fill: fullBlock, partials: [lHalf], track: shadeLight};
export const line = {fill: '━', partials: ['╸'], track: '─'};
export const colorLine = {fill: '━', partials: ['╸'], track: '━', trackStart: '╺'};
export const dots = {fill: '⣿', partials: [...'⡀⡄⡆⡇⣇⣧⣷'], track: '⣀'};
export const ascii = {fill: '=', head: '>', track: ' ', left: '[', right: ']'};
export const hash = {fill: '#', track: '-', left: '[', right: ']'};
