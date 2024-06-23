import test from "tape-six";

import {BLACK, RED, RESET, RESET_COLOR} from 'console-toolkit/ansi/sgr-constants.js';

test('SGR constants', t => {
  t.equal(BLACK, '\x1B[30m');
  t.equal(RED + 'Hello, world!' + RESET, '\x1B[31mHello, world!\x1B[m');
  t.equal(RED + 'Hello, world!' + RESET_COLOR, '\x1B[31mHello, world!\x1B[39m');
});
