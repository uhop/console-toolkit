import test from 'tape-six';
import drawProgressBarDefault, {drawProgressBar} from 'console-toolkit/progress-bar';
import type {ProgressBarOptions, ProgressBarSkin, TextStyler} from 'console-toolkit/progress-bar';
import {ascii, colorLine} from 'console-toolkit/progress-bar/skins.js';
import style from 'console-toolkit/style.js';

test('drawProgressBar signatures', t => {
  const styler: TextStyler = style.bright.cyan;
  const skin: ProgressBarSkin = {fill: '#', partials: ['+'], track: '.', left: '[', right: ']'};
  const opts: ProgressBarOptions = {skin, fillStyle: styler, trackStyle: style.dim};
  const r1: string = drawProgressBar(0.5, 10);
  const r2: string = drawProgressBar(0.5, 10, opts);
  const r3: string = drawProgressBarDefault(0.25, 8);
  const r4: string = drawProgressBar(0.5, 10, {skin: colorLine, fillStyle: style.green, trackStyle: style.white});
  const r5: string = drawProgressBar(0.5, 10, {skin: ascii});

  t.equal(typeof r1, 'string', 'basic');
  t.equal(typeof r2, 'string', 'with options');
  t.equal(typeof r3, 'string', 'default export');
  t.equal(typeof r4, 'string', 'preset skin with colors');
  t.equal(typeof r5, 'string', 'preset skin');
});
