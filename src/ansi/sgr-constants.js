// SGR commands as constants: some people prefer it this way

import {Commands, Colors, setCommands, getColor, getBrightColor, getBgColor, getBgBrightColor} from './sgr.js';

// Commands

export const BOLD = setCommands(Commands.BOLD);
export const DIM = setCommands(Commands.DIM);
export const ITALIC = setCommands(Commands.ITALIC);
export const UNDERLINE = setCommands(Commands.UNDERLINE);
export const BLINK = setCommands(Commands.BLINK);
export const RAPID_BLINK = setCommands(Commands.RAPID_BLINK);
export const INVERSE = setCommands(Commands.INVERSE);
export const HIDDEN = setCommands(Commands.HIDDEN);
export const STRIKETHROUGH = setCommands(Commands.STRIKETHROUGH);
export const OVERLINE = setCommands(Commands.OVERLINE);

// Reset commands

export const RESET_ALL = setCommands('');
export const RESET = RESET_ALL;

export const RESET_BOLD = setCommands(Commands.RESET_BOLD);
export const RESET_DIM = setCommands(Commands.RESET_DIM);
export const RESET_ITALIC = setCommands(Commands.RESET_ITALIC);
export const RESET_UNDERLINE = setCommands(Commands.RESET_UNDERLINE);
export const RESET_BLINK = setCommands(Commands.RESET_BLINK);
export const RESET_RAPID_BLINK = setCommands(Commands.RESET_RAPID_BLINK);
export const RESET_INVERSE = setCommands(Commands.RESET_INVERSE);
export const RESET_HIDDEN = setCommands(Commands.RESET_HIDDEN);
export const RESET_STRIKETHROUGH = setCommands(Commands.RESET_STRIKETHROUGH);
export const RESET_OVERLINE = setCommands(Commands.RESET_OVERLINE);

export const RESET_COLOR = setCommands(Commands.RESET_COLOR);
export const RESET_BG_COLOR = setCommands(Commands.RESET_BG_COLOR);
export const RESET_FONT = setCommands(Commands.RESET_FONT);

// Colors

export const BLACK = setCommands(getColor(Colors.BLACK));
export const RED = setCommands(getColor(Colors.RED));
export const GREEN = setCommands(getColor(Colors.GREEN));
export const YELLOW = setCommands(getColor(Colors.YELLOW));
export const BLUE = setCommands(getColor(Colors.BLUE));
export const MAGENTA = setCommands(getColor(Colors.MAGENTA));
export const CYAN = setCommands(getColor(Colors.CYAN));
export const WHITE = setCommands(getColor(Colors.WHITE));

export const BRIGHT_BLACK = setCommands(getBrightColor(Colors.BLACK));
export const BRIGHT_RED = setCommands(getBrightColor(Colors.RED));
export const BRIGHT_GREEN = setCommands(getBrightColor(Colors.GREEN));
export const BRIGHT_YELLOW = setCommands(getBrightColor(Colors.YELLOW));
export const BRIGHT_BLUE = setCommands(getBrightColor(Colors.BLUE));
export const BRIGHT_MAGENTA = setCommands(getBrightColor(Colors.MAGENTA));
export const BRIGHT_CYAN = setCommands(getBrightColor(Colors.CYAN));
export const BRIGHT_WHITE = setCommands(getBrightColor(Colors.WHITE));

export const BG_BLACK = setCommands(getBgColor(Colors.BLACK));
export const BG_RED = setCommands(getBgColor(Colors.RED));
export const BG_GREEN = setCommands(getBgColor(Colors.GREEN));
export const BG_YELLOW = setCommands(getBgColor(Colors.YELLOW));
export const BG_BLUE = setCommands(getBgColor(Colors.BLUE));
export const BG_MAGENTA = setCommands(getBgColor(Colors.MAGENTA));
export const BG_CYAN = setCommands(getBgColor(Colors.CYAN));
export const BG_WHITE = setCommands(getBgColor(Colors.WHITE));

export const BG_BRIGHT_BLACK = setCommands(getBgBrightColor(Colors.BLACK));
export const BG_BRIGHT_RED = setCommands(getBgBrightColor(Colors.RED));
export const BG_BRIGHT_GREEN = setCommands(getBgBrightColor(Colors.GREEN));
export const BG_BRIGHT_YELLOW = setCommands(getBgBrightColor(Colors.YELLOW));
export const BG_BRIGHT_BLUE = setCommands(getBgBrightColor(Colors.BLUE));
export const BG_BRIGHT_MAGENTA = setCommands(getBgBrightColor(Colors.MAGENTA));
export const BG_BRIGHT_CYAN = setCommands(getBgBrightColor(Colors.CYAN));
export const BG_BRIGHT_WHITE = setCommands(getBgBrightColor(Colors.WHITE));

export const FG_BLACK = BLACK;
export const FG_RED = RED;
export const FG_GREEN = GREEN;
export const FG_YELLOW = YELLOW;
export const FG_BLUE = BLUE;
export const FG_MAGENTA = MAGENTA;
export const FG_CYAN = CYAN;
export const FG_WHITE = WHITE;

export const FG_BRIGHT_BLACK = BRIGHT_BLACK;
export const FG_BRIGHT_RED = BRIGHT_RED;
export const FG_BRIGHT_GREEN = BRIGHT_GREEN;
export const FG_BRIGHT_YELLOW = BRIGHT_YELLOW;
export const FG_BRIGHT_BLUE = BRIGHT_BLUE;
export const FG_BRIGHT_MAGENTA = BRIGHT_MAGENTA;
export const FG_BRIGHT_CYAN = BRIGHT_CYAN;
export const FG_BRIGHT_WHITE = BRIGHT_WHITE;

export const GRAY = BRIGHT_BLACK;
export const GREY = GRAY;
export const BG_GRAY = BG_BRIGHT_BLACK;
export const BG_GREY = BG_GRAY;
export const FG_GRAY = FG_BRIGHT_BLACK;
export const FG_GREY = FG_GRAY;
