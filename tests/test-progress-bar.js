import test from 'tape-six';

import {drawProgressBar, makeIndeterminateBar} from '../src/progress-bar/index.js';
import {Spinner} from '../src/spinner/index.js';
import * as skins from '../src/progress-bar/skins.js';
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
    t.equal(drawProgressBar(0.999, 10), fullBlock.repeat(9) + hBlocks8th[7], 'not full before 1');
    t.equal(
      drawProgressBar(0.3, 10),
      fullBlock.repeat(3) + shadeLight.repeat(7),
      'an exact step is not lost to float error'
    );
  });

  await t.test('Out-of-range and odd inputs', t => {
    t.equal(drawProgressBar(2, 5), fullBlock.repeat(5), 'clamped above');
    t.equal(drawProgressBar(-1, 5), shadeLight.repeat(5), 'clamped below');
    t.equal(drawProgressBar(NaN, 5), shadeLight.repeat(5), 'NaN draws empty');
    t.equal(drawProgressBar(0.5, 0), '', 'zero width');
    t.equal(drawProgressBar(0.5, 4.9), fullBlock.repeat(2) + shadeLight.repeat(2), 'width floored');
  });

  await t.test('Every skin keeps the width', t => {
    for (const [name, skin] of Object.entries(skins)) {
      for (const width of [1, 2, 3, 37]) {
        for (let i = 0; i <= 200; ++i) {
          const bar = drawProgressBar(i / 200, width, {skin});
          if (getLength(bar) !== width) {
            t.fail(`${name}: width ${getLength(bar)} instead of ${width} at ${i / 200}`);
            return;
          }
        }
      }
    }
    t.pass('every skin, every step');
  });

  await t.test('Skins', t => {
    t.equal(drawProgressBar(0.55, 10, {skin: skins.dots}), '⣿⣿⣿⣿⣿⡇⣀⣀⣀⣀', 'dots');
    t.equal(drawProgressBar(0.55, 10, {skin: skins.line}), '━━━━━╸────', 'line');
    t.equal(drawProgressBar(0.5, 10, {skin: skins.colorLine}), '━━━━━╺━━━━', 'colorLine starts the track');
    t.equal(drawProgressBar(0.5, 12, {skin: skins.ascii}), '[====>     ]', 'ascii head');
    t.equal(drawProgressBar(1, 12, {skin: skins.ascii}), '[==========]', 'no head when full');
    t.equal(drawProgressBar(0.5, 12, {skin: skins.hash}), '[#####-----]', 'hash');
    t.equal(drawProgressBar(0.5, 2, {skin: skins.hash}), '#-', 'caps dropped when they do not fit');
    t.equal(drawProgressBar(0.55, 10, {skin: {fill: '#', track: '.'}}), '#####.....', 'whole cells only');
    t.equal(drawProgressBar(0.95, 10, {skin: {fill: '#', track: '.'}}), '#########.', 'not full before 1');
  });

  await t.test('Fill and track colors', t => {
    const bar = drawProgressBar(0.5, 4, {fillStyle: style.green, trackStyle: style.white});
    t.equal(bar, style.green.text(fullBlock.repeat(2)) + style.white.text(shadeLight.repeat(2)), 'green vs. white');

    const line = drawProgressBar(0.5, 4, {skin: skins.colorLine, fillStyle: style.brightWhite, trackStyle: style.gray});
    t.equal(line, style.brightWhite.text('━━') + style.gray.text('╺━'), 'bright white vs. gray');
    t.equal(getLength(line), 4, 'SGR sequences do not count');
  });

  await t.test('The partial cell shows the track background', t => {
    const bar = drawProgressBar(0.55, 10, {skin: skins.solid, fillStyle: style.brightCyan, trackStyle: style.bg.blue});
    const partial = style.bg.blue.text(style.brightCyan.text(hBlocks8th[4]));
    t.ok(bar.includes(partial), 'fill color over the track background');
    t.equal(getLength(bar), 10);

    const fgOnly = drawProgressBar(0.55, 10, {fillStyle: style.green, trackStyle: style.white});
    t.ok(
      fgOnly.includes(style.green.text(fullBlock.repeat(5)) + style.green.text(hBlocks8th[4])),
      'no background, fill style only'
    );
  });
});

const bare = {fill: '#', track: '-'};

test('Make an indeterminate bar', async t => {
  await t.test('Bounce', t => {
    const {frames, notStarted, finished} = makeIndeterminateBar(6, {segment: 2, skin: bare});
    t.deepEqual(frames, ['##----', '-##---', '--##--', '---##-', '----##', '---##-', '--##--', '-##---']);
    t.deepEqual(notStarted, ['------']);
    t.deepEqual(finished, ['######']);
  });

  await t.test('Loop', t => {
    const {frames} = makeIndeterminateBar(4, {segment: 2, motion: 'loop', skin: bare});
    t.deepEqual(frames, ['#---', '##--', '-##-', '--##', '---#']);
  });

  await t.test('Default segment and caps', t => {
    const {frames} = makeIndeterminateBar(10, {skin: skins.ascii});
    t.equal(frames[0], '[==      ]', 'a quarter of the inner width');
    t.equal(frames.length, 12);
  });

  await t.test('Every skin and motion keeps the width', t => {
    for (const [name, skin] of Object.entries(skins)) {
      for (const motion of ['bounce', 'loop']) {
        for (const width of [1, 2, 5, 37]) {
          const {frames, notStarted, finished} = makeIndeterminateBar(width, {skin, motion});
          const wrong = [...frames, ...notStarted, ...finished].find(frame => getLength(frame) !== width);
          if (wrong !== undefined) {
            t.fail(`${name}, ${motion}: width ${getLength(wrong)} instead of ${width}`);
            return;
          }
        }
      }
    }
    t.pass('every skin, both motions');
  });

  await t.test('Odd sizes', t => {
    t.deepEqual(makeIndeterminateBar(0).frames, [''], 'zero width');
    t.deepEqual(makeIndeterminateBar(3, {segment: 5}).frames, [fullBlock.repeat(3)], 'segment clamped to the bar');
  });

  await t.test('Colors', t => {
    const {frames} = makeIndeterminateBar(4, {segment: 1, fillStyle: style.green, trackStyle: style.white});
    t.equal(
      frames[1],
      style.white.text(shadeLight) + style.green.text(fullBlock) + style.white.text(shadeLight.repeat(2))
    );
  });

  await t.test('Unknown motion', t => {
    t.throws(() => makeIndeterminateBar(10, {motion: 'spin'}));
  });

  await t.test('Drives a Spinner', t => {
    const spinner = new Spinner(makeIndeterminateBar(4, {segment: 2, skin: bare}));
    t.equal(spinner.getFrame(), '----', 'not started');
    spinner.state = 'active';
    t.deepEqual([spinner.nextFrame(), spinner.nextFrame(), spinner.nextFrame()], ['-##-', '--##', '-##-']);
    spinner.state = 'finished';
    t.equal(spinner.getFrame(), '####', 'finished');
  });
});
