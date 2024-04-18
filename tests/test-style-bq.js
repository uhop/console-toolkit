import test from 'tape-six';

import {s} from '../src/style.js';

test('Styling with back quotes', async t => {
  await t.test('Plain styling', t => {
    const text = s`Hello, {{bold.red}}bold red{{defaultColor}} bold{{resetBold}}!`;
    t.equal(text, 'Hello, \x1B[1;31mbold red\x1B[39m bold\x1B[22m!');
  });

  await t.test('Styling with save/restore', t => {
    const text = s`Hello, {{save.bold.save.red}}bold red{{restore}} bold{{restore}}!`;
    t.equal(text, 'Hello, \x1B[1;31mbold red\x1B[39m bold\x1B[22m!');
  });

  await t.test('Styling with separate commands', t => {
    const text = s`Hello, {{save}}{{bold}}{{save}}{{red}}bold red{{restore}} bold{{restore}}!`;
    t.equal(text, 'Hello, \x1B[1;31mbold red\x1B[39m bold\x1B[22m!');
  });

  await t.test('Styling with functions and arguments', t => {
    const text = s`Hello, {{save}}${t => t.bold}{{save.red}}bold red{{restore}} ${'bold'}{{restore}}!`;
    t.equal(text, 'Hello, \x1B[1;31mbold red\x1B[39m bold\x1B[22m!');
  });

  await t.test('Styling with RESET_STATE as the beginning', t => {
    const text = s(null)`Hello, {{save.bold.save.red}}bold red{{restore}} bold{{restore}}!`;
    t.equal(text, 'Hello, \x1B[1;31mbold red\x1B[39m bold\x1B[m!');
  });
});
