import test from 'tape-six';
import {drawBlock, drawFrame} from 'console-toolkit/draw-block.js';
import {drawRealWidthBlock, drawRealHeightBlock} from 'console-toolkit/draw-block-frac.js';
import type {DrawBlockOptions} from 'console-toolkit/draw-block.js';
import {blockTheme as unicodeBlockTheme} from 'console-toolkit/themes/blocks/unicode-thin.js';
import Box from 'console-toolkit/box';

test('drawBlock signatures', t => {
  const r1: Box = drawBlock(5, 3, unicodeBlockTheme);
  const r2: Box = drawBlock(5, 3, unicodeBlockTheme, {theme: 1});
  const opts: DrawBlockOptions = {
    top: 1,
    bottom: 1,
    left: 1,
    right: 1,
    vTheme: 1,
    hTheme: 1,
    theme: 1,
    symbol: '#'
  };
  const r3: Box = drawBlock(5, 3, unicodeBlockTheme, opts);

  t.ok(r1 instanceof Box, 'drawBlock basic');
  t.ok(r2 instanceof Box, 'drawBlock with theme option');
  t.ok(r3 instanceof Box, 'drawBlock with full options');
});

test('drawFrame signatures', t => {
  const r1: Box = drawFrame(5, 3, unicodeBlockTheme);
  const r2: Box = drawFrame(5, 3, unicodeBlockTheme, {symbol: '.'});

  t.ok(r1 instanceof Box, 'drawFrame basic');
  t.ok(r2 instanceof Box, 'drawFrame with options');
});

test('drawRealWidthBlock signatures', t => {
  const r1: Box = drawRealWidthBlock(3.5, 2);
  const r2: Box = drawRealWidthBlock(3.5, 2, true);

  t.ok(r1 instanceof Box, 'drawRealWidthBlock');
  t.ok(r2 instanceof Box, 'drawRealWidthBlock with border');
});

test('drawRealHeightBlock signatures', t => {
  const r1: Box = drawRealHeightBlock(3, 2.5);
  const r2: Box = drawRealHeightBlock(3, 2.5, true);

  t.ok(r1 instanceof Box, 'drawRealHeightBlock');
  t.ok(r2 instanceof Box, 'drawRealHeightBlock with border');
});
