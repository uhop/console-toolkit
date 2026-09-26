import test from 'tape-six';
import {Writable} from 'node:stream';

import Writer from '../src/output/writer.js';
import Updater from '../src/output/updater.js';
import {CLEAR_EOL, CLEAR_EOS, cursorUp} from '../src/ansi/csi.js';
import style from '../src/style.js';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const makeTtyStream = (delay = 0) => {
  const chunks = [];
  const stream = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk.toString());
      if (delay) setTimeout(callback, delay);
      else callback();
    }
  });
  stream.isTTY = true;
  stream.chunks = chunks;
  return stream;
};

const count = (chunks, s) => chunks.filter(chunk => chunk === s).length;

test('Updater', async t => {
  await t.test('concurrent updates write the prologue once', async t => {
    const stream = makeTtyStream(5);
    const updater = new Updater(() => ['a', 'b'], {prologue: 'P', epilogue: 'E'}, new Writer(stream));

    await Promise.all([updater.update(), updater.update()]);

    t.equal(count(stream.chunks, 'P'), 1);
    t.deepEqual(stream.chunks, ['P', 'a\nb\n', '\r' + cursorUp(2), 'a\nb\n']);
  });

  await t.test('a frame rewinds by the height of the frame before it', async t => {
    const stream = makeTtyStream(5);
    let n = 0;
    const updater = new Updater(() => (++n == 1 ? ['1', '2', '3'] : ['x', 'y', 'z']), {}, new Writer(stream));

    await Promise.all([updater.update(), updater.update()]);

    t.ok(stream.chunks.includes('\r' + cursorUp(3)));
    t.equal(updater.lastHeight, 3);
  });

  await t.test('refresh ticks skip while a frame is pending', async t => {
    const stream = makeTtyStream(30);
    let frames = 0;
    const updater = new Updater(() => String(++frames), {}, new Writer(stream));

    updater.startRefreshing(5);
    await sleep(100);
    updater.stopRefreshing();
    await updater.pendingFrame;

    t.ok(frames >= 1);
    t.ok(frames <= 4, 'about one frame per slow write, not one per tick');
  });

  await t.test('a shorter frame clears the rows below it', async t => {
    const stream = makeTtyStream();
    let lines = ['1', '2', '3'];
    const updater = new Updater(() => lines, {}, new Writer(stream));

    await updater.update();
    lines = ['1'];
    await updater.update();

    t.deepEqual(stream.chunks.slice(-3), ['\r' + cursorUp(3), '1\n', CLEAR_EOS]);
  });

  await t.test('a frame of equal height clears nothing', async t => {
    const stream = makeTtyStream();
    const updater = new Updater(() => ['1', '2'], {}, new Writer(stream));

    await updater.update();
    await updater.update();

    t.equal(count(stream.chunks, CLEAR_EOS), 0);
  });

  await t.test('a one-line frame without the last newline rewinds to column 1', async t => {
    const stream = makeTtyStream();
    const updater = new Updater(() => 'spin', {noLastNewLine: true}, new Writer(stream));

    await updater.update();
    await updater.update();

    t.deepEqual(stream.chunks.slice(-2), ['\r', 'spin']);
  });

  await t.test('a two-line frame without the last newline moves up one row', async t => {
    const stream = makeTtyStream();
    const updater = new Updater(() => ['a', 'b'], {noLastNewLine: true}, new Writer(stream));

    await updater.update();
    await updater.update();

    t.deepEqual(stream.chunks.slice(-2), ['\r' + cursorUp(1), 'a\nb']);
  });

  await t.test('done() waits for the pending frame and writes the epilogue once', async t => {
    const stream = makeTtyStream(5);
    const updater = new Updater(() => 'x', {prologue: 'P', epilogue: 'E'}, new Writer(stream));

    updater.update();
    const first = updater.done(),
      second = updater.done();
    t.equal(first, second);
    await second;

    t.equal(count(stream.chunks, 'E'), 1);
    t.equal(stream.chunks.at(-1), 'E');
  });

  await t.test('final() after done() resolves after the epilogue', async t => {
    const stream = makeTtyStream(5);
    const updater = new Updater(() => 'x', {epilogue: 'E'}, new Writer(stream));

    await updater.update();
    let epilogueWritten = false;
    updater.done().then(() => (epilogueWritten = true));
    await updater.final();

    t.ok(epilogueWritten);
    t.equal(count(stream.chunks, 'E'), 1);
  });

  await t.test('done() after reset() writes the epilogue again', async t => {
    const stream = makeTtyStream();
    const updater = new Updater(() => 'x', {epilogue: 'E'}, new Writer(stream));

    await updater.final();
    updater.reset();
    await updater.final();

    t.equal(count(stream.chunks, 'E'), 2);
  });

  await t.test('a failed frame does not block later frames or the epilogue', async t => {
    const stream = makeTtyStream();
    let calls = 0;
    const updater = new Updater(
      () => {
        if (++calls == 1) throw new Error('boom');
        return 'ok';
      },
      {epilogue: 'E'},
      new Writer(stream)
    );

    const failed = updater.update().then(
      () => false,
      () => true
    );
    const next = updater.update();
    t.ok(await failed, 'the first frame rejects');
    await next;
    await updater.done();

    t.ok(stream.chunks.includes('ok\n'));
    t.equal(stream.chunks.at(-1), 'E');
  });

  await t.test('a narrower line clears the rest of the old line', async t => {
    const stream = makeTtyStream();
    let lines = ['100%', 'same', 'abc'];
    const updater = new Updater(() => lines, {}, new Writer(stream));

    await updater.update();
    lines = ['5%', 'same', 'abcdef'];
    await updater.update();

    t.equal(stream.chunks.at(-1), '5%' + CLEAR_EOL + '\nsame\nabcdef\n', 'only the narrower line is cleared');
    t.deepEqual(updater.lastWidths, [2, 4, 6]);
  });

  await t.test('widths ignore escape codes', async t => {
    const stream = makeTtyStream();
    let line = style.red.text('abc');
    const updater = new Updater(() => line, {}, new Writer(stream));

    await updater.update();
    line = 'abc';
    await updater.update();

    t.equal(count(stream.chunks, 'abc\n'), 1, 'same width, no clearing');
    t.equal(stream.chunks.at(-1), 'abc\n');
  });

  await t.test('beforeLine and afterLine count toward the width', async t => {
    const stream = makeTtyStream();
    let line = 'abcd';
    const updater = new Updater(() => line, {beforeLine: '[', afterLine: ']'}, new Writer(stream));

    await updater.update();
    line = 'ab';
    await updater.update();

    t.equal(stream.chunks.at(-1), '[ab' + CLEAR_EOL + ']\n', 'cleared before afterLine is drawn');
  });

  await t.test('the first frame after reset() clears nothing', async t => {
    const stream = makeTtyStream();
    let line = 'abcdef';
    const updater = new Updater(() => line, {}, new Writer(stream));

    await updater.update();
    updater.reset();
    line = 'ab';
    await updater.update();

    t.equal(stream.chunks.at(-1), 'ab\n');
  });
});
