import test from 'tape-six';

import style from '../src/style.js';
import {getLength, matchCsiNoGroups, getMaxLength, clip} from '../src/strings.js';

test('ANSI utilities', async t => {
  await t.test('Clean from CSI sequences', t => {
    const s = style.cyan.text('cyan');
    t.equal(getLength(s), 4);
    t.equal(s.replace(matchCsiNoGroups, ''), 'cyan');
  });

  await t.test('Unicode symbols', t => {
    const s = style.cyan.text('① ② ③ ④');
    t.equal(getLength(s), 7);
    t.equal(getLength('字\u1F920\u1F407'), 6);
  });

  await t.test('Emoji widths', t => {
    t.equal(getLength('☃'), 1, 'text presentation without VS16');
    t.equal(getLength('☃\uFE0F'), 2, 'with VS16');
    t.equal(getLength('❤'), 1);
    t.equal(getLength('❤️'), 2);
    t.equal(getLength('©'), 1);
    t.equal(getLength('👍'), 2, 'emoji presentation');
    t.equal(getLength('👍🏽'), 2, 'skin tone');
    t.equal(getLength('🇺🇸'), 2, 'flag');
    t.equal(getLength('👨‍👩‍👧'), 2, 'ZWJ sequence');
    t.equal(getLength('👨‍❤‍👨'), 2, 'unqualified ZWJ sequence');
    t.equal(getLength('1️⃣'), 2, 'keycap');
    t.equal(getLength('1⃣'), 2, 'unqualified keycap');
    t.equal(getLength('#1'), 2, 'ASCII keycap bases alone');
  });

  await t.test('Get max length', t => {
    t.equal(getMaxLength(['abc', '']), 3);
    t.equal(getMaxLength(['', 'ab']), 2);
    t.equal(getMaxLength(['']), 0);
    t.equal(getMaxLength([]), 0);
  });

  await t.test('Clip', t => {
    t.equal(clip('ab', 0), '');
    t.equal(clip('ab', 1), 'a');
    t.equal(clip('ab', 2), 'ab');
    t.equal(clip('ab', 3), 'ab');

    t.equal(clip('ab', 0, true), '');
    t.equal(clip('ab', 1, true), 'a');
    t.equal(clip('ab', 2, true), 'ab');
    t.equal(clip('ab', 3, true), 'ab');

    const text = style.red.text('red');

    t.equal(clip(text, 0), '');
    t.equal(clip(text, 1), '\x1B[31mr');
    t.equal(clip(text, 2), '\x1B[31mre');
    t.equal(clip(text, 3), '\x1B[31mred');
    t.equal(clip(text, 4), text);

    t.equal(clip(text, 0, {includeLastCommand: true}), '\x1B[31m');
    t.equal(clip(text, 1, {includeLastCommand: true}), '\x1B[31mr');
    t.equal(clip(text, 2, {includeLastCommand: true}), '\x1B[31mre');
    t.equal(clip(text, 3, {includeLastCommand: true}), text);
    t.equal(clip(text, 4, {includeLastCommand: true}), text);

    t.equal(clip('ab' + text, 0), '', 'no visible text before a command at width 0');
    t.equal(clip(' ' + style.red.text(''), 0), '', 'found by a property test');
    t.equal(clip('ab' + text, -1), '', 'negative width');
  });
});
