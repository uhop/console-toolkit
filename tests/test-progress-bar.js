import test from 'tape-six';

import {drawProgressBar} from '../src/progress-bar.js';
import {fullBlock, hBlocks8th, shadeLight} from '../src/symbols.js';
import style from '../src/style.js';
import {getLength} from '../src/strings.js';

test('Draw a progress bar', async t => {
  await t.test('Empty, half, and full', t => {
    t.equal(drawProgressBar(0, 10), shadeLight.repeat(10));
    t.equal(drawProgressBar(0.5, 10), fullBlock.repeat(5) + shadeLight.repeat(5));
    t.equal(drawProgressBar(1, 10), fullBlock.repeat(10));
  });

  await t.test('Fractional cells use 1/8th blocks', t => {
    t.equal(drawProgressBar(0.55, 10), fullBlock.repeat(5) + hBlocks8th[4] + shadeLight.repeat(4));
    t.equal(drawProgressBar(0.0125, 10), hBlocks8th[1] + shadeLight.repeat(9));
  });

  await t.test('Out-of-range and odd inputs', t => {
    t.equal(drawProgressBar(2, 5), fullBlock.repeat(5), 'clamped above');
    t.equal(drawProgressBar(-1, 5), shadeLight.repeat(5), 'clamped below');
    t.equal(drawProgressBar(NaN, 5), shadeLight.repeat(5), 'NaN draws empty');
    t.equal(drawProgressBar(0.5, 0), '', 'zero width');
    t.equal(drawProgressBar(0.5, 4.9), fullBlock.repeat(2) + shadeLight.repeat(2), 'width floored');
  });

  await t.test('The width never drifts', t => {
    for (let i = 0; i <= 1000; ++i) {
      const bar = drawProgressBar(i / 1000, 37);
      if (getLength(bar) !== 37) {
        t.fail(`width ${getLength(bar)} at ${i / 1000}`);
        return;
      }
    }
    t.pass('37 cells at every step');
  });

  await t.test('Custom characters', t => {
    t.equal(drawProgressBar(0.55, 10, {fill: '#', track: '.'}), '#####.....', 'no partial cell without full blocks');
  });

  await t.test('Styles', t => {
    const bar = drawProgressBar(0.5, 4, {fillStyle: style.bright.cyan, trackStyle: style.dim});
    t.equal(getLength(bar), 4, 'SGR sequences do not count');
    t.ok(bar.startsWith(style.bright.cyan.text(fullBlock.repeat(2))), 'fill styled');
    t.ok(bar.endsWith(style.dim.text(shadeLight.repeat(2))), 'track styled');
  });
});
