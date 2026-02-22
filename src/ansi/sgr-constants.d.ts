/** Pre-built SGR escape sequences for common text styling commands.
 * Each constant is a complete escape sequence string ready to write to the terminal.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Package:-ansi}
 */

/** SGR sequence: enable bold. */
export const BOLD: string;
/** SGR sequence: enable dim/faint. */
export const DIM: string;
/** SGR sequence: enable italic. */
export const ITALIC: string;
/** SGR sequence: enable underline. */
export const UNDERLINE: string;
/** SGR sequence: enable blink. */
export const BLINK: string;
/** SGR sequence: enable rapid blink. */
export const RAPID_BLINK: string;
/** SGR sequence: enable inverse/reverse video. */
export const INVERSE: string;
/** SGR sequence: enable hidden/invisible text. */
export const HIDDEN: string;
/** SGR sequence: enable strikethrough. */
export const STRIKETHROUGH: string;
/** SGR sequence: enable overline. */
export const OVERLINE: string;

/** SGR sequence: reset all attributes. */
export const RESET_ALL: string;
/** SGR sequence: reset all attributes (alias of RESET_ALL). */
export const RESET: string;

/** SGR sequence: reset bold (also resets dim). */
export const RESET_BOLD: string;
/** SGR sequence: reset dim (also resets bold). */
export const RESET_DIM: string;
/** SGR sequence: reset italic. */
export const RESET_ITALIC: string;
/** SGR sequence: reset underline. */
export const RESET_UNDERLINE: string;
/** SGR sequence: reset blink. */
export const RESET_BLINK: string;
/** SGR sequence: reset rapid blink. */
export const RESET_RAPID_BLINK: string;
/** SGR sequence: reset inverse. */
export const RESET_INVERSE: string;
/** SGR sequence: reset hidden. */
export const RESET_HIDDEN: string;
/** SGR sequence: reset strikethrough. */
export const RESET_STRIKETHROUGH: string;
/** SGR sequence: reset overline. */
export const RESET_OVERLINE: string;

/** SGR sequence: reset foreground color to default. */
export const RESET_COLOR: string;
/** SGR sequence: reset background color to default. */
export const RESET_BG_COLOR: string;
/** SGR sequence: reset font to default. */
export const RESET_FONT: string;

/** SGR sequence: set foreground to black. */
export const BLACK: string;
/** SGR sequence: set foreground to red. */
export const RED: string;
/** SGR sequence: set foreground to green. */
export const GREEN: string;
/** SGR sequence: set foreground to yellow. */
export const YELLOW: string;
/** SGR sequence: set foreground to blue. */
export const BLUE: string;
/** SGR sequence: set foreground to magenta. */
export const MAGENTA: string;
/** SGR sequence: set foreground to cyan. */
export const CYAN: string;
/** SGR sequence: set foreground to white. */
export const WHITE: string;

/** SGR sequence: set foreground to bright black. */
export const BRIGHT_BLACK: string;
/** SGR sequence: set foreground to bright red. */
export const BRIGHT_RED: string;
/** SGR sequence: set foreground to bright green. */
export const BRIGHT_GREEN: string;
/** SGR sequence: set foreground to bright yellow. */
export const BRIGHT_YELLOW: string;
/** SGR sequence: set foreground to bright blue. */
export const BRIGHT_BLUE: string;
/** SGR sequence: set foreground to bright magenta. */
export const BRIGHT_MAGENTA: string;
/** SGR sequence: set foreground to bright cyan. */
export const BRIGHT_CYAN: string;
/** SGR sequence: set foreground to bright white. */
export const BRIGHT_WHITE: string;

/** SGR sequence: set background to black. */
export const BG_BLACK: string;
/** SGR sequence: set background to red. */
export const BG_RED: string;
/** SGR sequence: set background to green. */
export const BG_GREEN: string;
/** SGR sequence: set background to yellow. */
export const BG_YELLOW: string;
/** SGR sequence: set background to blue. */
export const BG_BLUE: string;
/** SGR sequence: set background to magenta. */
export const BG_MAGENTA: string;
/** SGR sequence: set background to cyan. */
export const BG_CYAN: string;
/** SGR sequence: set background to white. */
export const BG_WHITE: string;

/** SGR sequence: set background to bright black. */
export const BG_BRIGHT_BLACK: string;
/** SGR sequence: set background to bright red. */
export const BG_BRIGHT_RED: string;
/** SGR sequence: set background to bright green. */
export const BG_BRIGHT_GREEN: string;
/** SGR sequence: set background to bright yellow. */
export const BG_BRIGHT_YELLOW: string;
/** SGR sequence: set background to bright blue. */
export const BG_BRIGHT_BLUE: string;
/** SGR sequence: set background to bright magenta. */
export const BG_BRIGHT_MAGENTA: string;
/** SGR sequence: set background to bright cyan. */
export const BG_BRIGHT_CYAN: string;
/** SGR sequence: set background to bright white. */
export const BG_BRIGHT_WHITE: string;

/** SGR sequence: set foreground to black (explicit FG_ prefix). */
export const FG_BLACK: string;
/** SGR sequence: set foreground to red (explicit FG_ prefix). */
export const FG_RED: string;
/** SGR sequence: set foreground to green (explicit FG_ prefix). */
export const FG_GREEN: string;
/** SGR sequence: set foreground to yellow (explicit FG_ prefix). */
export const FG_YELLOW: string;
/** SGR sequence: set foreground to blue (explicit FG_ prefix). */
export const FG_BLUE: string;
/** SGR sequence: set foreground to magenta (explicit FG_ prefix). */
export const FG_MAGENTA: string;
/** SGR sequence: set foreground to cyan (explicit FG_ prefix). */
export const FG_CYAN: string;
/** SGR sequence: set foreground to white (explicit FG_ prefix). */
export const FG_WHITE: string;

/** SGR sequence: set foreground to bright black (explicit FG_ prefix). */
export const FG_BRIGHT_BLACK: string;
/** SGR sequence: set foreground to bright red (explicit FG_ prefix). */
export const FG_BRIGHT_RED: string;
/** SGR sequence: set foreground to bright green (explicit FG_ prefix). */
export const FG_BRIGHT_GREEN: string;
/** SGR sequence: set foreground to bright yellow (explicit FG_ prefix). */
export const FG_BRIGHT_YELLOW: string;
/** SGR sequence: set foreground to bright blue (explicit FG_ prefix). */
export const FG_BRIGHT_BLUE: string;
/** SGR sequence: set foreground to bright magenta (explicit FG_ prefix). */
export const FG_BRIGHT_MAGENTA: string;
/** SGR sequence: set foreground to bright cyan (explicit FG_ prefix). */
export const FG_BRIGHT_CYAN: string;
/** SGR sequence: set foreground to bright white (explicit FG_ prefix). */
export const FG_BRIGHT_WHITE: string;

/** SGR sequence: set foreground to gray (alias of BRIGHT_BLACK). */
export const GRAY: string;
/** SGR sequence: set foreground to grey (alias of BRIGHT_BLACK). */
export const GREY: string;
/** SGR sequence: set background to gray (alias of BG_BRIGHT_BLACK). */
export const BG_GRAY: string;
/** SGR sequence: set background to grey (alias of BG_BRIGHT_BLACK). */
export const BG_GREY: string;
/** SGR sequence: set foreground to gray (alias of FG_BRIGHT_BLACK). */
export const FG_GRAY: string;
/** SGR sequence: set foreground to grey (alias of FG_BRIGHT_BLACK). */
export const FG_GREY: string;
