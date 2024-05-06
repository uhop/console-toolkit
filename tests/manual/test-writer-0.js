import process from 'node:process';
import {
  CLEAR_SCREEN,
  CURSOR_HOME,
  CURSOR_INVISIBLE,
  CURSOR_NORMAL,
  CURSOR_RESTORE_POS,
  CURSOR_SAVE_POS,
  SCREEN_RESTORE,
  SCREEN_SAVE
} from '../../src/ansi/index.js';
import style from '../../src/style.js';
import Writer from '../../src/writer.js';

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const writer = new Writer(process.stdout);

await writer.writeString(SCREEN_SAVE + CURSOR_SAVE_POS + CLEAR_SCREEN + CURSOR_INVISIBLE + CURSOR_HOME);
// await writer.cursorTo(0, 0);

await writer.writeString(style.inverse.text('123'));
await writer.write(style.bg.blue.bold.bright.white.text(['xxx', 'yy', 'z']));

await writer.cursorTo(10, 10);
await writer.write(style.bold.bright.green.text(['xxx', 'yy', 'z']), true);

await writer.moveCursor(10, -3);
await writer.write(style.bold.bright.red.text('xxx\nyy\nz'), true);

await sleep(2000);

await writer.writeString(CURSOR_RESTORE_POS + SCREEN_RESTORE + CURSOR_NORMAL);
