import test from 'tape-six';
import Panel, {toPanel} from 'console-toolkit/panel';
import type {PanelCell, PanelPutOptions, PanelToStringsOptions} from 'console-toolkit/panel';
import Box from 'console-toolkit/box';
import type {SgrState} from 'console-toolkit/ansi/sgr-state.js';

test('Panel constructor and properties', t => {
  const panel: Panel = new Panel(10, 5);
  const w: number = panel.width;
  const h: number = panel.height;
  const box: (PanelCell | null)[][] = panel.box;

  t.ok(panel instanceof Panel, 'constructor');
  t.equal(typeof w, 'number', 'width');
  t.equal(typeof h, 'number', 'height');
  t.ok(Array.isArray(box), 'box');
});

test('Panel.make and conversion', t => {
  const panel: Panel = Panel.make('hello');
  const strings: string[] = panel.toStrings();
  const stringsOpts: string[] = panel.toStrings({emptySymbol: '.'});
  const box: Box = panel.toBox();
  const cloned: Panel = panel.toPanel();
  const cloned2: Panel = panel.clone();

  t.ok(panel instanceof Panel, 'make');
  t.ok(Array.isArray(strings), 'toStrings');
  t.ok(Array.isArray(stringsOpts), 'toStrings with options');
  t.ok(box instanceof Box, 'toBox');
  t.ok(cloned instanceof Panel, 'toPanel');
  t.ok(cloned2 instanceof Panel, 'clone');
});

test('Panel extract and copyFrom', t => {
  const panel = Panel.make(['hello', 'world']);
  const extracted: Panel = panel.extract();
  const extracted2: Panel = panel.extract(0, 0, 3, 1);
  const source = Panel.make('ab');
  const result: Panel = panel.copyFrom(0, 0, 2, 1, source);
  const result2: Panel = panel.copyFrom(0, 0, 2, 1, source, 0, 0);

  t.ok(extracted instanceof Panel, 'extract no args');
  t.ok(extracted2 instanceof Panel, 'extract with args');
  t.equal(result, panel, 'copyFrom mutates this');
  t.equal(result2, panel, 'copyFrom with source offsets');
});

test('Panel put', t => {
  const panel = new Panel(10, 5);
  const r1: Panel = panel.put(0, 0, 'hello');
  const r2: Panel = panel.put(0, 0, ['hello', 'world']);
  const r3: Panel = panel.put(0, 0, Box.make('hello'));
  const opts: PanelPutOptions = {emptySymbol: '\x07'};
  const r4: Panel = panel.put(0, 0, 'hello', opts);

  t.equal(r1, panel, 'put string');
  t.equal(r2, panel, 'put string[]');
  t.equal(r3, panel, 'put Box');
  t.equal(r4, panel, 'put with options');
});

test('Panel applyFn overloads', t => {
  const panel = Panel.make('hello');
  const r1: Panel = panel.applyFn((_x, _y, cell) => cell);
  const r2: Panel = panel.applyFn(0, 0, 5, 1, (_x, _y, cell) => cell);

  t.equal(r1, panel, 'applyFn whole panel');
  t.equal(r2, panel, 'applyFn region');
});

test('Panel fill overloads', t => {
  const panel = new Panel(10, 5);
  const r1: Panel = panel.fill('.');
  const r2: Panel = panel.fill('.', '\x1b[31m');
  const r3: Panel = panel.fill(0, 0, 5, 3, '.');
  const r4: Panel = panel.fill(0, 0, 5, 3, '.', '\x1b[31m');

  t.equal(r1, panel, 'fill whole');
  t.equal(r2, panel, 'fill whole with state');
  t.equal(r3, panel, 'fill region');
  t.equal(r4, panel, 'fill region with state');
});

test('Panel fillState and fillNonEmptyState overloads', t => {
  const panel = Panel.make('hello');
  const r1: Panel = panel.fillState();
  const r2: Panel = panel.fillState({state: '\x1b[31m'});
  const r3: Panel = panel.fillState(0, 0, 5, 1);
  const r4: Panel = panel.fillState(0, 0, 5, 1, {state: '\x1b[31m'});
  const r5: Panel = panel.fillNonEmptyState();
  const r6: Panel = panel.fillNonEmptyState({state: '\x1b[31m'});
  const r7: Panel = panel.fillNonEmptyState(0, 0, 5, 1);
  const r8: Panel = panel.fillNonEmptyState(0, 0, 5, 1, {state: '\x1b[31m'});

  t.ok(r1 === panel && r2 === panel, 'fillState whole');
  t.ok(r3 === panel && r4 === panel, 'fillState region');
  t.ok(r5 === panel && r6 === panel, 'fillNonEmptyState whole');
  t.ok(r7 === panel && r8 === panel, 'fillNonEmptyState region');
});

