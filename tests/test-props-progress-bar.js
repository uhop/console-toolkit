import test from 'tape-six';
import fc from 'fast-check';
import 'tape-six-fast-check';

import {drawProgressBar, makeIndeterminateBar} from '../src/progress-bar/index.js';
import * as skins from '../src/progress-bar/skins.js';
import {getLength} from '../src/strings.js';

const skinNames = Object.keys(skins),
  skin = fc.constantFrom(...skinNames).map(name => skins[name]),
  anyFraction = fc.oneof(fc.double(), fc.constantFrom(NaN, Infinity, -Infinity)),
  fraction = fc.double({min: 0, max: 1, noNaN: true});

// marks the filled part, so progress can be read back even when fill and track share a glyph
const marker = {text: s => '<' + s + '>'};

const progressOf = (bar, {fill, partials = [], head}) => {
  let units = 0;
  for (const [, filled] of bar.matchAll(/<([^>]*)>/g)) {
    for (const c of filled) {
      if (c === fill || c === head) units += partials.length + 1;
      else units += partials.indexOf(c) + 1;
    }
  }
  return units;
};

test('Progress bar properties', async t => {
  await t.prop(
    [anyFraction, fc.integer({min: 0, max: 120}), skin],
    (f, width, skin) => getLength(drawProgressBar(f, width, {skin})) === width,
    'any fraction, width, and skin: exactly width cells'
  );

  await t.prop(
    [fraction, fraction, fc.integer({min: 1, max: 60}), skin],
    (a, b, width, skin) => {
      const [low, high] = a <= b ? [a, b] : [b, a];
      return (
        progressOf(drawProgressBar(low, width, {skin, fillStyle: marker}), skin) <=
        progressOf(drawProgressBar(high, width, {skin, fillStyle: marker}), skin)
      );
    },
    'more progress never draws less'
  );

  await t.prop(
    [fc.double({min: 0, max: 1, maxExcluded: true, noNaN: true}), fc.integer({min: 1, max: 60}), skin],
    (f, width, skin) =>
      progressOf(drawProgressBar(f, width, {skin, fillStyle: marker}), skin) <
      progressOf(drawProgressBar(1, width, {skin, fillStyle: marker}), skin),
    'full only at 1'
  );

  await t.prop(
    [
      fc.integer({min: 0, max: 80}),
      fc.option(fc.integer({min: 0, max: 100}), {nil: undefined}),
      fc.constantFrom('bounce', 'loop'),
      skin
    ],
    (width, segment, motion, skin) => {
      const {frames, notStarted, finished} = makeIndeterminateBar(width, {skin, segment, motion});
      return frames.length > 0 && [...frames, ...notStarted, ...finished].every(frame => getLength(frame) === width);
    },
    'every indeterminate frame is exactly width cells'
  );
});
