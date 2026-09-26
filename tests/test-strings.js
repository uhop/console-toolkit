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

  await t.test('Zero-width characters', t => {
    const zeroWidth =
        /[[\p{Nonspacing_Mark}\p{Enclosing_Mark}\p{Default_Ignorable_Code_Point}\p{Format}]--[\u00AD\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u115F\uFFF9-\uFFFB]]/v,
      measured = [];
    for (let cp = 0; cp < 0x10000; ++cp) {
      if (cp >= 0xd800 && cp <= 0xdfff) continue;
      const c = String.fromCodePoint(cp);
      if (zeroWidth.test(c) && getLength(c)) measured.push(cp.toString(16));
    }
    t.deepEqual(measured, [], 'the ranges split.js skips hold no zero-width character');

    t.equal(getLength('\u05B0'), 0, 'Hebrew point');
    t.equal(getLength('\u{1D167}'), 0, 'musical combining mark');
    t.equal(getLength('\u3099'), 0, 'kana voicing mark');
    t.equal(getLength('\u0301\u093F'), 1, 'a spacing mark after a lone mark is measured');

    t.equal(getLength('a\u200Bb'), 2, 'zero-width space');
    t.equal(getLength('a\u2060b'), 2, 'word joiner');
    t.equal(getLength('\uFEFFab'), 2, 'BOM');
    t.equal(getLength('a\u200Eb\u200F'), 2, 'direction marks');
    t.equal(getLength('a\u{E0001}b'), 2, 'language tag');
    t.equal(getLength('a\u3164b'), 2, 'Hangul filler');
    t.equal(getLength('a\u00ADb'), 3, 'soft hyphen keeps its cell, as in wcwidth()');
    t.equal(getLength('a\u115Fb'), 4, 'Hangul choseong filler keeps two cells, as in wcwidth()');
    t.equal(getLength('\u0600\u0628'), 1, 'a prepended mark joins its letter');

    t.equal(clip('a\u200Bb', 1), 'a\u200B');
    t.equal(clip('\uFEFFab', 1), '\uFEFFa', 'a leading zero-width character stays with the first grapheme');
    t.equal(clip('\u0301ab', 1), '\u0301a', 'so does a leading combining mark');
    t.equal(clip('\u200B', 0), '\u200B');
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

  await t.test('Clip with preserveState', t => {
    const options = {preserveState: true};

    t.equal(clip('abc', 2, options), 'ab');
    t.equal(clip('abc', 3, options), 'abc');

    const red = '\x1B[31mabc\x1B[39m';
    t.equal(clip(red, 2, options), '\x1B[31mab\x1B[39m');
    t.equal(clip(red, 3, options), red, 'exact fit');
    t.equal(clip(red, 4, options), red);
    t.equal(clip(red, 3, {...options, includeLastCommand: true}), red);

    const nested = '\x1B[44m\x1B[31mabc\x1B[39mdef\x1B[49m';
    t.equal(clip(nested, 3, options), '\x1B[44m\x1B[31mabc\x1B[39;49m');
    t.equal(clip(nested, 5, options), '\x1B[44m\x1B[31mabc\x1B[39mde\x1B[49m');

    const open = '\x1B[31mabcdef';
    t.equal(clip(open, 3, options), '\x1B[31mabc', 'a style left open stays open');

    const s = style.bold.text('X') + 'Y';
    t.equal(clip(s, 1, options), style.bold.text('X'));
    t.equal(clip('\x1B[1mX\x1B[mY', 1, options), '\x1B[1mX\x1B[m', 'full reset');
  });
});
