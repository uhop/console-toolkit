import test from 'tape-six';
import 'tape-six-fast-check';

import Writer from '../src/output/writer.js';
import Updater from '../src/output/updater.js';
import {CLEAR_EOS, cursorUp} from '../src/ansi/csi.js';

const frames = {s1: ['s1'], s2: ['s2', 's2', 's2'], s3: ['s3', 's3'], finished: ['finished']};

const expected = [
  'P',
  's1\n',
  '\r' + cursorUp(1),
  's2\ns2\ns2\n',
  '\r' + cursorUp(3),
  's3\ns3\n',
  CLEAR_EOS,
  '\r' + cursorUp(2),
  'finished\n',
  CLEAR_EOS,
  'E'
];

test('Updater properties', async t => {
  await t.scheduler(async s => {
    const chunks = [],
      stream = {
        isTTY: true,
        write(chunk, encoding, callback) {
          chunks.push(chunk);
          s.schedule(Promise.resolve()).then(() => callback());
          return true;
        }
      },
      updater = new Updater(state => frames[state], {prologue: 'P', epilogue: 'E'}, new Writer(stream));

    const calls = [updater.update('s1'), updater.update('s2'), updater.update('s3'), updater.final()];
    await s.waitFor(Promise.all(calls));

    if (chunks.length !== expected.length || chunks.some((chunk, i) => chunk !== expected[i])) {
      throw new Error('unexpected output: ' + JSON.stringify(chunks));
    }
  }, 'any order of write completions: one prologue, whole frames in call order, one epilogue');
});