test('Panel combineState overloads', t => {
  const panel = Panel.make('hello');
  const r1: Panel = panel.combineStateBefore();
  const r2: Panel = panel.combineStateBefore({state: '\x1b[31m'});
  const r3: Panel = panel.combineStateBefore(0, 0, 5, 1);
  const r4: Panel = panel.combineStateAfter();
  const r5: Panel = panel.combineStateAfter({state: '\x1b[31m'});
  const r6: Panel = panel.combineStateAfter(0, 0, 5, 1);
  const r7: Panel = panel.combineState();

  t.ok(r1 === panel && r2 === panel && r3 === panel, 'combineStateBefore');
  t.ok(r4 === panel && r5 === panel && r6 === panel, 'combineStateAfter');
  t.ok(r7 === panel, 'combineState alias');
});

test('Panel clear overloads', t => {
  const panel = Panel.make('hello');
  const r1: Panel = panel.clear();
  const r2: Panel = panel.clear(0, 0, 5, 1);

  t.ok(r1 === panel, 'clear whole');
  t.ok(r2 === panel, 'clear region');
});

test('Panel pad methods return this', t => {
  const panel = Panel.make('hello');
  const r1: Panel = panel.padLeft(1);
  const r2: Panel = panel.padRight(1);
  const r3: Panel = panel.padTop(1);
  const r4: Panel = panel.padBottom(1);
  const r5: Panel = panel.padLeftRight(1, 2);
  const r6: Panel = panel.padTopBottom(1, 2);
  const r7: Panel = panel.pad(1);
  const r8: Panel = panel.pad(1, 2);
  const r9: Panel = panel.pad(1, 2, 3, 4);

  t.ok(r1 === panel && r2 === panel, 'padLeft/padRight');
  t.ok(r3 === panel && r4 === panel, 'padTop/padBottom');
  t.ok(r5 === panel && r6 === panel, 'padLeftRight/padTopBottom');
  t.ok(r7 === panel && r8 === panel && r9 === panel, 'pad shorthand');
});

test('Panel structural methods', t => {
  const panel = Panel.make(['hello', 'world']);
  const r1: Panel = panel.removeColumns(0, 1);
  const r2: Panel = panel.removeRows(0, 1);
  const r3: Panel = panel.insertColumns(0, 1);
  const r4: Panel = panel.insertRows(0, 1);
  const r5: Panel = panel.resizeH(10);
  const r6: Panel = panel.resizeV(10);
  const r7: Panel = panel.resize(10, 10);
  const r8: Panel = panel.resizeH(10, 'center');
  const r9: Panel = panel.resizeV(10, 'top');
  const r10: Panel = panel.resize(10, 10, 'left', 'bottom');

  t.ok(r1 === panel && r2 === panel, 'remove');
  t.ok(r3 === panel && r4 === panel, 'insert');
  t.ok(r5 === panel && r6 === panel && r7 === panel, 'resize');
  t.ok(r8 === panel && r9 === panel && r10 === panel, 'resize with alignment');
});

test('Panel composition and transforms', t => {
  const a = Panel.make('hello');
  const b = Panel.make('world');
  const r1: Panel = a.addBottom(b);
  const r2: Panel = a.addRight(b);
  const r3: Panel = a.addBottom(b, {align: 'center'});
  const r4: Panel = a.addRight(b, {align: 'bottom'});

  const transposed: Panel = a.transpose();
  const rotR: Panel = a.rotateRight();
  const rotL: Panel = a.rotateLeft();
  const flipH: Panel = a.flipH();
  const flipV: Panel = a.flipV();

  t.ok(r1 === a && r2 === a, 'addBottom/addRight mutate this');
  t.ok(r3 === a && r4 === a, 'addBottom/addRight with options');
  t.ok(transposed instanceof Panel, 'transpose returns new Panel');
  t.ok(rotR instanceof Panel && rotL instanceof Panel, 'rotate returns new Panel');
  t.ok(flipH === a && flipV === a, 'flip mutates this');
});

test('toPanel helper', t => {
  const panel: Panel = toPanel('hello');
  const panel2: Panel = toPanel(['hello', 'world']);

  t.ok(panel instanceof Panel, 'toPanel from string');
  t.ok(panel2 instanceof Panel, 'toPanel from array');
});
