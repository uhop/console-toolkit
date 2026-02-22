import style from '../../style.js';

// red, orange, yellow, green, blue, indigo, violet
const colors = [0xff0000, 0xffa500, 0xffff00, 0x008000, 0x0000ff, 0x4b0082, 0xee82ee];

/** Rainbow chart theme with spectrum colors. */
export const chartTheme = colors.map(color => ({colorState: style.hex(color).getState()}));

export default chartTheme;
