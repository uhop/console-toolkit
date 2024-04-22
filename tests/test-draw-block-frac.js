import test from 'tape-six';

import {drawRealWidthBlock, drawRealHeightBlock} from '../src/draw-block-frac.js';
import {fullBlock, hBlocks8th, vBlocks8th} from '../src/symbols.js';

test('Draw a fractional block', async t => {
  await t.test('Simple width', t => {
    let b = drawRealWidthBlock(2, 1);

    t.equal(b.width, 2);
    t.equal(b.height, 1);

    t.deepEqual(b.box, ['██']);

    b = drawRealWidthBlock(2, 1, true);
    t.deepEqual(b.box, ['██']);

    b = drawRealWidthBlock(2.01, 1);
    t.deepEqual(b.box, ['██']);

    b = drawRealWidthBlock(2.01, 1, true);
    t.deepEqual(b.box, ['██ ']);

    b = drawRealWidthBlock(2.01, 2, true);
    t.deepEqual(b.box, ['██ ', '██ ']);
  });

  await t.test('Fractional width', t => {
    let b = drawRealWidthBlock(1.001, 1, true);
    t.deepEqual(b.box, [fullBlock + hBlocks8th[0]]);

    for (let i = 1; i <= 8; ++i) {
      b = drawRealWidthBlock(1 + (i / 8), 1);
      t.deepEqual(b.box, [fullBlock + hBlocks8th[i]]);
    }
  });

  await t.test('Simple height', t => {
    let b = drawRealHeightBlock(1, 2);

    t.equal(b.width, 1);
    t.equal(b.height, 2);

    t.deepEqual(b.box, ['█', '█']);

    b = drawRealHeightBlock(1, 2, true);
    t.deepEqual(b.box, ['█', '█']);

    b = drawRealHeightBlock(1, 2.01);
    t.deepEqual(b.box, ['█', '█']);

    b = drawRealHeightBlock(1, 2.01, true);
    t.deepEqual(b.box, [' ', '█', '█']);

    b = drawRealHeightBlock(2, 2.01, true);
    t.deepEqual(b.box, ['  ', '██', '██']);
  });

  await t.test('Fractional height', t => {
    let b = drawRealHeightBlock(1, 1.001, true);
    t.deepEqual(b.box, [vBlocks8th[0], fullBlock]);

    for (let i = 1; i <= 8; ++i) {
      b = drawRealHeightBlock(1, 1 + (i / 8));
      t.deepEqual(b.box, [vBlocks8th[i], fullBlock]);
    }
  });
});
