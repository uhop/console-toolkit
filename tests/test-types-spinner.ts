import test from 'tape-six';
import spin, {Spinner} from 'console-toolkit/spinner';
import type {SpinnerBase, SpinnerDefinition} from 'console-toolkit/spinner/spinner.js';

test('SpinnerBase constructor and properties', t => {
  const sb = new Spinner();
  t.notOk(sb.active, 'active defaults to falsy');
  t.notOk(sb.paused, 'paused defaults to falsy');
  t.notOk(sb.finished, 'finished defaults to falsy');
  t.equal(typeof sb.frameIndex, 'number', 'frameIndex');
  t.notOk(sb.isStarted, 'isStarted');
  t.notOk(sb.isActive, 'isActive');
  t.notOk(sb.isFinished, 'isFinished');
  t.equal(typeof sb.state, 'string', 'state');

  const _active: boolean = sb.active;
  const _paused: boolean = sb.paused;
  const _finished: boolean = sb.finished;
  const _fi: number = sb.frameIndex;
  const _isStarted: boolean = sb.isStarted;
  const _isActive: boolean = sb.isActive;
  const _isFinished: boolean = sb.isFinished;
  const _state: '' | 'active' | 'paused' | 'finished' = sb.state;
});

test('Spinner constructor signatures', t => {
  const s1: Spinner = new Spinner();
  const s2: Spinner = new Spinner({frames: ['|', '/', '-', '\\']});
  const s3: Spinner = new Spinner({frames: ['|', '/']}, true);

  t.ok(s1 instanceof Spinner, 'no args');
  t.ok(s2 instanceof Spinner, 'with definition');
  t.ok(s3 instanceof Spinner, 'with isStarted');
});

test('Spinner methods', t => {
  const s = new Spinner({frames: ['|', '/', '-', '\\']});
  s.reset();
  const frame: string = s.getFrame();
  const next: number = s.nextFrameIndex(4);

  t.ok(typeof frame === 'string', 'getFrame returns string');
  t.ok(typeof next === 'number', 'nextFrameIndex returns number');
});

test('SpinnerDefinition type', t => {
  const def1: SpinnerDefinition = {frames: ['|', '/']};
  const def2: SpinnerDefinition = {frames: ['|'], notStarted: ['?'], finished: ['!']};
  const def3: SpinnerDefinition = {};

  t.ok(def1.frames!.length === 2, 'frames only');
  t.ok(def2.notStarted!.length === 1, 'all fields');
  t.ok(def3 !== undefined, 'empty definition');
});

test('spin tagged template', t => {
  const s1 = new Spinner({frames: ['|', '/', '-', '\\']});
  const result: SpinnerBase = spin`Loading ${s1}...`;

  t.ok(result !== undefined, 'spin returns SpinnerBase');
  t.ok(typeof result.getFrame === 'function', 'result has getFrame');
});
