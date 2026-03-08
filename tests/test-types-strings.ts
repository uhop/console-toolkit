import test from 'tape-six';
import {toStrings, getLength, getMaxLength, clipStrings, clip} from 'console-toolkit/strings';
import type {StringsInput, StringsValue, StringsFunction} from 'console-toolkit/strings';
import {matchCsiNoGroups, matchCsiNoSgrNoGroups} from 'console-toolkit/strings';
import Box from 'console-toolkit/box';

test('getLength signature', t => {
  const len: number = getLength('hello');
  const len2: number = getLength('hello', /\x1b\[[0-9;]*m/g);

  t.equal(typeof len, 'number', 'getLength returns number');
  t.equal(typeof len2, 'number', 'getLength with matcher');
});

test('getMaxLength signature', t => {
  const len: number = getMaxLength(['hello', 'world!']);
  const len2: number = getMaxLength(['hello'], /\x1b\[[0-9;]*m/g);

  t.equal(typeof len, 'number', 'getMaxLength returns number');
  t.equal(typeof len2, 'number', 'getMaxLength with matcher');
});

test('clipStrings signature', t => {
  const clipped: string[] = clipStrings(['hello world'], 5);
  const clipped2: string[] = clipStrings(['hello world'], 5, {includeLastCommand: true});

  t.ok(Array.isArray(clipped), 'clipStrings returns string[]');
  t.ok(Array.isArray(clipped2), 'clipStrings with options');
});

test('clip function', t => {
  const clipped: string = clip('hello world', 5);

  t.equal(typeof clipped, 'string', 'clip returns string');
});

test('toStrings with various inputs', t => {
  const r1: string[] = toStrings('hello');
  const r2: string[] = toStrings(['hello', 'world']);
  const r3: string[] = toStrings(42);
  const r4: string[] = toStrings(null);
  const r5: string[] = toStrings(undefined);
  const r6: string[] = toStrings(true);
  const box = Box.make('hello');
  const r7: string[] = toStrings(box);

  t.ok(Array.isArray(r1), 'string');
  t.ok(Array.isArray(r2), 'string[]');
  t.ok(Array.isArray(r3), 'number');
  t.ok(Array.isArray(r4), 'null');
  t.ok(Array.isArray(r5), 'undefined');
  t.ok(Array.isArray(r6), 'boolean');
  t.ok(Array.isArray(r7), 'Box');
});

test('StringsInput type compatibility', t => {
  const val1: StringsInput = 'hello';
  const val2: StringsInput = ['hello'];
  const val3: StringsInput = 42;
  const val4: StringsInput = null;
  const val5: StringsInput = undefined;
  const val6: StringsInput = true;
  const val7: StringsInput = () => 'hello';
  const val8: StringsInput = {toStrings: () => ['hello']};
  const val9: StringsInput = {toBox: () => ({box: ['hello']})};

  t.equal(typeof val1, 'string', 'string is StringsInput');
  t.equal(typeof val2, 'object', 'string[] is StringsInput');
  t.equal(typeof val3, 'number', 'number is StringsInput');
  t.equal(typeof val4, 'object', 'null is StringsInput');
  t.equal(typeof val5, 'undefined', 'undefined is StringsInput');
  t.equal(typeof val6, 'boolean', 'boolean is StringsInput');
  t.equal(typeof val7, 'function', 'function is StringsInput');
  t.equal(typeof val8, 'object', 'toStrings object is StringsInput');
  t.equal(typeof val9, 'object', 'toBox object is StringsInput');
});

test('parse matchers are RegExp', t => {
  t.ok(matchCsiNoGroups instanceof RegExp, 'matchCsiNoGroups');
  t.ok(matchCsiNoSgrNoGroups instanceof RegExp, 'matchCsiNoSgrNoGroups');
});
