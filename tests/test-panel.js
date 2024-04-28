import test from 'tape-six';

import Box from '../src/Box.js';
import Panel from '../src/Panel.js';
import style from '../src/style.js';

test('Panel', async t => {
  await t.test('Panel()', t => {
    const p = new Panel(3, 2);

    t.equal(p.width, 3);
    t.equal(p.height, 2);
    t.deepEqual(p.box, [
      [null, null, null],
      [null, null, null]
    ]);
    t.deepEqual(p.toBox('*').box, ['\x1B[m***', '\x1B[m***']);
  });

  await t.test('Panel.fromBox()', t => {
    const p = Panel.fromBox(['123', 'ab']);

    t.equal(p.width, 3);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox().box, ['123', 'ab ']);
  });

  await t.test('Panel.fromBox() with an ignore symbol', t => {
    const p = Panel.fromBox(['123', 'ab*'], '*');

    t.equal(p.width, 3);
    t.equal(p.height, 2);
    t.equal(p.box[1][2], null);
    t.deepEqual(p.toBox('-').box, ['123', 'ab\x1B[m-']);
  });

  await t.test('extract', t => {
    const p = Panel.fromBox(['one', 'two', 'three']);

    t.equal(p.width, 5);
    t.equal(p.height, 3);
    t.deepEqual(p.extract(2, 1, 3, 2).toBox().box, ['o  ', 'ree']);
  });

  await t.test('extract with clipping', t => {
    const p = Panel.fromBox(['one', 'two', 'three']);
    p.copyFrom(2, 1, 3, 2, Panel.fromBox(['12345', '67890']), 2, 1);

    t.equal(p.width, 5);
    t.equal(p.height, 3);
    t.deepEqual(p.toBox().box, ['one  ', 'tw890', 'three']);
  });

  await t.test('put', t => {
    const p = Panel.fromBox(['one', 'two', 'three']);

    t.equal(p.width, 5);
    t.equal(p.height, 3);
    t.deepEqual(p.toBox().box, ['one  ', 'two  ', 'three']);

    p.put(2, 1, Panel.fromBox(['123', 'ab']));
    t.deepEqual(p.toBox().box, ['one  ', 'tw123', 'thab ']);

    p.put(2, 1, new Box(['xyz', '12']));
    t.deepEqual(p.toBox().box, ['one  ', 'twxyz', 'th12 ']);

    p.put(2, 1, ['de', '987']);
    t.deepEqual(p.toBox().box, ['one  ', 'twde ', 'th987']);

    p.put(2, 1, '$%^');
    t.deepEqual(p.toBox().box, ['one  ', 'tw$%^', 'th987']);

    p.put(2, 1, true);
    t.deepEqual(p.toBox().box, ['one  ', 'twtru', 'th987']);

    p.put(2, 1, 42);
    t.deepEqual(p.toBox().box, ['one  ', 'tw42u', 'th987']);
  });

  await t.test('fill', t => {
    const p = Panel.fromBox(['one', 'two', 'three']);

    p.fill(2, 1, 3, 2, '*', style.red);
    t.deepEqual(p.toBox().box, ['one  ', 'tw\x1B[31m***\x1B[39m', 'th\x1B[31m***\x1B[39m']);
  });

  await t.test('fillState', t => {
    const p = new Panel(5, 5).put(1, 1, ['one', 'two']);

    p.fillState(1, 1, 3, 3, {state: style.red, ignore: '*'});
    t.deepEqual(p.toBox('-').box, [
      '\x1B[m-----',
      '\x1B[m-\x1B[31mone\x1B[m-',
      '\x1B[m-\x1B[31mtwo\x1B[m-',
      '\x1B[m-\x1B[31m***\x1B[m-',
      '\x1B[m-----'
    ]);
  });

  await t.test('fillNonEmptyState', t => {
    const p = new Panel(5, 5).put(1, 1, ['one', 'two']);

    p.fillNonEmptyState(1, 1, 3, 3, {state: style.red});
    t.deepEqual(p.toBox('-').box, [
      '\x1B[m-----',
      '\x1B[m-\x1B[31mone\x1B[m-',
      '\x1B[m-\x1B[31mtwo\x1B[m-',
      '\x1B[m-----',
      '\x1B[m-----'
    ]);
  });

  await t.test('combineStateBefore', t => {
    const p = new Panel(5, 5).put(1, 1, ['one', 'two']);

    p.combineStateBefore(1, 1, 3, 3, {state: style.bg.red, ignore: '*'});
    t.deepEqual(p.toBox('-').box, [
      '\x1B[m-----',
      '\x1B[m-\x1B[41mone\x1B[m-',
      '\x1B[m-\x1B[41mtwo\x1B[m-',
      '\x1B[m-***-',
      '\x1B[m-----'
    ]);
  });

  await t.test('combineStateAfter', t => {
    const p = new Panel(5, 5).put(1, 1, ['one', 'two']);

    p.combineStateAfter(1, 1, 3, 3, {state: style.bg.red, ignore: '*'});
    t.deepEqual(p.toBox('-').box, [
      '\x1B[m-----',
      '\x1B[m-\x1B[41mone\x1B[m-',
      '\x1B[m-\x1B[41mtwo\x1B[m-',
      '\x1B[m-\x1B[41m***\x1B[m-',
      '\x1B[m-----'
    ]);
  });

  await t.test('clear', t => {
    const p = Panel.fromBox(['one', 'two', 'three']);

    p.clear(2, 1, 3, 2);
    t.deepEqual(p.toBox('*').box, ['one  ', 'tw\x1B[m***', 'th\x1B[m***']);
  });

  await t.test('pad left', t => {
    const p = Panel.fromBox(['123', 'ab']).padLeft(2);

    t.equal(p.width, 5);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox('-').box, ['\x1B[m--123', '\x1B[m--ab ']);
  });

  await t.test('pad left/right', t => {
    const p = Panel.fromBox(['123', 'ab']).padLeftRight(2, 3);

    t.equal(p.width, 8);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox('-').box, ['\x1B[m--123---', '\x1B[m--ab ---']);
  });

  await t.test('pad right', t => {
    const p = Panel.fromBox(['123', 'ab']).padRight(3);

    t.equal(p.width, 6);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox('-').box, ['123\x1B[m---', 'ab \x1B[m---']);
  });

  await t.test('pad top', t => {
    const p = Panel.fromBox(['123', 'ab']).padTop(1);

    t.equal(p.width, 3);
    t.equal(p.height, 3);
    t.deepEqual(p.toBox('-').box, ['\x1B[m---', '123', 'ab ']);
  });

  await t.test('pad top/bottom', t => {
    const p = Panel.fromBox(['123', 'ab']).padTopBottom(1, 2);

    t.equal(p.width, 3);
    t.equal(p.height, 5);
    t.deepEqual(p.toBox('-').box, ['\x1B[m---', '123', 'ab ', '\x1B[m---', '\x1B[m---']);
  });

  await t.test('pad bottom', t => {
    const p = Panel.fromBox(['123', 'ab']).padBottom(2);

    t.equal(p.width, 3);
    t.equal(p.height, 4);
    t.deepEqual(p.toBox('-').box, ['123', 'ab ', '\x1B[m---', '\x1B[m---']);
  });

  await t.test('pad', t => {
    const p = Panel.fromBox(['123', 'ab']).pad(1, 2, 3, 4);

    t.equal(p.width, 9);
    t.equal(p.height, 6);
    t.deepEqual(p.toBox('-').box, [
      '\x1B[m---------',
      '\x1B[m----123--',
      '\x1B[m----ab --',
      '\x1B[m---------',
      '\x1B[m---------',
      '\x1B[m---------'
    ]);
  });

  await t.test('removeColumns', t => {
    const p = Panel.fromBox(['123', 'ab']).removeColumns(1, 2);

    t.equal(p.width, 1);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox().box, ['1', 'a']);
  });

  await t.test('removeRows', t => {
    const p = Panel.fromBox(['123', 'ab']).removeRows(1, 2);

    t.equal(p.width, 3);
    t.equal(p.height, 1);
    t.deepEqual(p.toBox().box, ['123']);
  });

  await t.test('insertColumns', t => {
    const p = Panel.fromBox(['123', 'ab']).insertColumns(1, 2);

    t.equal(p.width, 5);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox('*').box, ['1\x1B[m**23', 'a\x1B[m**b ']);
  });

  await t.test('insertRows', t => {
    const p = Panel.fromBox(['123', 'ab']).insertRows(1, 2);

    t.equal(p.width, 3);
    t.equal(p.height, 4);
    t.deepEqual(p.toBox('*').box, ['123', '\x1B[m***', '\x1B[m***', 'ab ']);
  });

  await t.test('add bottom', t => {
    let p = Panel.fromBox(['12345']).addBottom(Panel.fromBox(['ab']));

    t.equal(p.width, 5);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox('*').box, ['12345', 'ab\x1B[m***']);

    p = Panel.fromBox(['12345']).addBottom(Panel.fromBox(['ab']), {align: 'center'});

    t.equal(p.width, 5);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox('*').box, ['12345', '\x1B[m*ab**']);

    p = Panel.fromBox(['12345']).addBottom(Panel.fromBox(['ab']), {align: 'right'});

    t.equal(p.width, 5);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox('*').box, ['12345', '\x1B[m***ab']);

    p = Panel.fromBox(['123', 'ab']).addBottom(Panel.fromBox(['x']), {align: 'left'});
    t.deepEqual(p.toBox('*', {}).box, ['123', 'ab ', 'x**']);

    p = Panel.fromBox(['123', 'ab']).addBottom(Panel.fromBox(['x']), {align: 'center'});
    t.deepEqual(p.toBox('*', {}).box, ['123', 'ab ', '*x*']);

    p = Panel.fromBox(['123', 'ab']).addBottom(Panel.fromBox(['x']), {align: 'right'});
    t.deepEqual(p.toBox('*', {}).box, ['123', 'ab ', '**x']);
  });

  await t.test('add right', t => {
    let p = Panel.fromBox(['123', 'ab', 'c']).addRight(Panel.fromBox(['xyz']));

    t.equal(p.width, 6);
    t.equal(p.height, 3);
    t.deepEqual(p.toBox('*').box, ['123xyz', 'ab \x1B[m***', 'c  \x1B[m***']);

    p = Panel.fromBox(['123', 'ab', 'c']).addRight(Panel.fromBox(['xyz']), {align: 'center'});

    t.equal(p.width, 6);
    t.equal(p.height, 3);
    t.deepEqual(p.toBox('*').box, ['123\x1B[m***', 'ab xyz', 'c  \x1B[m***']);

    p = Panel.fromBox(['123', 'ab', 'c']).addRight(Panel.fromBox(['xyz']), {align: 'bottom'});

    t.equal(p.width, 6);
    t.equal(p.height, 3);
    t.deepEqual(p.toBox('*').box, ['123\x1B[m***', 'ab \x1B[m***', 'c  xyz']);

    p = Panel.fromBox(['123', 'ab', 'c']).addRight(Panel.fromBox(['x']), {align: 'top'});
    t.deepEqual(p.toBox('*', {}).box, ['123x', 'ab *', 'c  *']);

    p = Panel.fromBox(['123', 'ab', 'c']).addRight(Panel.fromBox(['x']), {align: 'center'});
    t.deepEqual(p.toBox('*', {}).box, ['123*', 'ab x', 'c  *']);

    p = Panel.fromBox(['123', 'ab', 'c']).addRight(Panel.fromBox(['x']), {align: 'bottom'});
    t.deepEqual(p.toBox('*', {}).box, ['123*', 'ab *', 'c  x']);
  });

  await t.test('transpose', t => {
    let p = Panel.fromBox(['123', 'ab']);

    t.equal(p.width, 3);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox().box, ['123', 'ab ']);

    p = p.transpose();

    t.equal(p.width, 2);
    t.equal(p.height, 3);
    t.deepEqual(p.toBox().box, ['1a', '2b', '3 ']);
  });

  await t.test('rotations', t => {
    const p = Panel.fromBox(['123', 'ab']);

    t.equal(p.width, 3);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox().box, ['123', 'ab ']);

    let r = p.rotateRight();

    t.equal(r.width, 2);
    t.equal(r.height, 3);
    t.deepEqual(r.toBox().box, ['a1', 'b2', ' 3']);

    r = r.rotateLeft();

    t.equal(r.width, 3);
    t.equal(r.height, 2);
    t.deepEqual(r.toBox().box, p.toBox().box);

    r = r.rotateLeft();

    t.equal(r.width, 2);
    t.equal(r.height, 3);
    t.deepEqual(r.toBox().box, ['3 ', '2b', '1a']);
  });

  await t.test('flips', t => {
    const p = Panel.fromBox(['123', 'ab']);

    t.equal(p.width, 3);
    t.equal(p.height, 2);
    t.deepEqual(p.toBox().box, ['123', 'ab ']);

    let f = p.clone().flipH();

    t.equal(f.width, 3);
    t.equal(f.height, 2);
    t.deepEqual(f.toBox().box, ['321', ' ba']);

    f.flipV();

    t.equal(f.width, 3);
    t.equal(f.height, 2);
    t.deepEqual(f.toBox().box, [' ba', '321']);

    t.deepEqual(f.toBox().box, p.clone().rotateRight().rotateRight().toBox().box);
    t.deepEqual(f.toBox().box, p.clone().rotateLeft().rotateLeft().toBox().box);

    t.deepEqual(p.clone().rotateLeft().toBox().box, p.clone().transpose().flipV().toBox().box);
    t.deepEqual(p.clone().rotateRight().toBox().box, p.clone().transpose().flipH().toBox().box);
  });
});
