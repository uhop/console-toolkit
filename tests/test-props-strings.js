import test from 'tape-six';
import fc from 'fast-check';
import 'tape-six-fast-check';

import {clip, getLength, matchCsiNoGroups} from '../src/strings.js';
import Box from '../src/box.js';
import style from '../src/style.js';
import {extractState, stateTransition} from '../src/ansi/sgr-state.js';

const plain = {text: s => s},
  styles = [plain, style.red, style.bold, style.bg.blue, style.bright.cyan, style.underline.green];

const text = fc.string({unit: 'grapheme', maxLength: 12}).filter(s => !/[\x00-\x1f\x7f-\x9f]/.test(s)),
  styled = fc
    .array(fc.tuple(text, fc.constantFrom(...styles)), {maxLength: 4})
    .map(parts => parts.map(([s, st]) => st.text(s)).join(''));

const stripped = s => s.replace(matchCsiNoGroups, '');

test('String properties', async t => {
  await t.prop(
    [text, fc.constantFrom(...styles)],
    (s, st) => getLength(st.text(s)) === getLength(s),
    'styling never changes the width'
  );

  await t.prop(
    [text, text, fc.constantFrom(...styles.slice(1))],
    (a, b, st) => getLength(a + st.text(b)) === getLength(a) + getLength(b),
    'an escape code separates widths'
  );

  await t.prop(
    [text, fc.constantFrom('\u200B', '\u200E', '\u200F', '\u2060', '\u2066', '\u2069', '\uFEFF', '\u{E0001}'), text],
    (a, z, b) => getLength(a + z + b) === getLength(a) + getLength(b),
    'a zero-width format character adds no width'
  );

  await t.prop(
    [styled, fc.integer({min: 0, max: 40})],
    (s, width) => {
      const result = clip(s, width),
        length = getLength(result);
      if (!s.startsWith(result)) throw new Error('not a prefix');
      if (length > width) throw new Error(`width ${length} over ${width}`);
      if (stripped(result).includes('\x1B')) throw new Error('cut inside an escape code');
      if (getLength(s) <= width) return stripped(result) === stripped(s);
      // cut text: the next grapheme must not fit
      let next = width + 1;
      while (getLength(clip(s, next)) === length) ++next;
      return getLength(clip(s, next)) > width;
    },
    'clip() fits, keeps a prefix, never cuts an escape code, and stops only where the next grapheme does not fit'
  );

  await t.prop(
    [fc.array(styled, {minLength: 1, maxLength: 6}), fc.constantFrom('left', 'right', 'center')],
    (lines, align) => {
      const width = Math.max(...lines.map(line => getLength(line))),
        box = Box.make(lines, {align});
      return box.height === lines.length && box.box.every(line => getLength(line) === width);
    },
    'every Box line has the same width'
  );

  const sameState = (a, b) => stateTransition(extractState(a), extractState(b)).length === 0;

  await t.prop(
    [styled, fc.integer({min: 0, max: 40})],
    (s, width) => {
      const prefix = clip(s, width),
        result = clip(s, width, {preserveState: true});
      return result.startsWith(prefix) && !stripped(result.substring(prefix.length)) && sameState(result, s);
    },
    'clip() with preserveState keeps the prefix and ends in the same SGR state as the whole string'
  );

  await t.prop(
    [fc.array(styled, {minLength: 1, maxLength: 6}), fc.integer({min: 0, max: 40})],
    (lines, width) => {
      const box = Box.make(lines).clip(width);
      return box.box.every((line, i) => sameState(line, lines[i]));
    },
    'every clipped Box line ends in the same SGR state as its source line'
  );
});
