import test from 'tape-six';
import drawProgressBarDefault, {drawProgressBar} from 'console-toolkit/progress-bar.js';
import type {ProgressBarOptions, TextStyler} from 'console-toolkit/progress-bar.js';
import style from 'console-toolkit/style.js';

test('drawProgressBar signatures', t => {
  const styler: TextStyler = style.bright.cyan;
  const opts: ProgressBarOptions = {fill: '#', track: '.', fillStyle: styler, trackStyle: style.dim};
  const r1: string = drawProgressBar(0.5, 10);
  const r2: string = drawProgressBar(0.5, 10, opts);
  const r3: string = drawProgressBarDefault(0.25, 8);

  t.equal(typeof r1, 'string', 'basic');
  t.equal(typeof r2, 'string', 'with options');
  t.equal(typeof r3, 'string', 'default export');
});
