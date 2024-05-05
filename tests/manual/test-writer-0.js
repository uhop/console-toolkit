import {CLEAR_SCREEN, CURSOR_RESTORE_POS, CURSOR_SAVE_POS, SCREEN_RESTORE, SCREEN_SAVE} from '../../src/ansi/csi.js';
import Writer from '../../src/writer.js';

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const writer = new Writer(process.stdout);

await writer.writeString(SCREEN_SAVE + CURSOR_SAVE_POS + CLEAR_SCREEN);

await sleep();

await writer.cursorTo(0, 0);

await sleep();

await writer.writeString('123');
await writer.write(['xxx', 'yy', 'z']);

await writer.cursorTo(10, 10);
await writer.write(['xxx', 'yy', 'z'], true);

await writer.moveCursor(10, -3);
await writer.write(['xxx', 'yy', 'z'], true);

await sleep();

await writer.writeString(CURSOR_RESTORE_POS + SCREEN_RESTORE);
