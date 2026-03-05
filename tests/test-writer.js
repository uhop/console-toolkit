import test from 'tape-six';
import {Writable} from 'node:stream';

import Writer from '../src/output/writer.js';

const makeMemoryStream = () => {
  const chunks = [];
  const stream = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk.toString());
      callback();
    }
  });
  stream.chunks = chunks;
  return stream;
};

test('Writer', async t => {
  await t.test('getColorDepth with forceColorDepth', t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream, 8);

    t.equal(w.getColorDepth(), 8);
  });

  await t.test('hasColors without forceColorDepth', t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream);

    t.equal(w.hasColors(), undefined);
    t.equal(w.hasColors(2), undefined);
  });

  await t.test('hasColors with forceColorDepth=4', t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream, 4);

    t.equal(w.hasColors(), true);
    t.equal(w.hasColors(2), true);
    t.equal(w.hasColors(16), true);
    t.equal(w.hasColors(17), false);
    t.equal(w.hasColors(256), false);
  });

  await t.test('hasColors with forceColorDepth=8', t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream, 8);

    t.equal(w.hasColors(), true);
    t.equal(w.hasColors(2), true);
    t.equal(w.hasColors(256), true);
    t.equal(w.hasColors(257), false);
  });

  await t.test('hasColors with forceColorDepth=24', t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream, 24);

    t.equal(w.hasColors(), true);
    t.equal(w.hasColors(2), true);
    t.equal(w.hasColors(256), true);
    t.equal(w.hasColors(16777216), true);
    t.equal(w.hasColors(16777217), false);
  });

  await t.test('hasColors with forceColorDepth=1', t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream, 1);

    t.equal(w.hasColors(), true);
    t.equal(w.hasColors(2), true);
    t.equal(w.hasColors(3), false);
  });

  await t.test('hasColors with forceColorDepth ignores env argument', t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream, 4);

    t.equal(w.hasColors({FORCE_COLOR: '0'}), true);
    t.equal(w.hasColors(2, {FORCE_COLOR: '0'}), true);
  });

  await t.test('writeString to non-TTY stream strips ANSI', async t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream);

    await w.writeString('\x1B[31mred\x1B[39m');
    t.deepEqual(stream.chunks, ['red']);
  });

  await t.test('writeString to non-TTY with forceColorDepth keeps SGR', async t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream, 4);

    await w.writeString('\x1B[31mred\x1B[39m');
    t.deepEqual(stream.chunks, ['\x1B[31mred\x1B[39m']);
  });

  await t.test('write to non-TTY stream', async t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream);

    await w.write(['hello', 'world']);
    t.deepEqual(stream.chunks, ['hello\nworld\n']);
  });

  await t.test('write to non-TTY with noLastNewLine', async t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream);

    await w.write(['hello', 'world'], {noLastNewLine: true});
    t.deepEqual(stream.chunks, ['hello\nworld']);
  });

  await t.test('write to non-TTY with beforeLine/afterLine', async t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream);

    await w.write(['hello'], {beforeLine: '> ', afterLine: ' <'});
    t.deepEqual(stream.chunks, ['> hello <\n']);
  });

  await t.test('isTTY on non-TTY stream', t => {
    const stream = makeMemoryStream();
    const w = new Writer(stream);

    t.equal(w.isTTY, undefined);
  });
});
