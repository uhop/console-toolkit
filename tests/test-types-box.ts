import test from 'tape-six';
import Box, {toBox} from 'console-toolkit/box';
import type {BoxMakeOptions, AddBottomOptions, AddRightOptions} from 'console-toolkit/box';

test('Box constructor signatures', t => {
  const fromString: Box = new Box('hello');
  const fromArray: Box = new Box(['hello', 'world']);
  const fromBox: Box = new Box(fromString);
  const normalized: Box = new Box(['hello', 'world'], true);

  t.ok(fromString instanceof Box, 'from string');
  t.ok(fromArray instanceof Box, 'from array');
  t.ok(fromBox instanceof Box, 'from Box');
  t.ok(normalized instanceof Box, 'normalized');
});

test('Box properties', t => {
  const box = new Box('hello');
  const w: number = box.width;
  const h: number = box.height;
  const arr: string[] = box.box;

  t.equal(typeof w, 'number', 'width is number');
  t.equal(typeof h, 'number', 'height is number');
  t.ok(Array.isArray(arr), 'box is array');
});

test('Box static methods', t => {
  const made: Box = Box.make('hello');
  const madeOpts: Box = Box.make(['a', 'bb'], {symbol: '.', align: 'center'});
  const blank: Box = Box.makeBlank(10, 5);
  const blankSym: Box = Box.makeBlank(10, 5, '.');

  t.ok(made instanceof Box, 'make');
  t.ok(madeOpts instanceof Box, 'make with options');
  t.ok(blank instanceof Box, 'makeBlank');
  t.ok(blankSym instanceof Box, 'makeBlank with symbol');
});

test('Box conversion methods', t => {
  const box = Box.make('hello');
  const strings: string[] = box.toStrings();
  const cloned: Box = box.toBox();
  const cloned2: Box = box.clone();

  t.ok(Array.isArray(strings), 'toStrings returns string[]');
  t.ok(cloned instanceof Box, 'toBox returns Box');
  t.ok(cloned2 instanceof Box, 'clone returns Box');
});

test('Box pad methods return Box', t => {
  const box = Box.make('hello');
  const r1: Box = box.padLeft(1);
  const r2: Box = box.padRight(1);
  const r3: Box = box.padTop(1);
  const r4: Box = box.padBottom(1);
  const r5: Box = box.padLeftRight(1, 2);
  const r6: Box = box.padTopBottom(1, 2);
  const r7: Box = box.pad(1);
  const r8: Box = box.pad(1, 2);
  const r9: Box = box.pad(1, 2, 3);
  const r10: Box = box.pad(1, 2, 3, 4);
  const r11: Box = box.pad(1, 2, 3, 4, '.');

  t.ok(r1 instanceof Box && r2 instanceof Box, 'padLeft/padRight');
  t.ok(r3 instanceof Box && r4 instanceof Box, 'padTop/padBottom');
  t.ok(r5 instanceof Box && r6 instanceof Box, 'padLeftRight/padTopBottom');
  t.ok(r7 instanceof Box && r8 instanceof Box && r9 instanceof Box, 'pad 1-3 args');
  t.ok(r10 instanceof Box && r11 instanceof Box, 'pad 4-5 args');
});

test('Box manipulation methods return Box', t => {
  const box = Box.make(['hello', 'world', 'test!']);
  const clipped: Box = box.clip(3);
  const removed: Box = box.removeRows(0, 1);
  const flipped: Box = box.flipV();

  t.ok(clipped instanceof Box, 'clip');
  t.ok(removed instanceof Box, 'removeRows');
  t.ok(flipped instanceof Box, 'flipV');
});

test('Box composition methods', t => {
  const a = Box.make('hello');
  const b = Box.make('world');
  const bottom: Box = a.addBottom(b);
  const bottomOpts: Box = a.addBottom(b, {align: 'right'});
  const right: Box = a.addRight(b);
  const rightOpts: Box = a.addRight(b, {align: 'bottom'});

  t.ok(bottom instanceof Box, 'addBottom');
  t.ok(bottomOpts instanceof Box, 'addBottom with options');
  t.ok(right instanceof Box, 'addRight');
  t.ok(rightOpts instanceof Box, 'addRight with options');
});

test('Box alignment options', t => {
  const opts1: BoxMakeOptions = {align: 'left'};
  const opts2: BoxMakeOptions = {align: 'r'};
  const opts3: BoxMakeOptions = {align: 'center', symbol: '.'};
  const opts4: AddBottomOptions = {align: 'c'};
  const opts5: AddRightOptions = {align: 'top'};
  const opts6: AddRightOptions = {align: 'b', symbol: ' '};

  t.ok(opts1 && opts2 && opts3, 'BoxMakeOptions accept alignment shortcuts');
  t.ok(opts4 && opts5 && opts6, 'AddBottom/AddRight options accept alignment shortcuts');
});

test('toBox helper', t => {
  const box: Box = toBox('hello');
  const box2: Box = toBox(['hello', 'world'], {align: 'right'});

  t.ok(box instanceof Box, 'toBox from string');
  t.ok(box2 instanceof Box, 'toBox from array with options');
});
