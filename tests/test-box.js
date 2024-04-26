import test from 'tape-six';

import Box from '../src/Box.js';

test('Box', async t => {
  await t.test('Box()', t => {
    const b = new Box(['one', 'two', 'three']);

    t.equal(b.width, 5);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['one  ', 'two  ', 'three']);
  });

  await t.test('Box.make() with align=right', t => {
    const b = Box.make(['one', 'two', 'three'], {symbol: '*', align: 'right'});

    t.equal(b.width, 5);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['**one', '**two', 'three']);
  });

  await t.test('Box.make() with align=center', t => {
    const b = Box.make(['one', 'two', 'three'], {symbol: '=', align: 'center'});

    t.equal(b.width, 5);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['=one=', '=two=', 'three']);
  });

  await t.test('Box.makeBlank()', t => {
    const b = Box.makeBlank(3, 3, '.');

    t.equal(b.width, 3);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['...', '...', '...']);
  });

  await t.test('pad left', t => {
    const b = new Box(['123', 'ab']).padLeft(2, '-');

    t.equal(b.width, 5);
    t.equal(b.height, 2);
    t.deepEqual(b.box, ['--123', '--ab ']);
  });

  await t.test('pad left/right', t => {
    const b = new Box(['123', 'ab']).padLeftRight(2, 3, '-');

    t.equal(b.width, 8);
    t.equal(b.height, 2);
    t.deepEqual(b.box, ['--123---', '--ab ---']);
  });

  await t.test('pad right', t => {
    const b = new Box(['123', 'ab']).padRight(3, '-');

    t.equal(b.width, 6);
    t.equal(b.height, 2);
    t.deepEqual(b.box, ['123---', 'ab ---']);
  });

  await t.test('pad top', t => {
    const b = new Box(['123', 'ab']).padTop(1, '-');

    t.equal(b.width, 3);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['---', '123', 'ab ']);
  });

  await t.test('pad top/bottom', t => {
    const b = new Box(['123', 'ab']).padTopBottom(1, 2, '-');

    t.equal(b.width, 3);
    t.equal(b.height, 5);
    t.deepEqual(b.box, ['---', '123', 'ab ', '---', '---']);
  });

  await t.test('pad bottom', t => {
    const b = new Box(['123', 'ab']).padBottom(2, '-');

    t.equal(b.width, 3);
    t.equal(b.height, 4);
    t.deepEqual(b.box, ['123', 'ab ', '---', '---']);
  });

  await t.test('pad', t => {
    const b = new Box(['123', 'ab']).pad(1, 2, 3, 4, '-');

    t.equal(b.width, 9);
    t.equal(b.height, 6);
    t.deepEqual(b.box, ['---------', '----123--', '----ab --', '---------', '---------', '---------']);
  });

  await t.test('clip', t => {
    let b = new Box(['one', 'two', 'three']);
    t.equal(b.width, 5);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['one  ', 'two  ', 'three']);

    b = b.clip(3);
    t.equal(b.width, 3);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['one', 'two', 'thr']);
  });

  await t.test('add bottom', t => {
    let b = new Box(['12345']).addBottom(new Box(['ab']));

    t.equal(b.width, 5);
    t.equal(b.height, 2);
    t.deepEqual(b.box, ['12345', 'ab   ']);

    b = new Box(['12345']).addBottom(new Box(['ab']), {align: 'center'});

    t.equal(b.width, 5);
    t.equal(b.height, 2);
    t.deepEqual(b.box, ['12345', ' ab  ']);

    b = new Box(['12345']).addBottom(new Box(['ab']), {align: 'right'});

    t.equal(b.width, 5);
    t.equal(b.height, 2);
    t.deepEqual(b.box, ['12345', '   ab']);
  });

  await t.test('add right', t => {
    let b = new Box(['123', 'ab', 'c']).addRight(new Box(['xyz']));

    t.equal(b.width, 6);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['123xyz', 'ab    ', 'c     ']);

    b = new Box(['123', 'ab', 'c']).addRight(new Box(['xyz']), {align: 'center'});

    t.equal(b.width, 6);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['123   ', 'ab xyz', 'c     ']);

    b = new Box(['123', 'ab', 'c']).addRight(new Box(['xyz']), {align: 'bottom'});

    t.equal(b.width, 6);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['123   ', 'ab    ', 'c  xyz']);
  });

  await t.test('flips', t => {
    let b = new Box(['123', 'ab', 'c']);

    t.equal(b.width, 3);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['123', 'ab ', 'c  ']);

    b = b.flipH();

    t.equal(b.width, 3);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['321', ' ba', '  c']);

    b = b.flipV();

    t.equal(b.width, 3);
    t.equal(b.height, 3);
    t.deepEqual(b.box, ['  c', ' ba', '321']);
  });
});
