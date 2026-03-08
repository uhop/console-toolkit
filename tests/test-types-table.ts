import test from 'tape-six';
import {Table, make} from 'console-toolkit/table';
import type {TableCellInput, CellData, TableOptions, GenerateAxesOptions} from 'console-toolkit/table/table.js';
import {lineTheme as unicodeLineTheme} from 'console-toolkit/themes/lines/unicode.js';
import Panel from 'console-toolkit/panel';
import Box from 'console-toolkit/box';

test('Table constructor', t => {
  const data: TableCellInput[][] = [
    ['A', 'B', 'C'],
    [1, 2, 3]
  ];
  const table: Table = new Table(data, unicodeLineTheme);

  t.ok(table instanceof Table, 'constructor');
  t.equal(typeof table.width, 'number', 'width');
  t.equal(typeof table.height, 'number', 'height');
  t.ok(Array.isArray(table.data), 'data');
  t.ok(Array.isArray(table.widths), 'widths');
  t.ok(Array.isArray(table.heights), 'heights');
});

test('Table constructor with options', t => {
  const data: TableCellInput[][] = [
    ['A', 'B'],
    [1, 2]
  ];
  const opts: TableOptions = {
    hAxis: '111',
    vAxis: '111',
    hAlign: ['left', 'right'],
    vAlign: ['top'],
    cellPadding: {l: 1, r: 1, t: 0, b: 0}
  };
  const table: Table = new Table(data, unicodeLineTheme, opts);

  t.ok(table instanceof Table, 'with options');
});

test('Table draw/toPanel/toBox/toStrings', t => {
  const data: TableCellInput[][] = [
    ['A', 'B'],
    [1, 2]
  ];
  const table = Table.make(data, unicodeLineTheme);
  const panel: Panel = table.draw();
  const panel2: Panel = table.toPanel();
  const box: Box = table.toBox();
  const strings: string[] = table.toStrings();

  t.ok(panel instanceof Panel, 'draw');
  t.ok(panel2 instanceof Panel, 'toPanel');
  t.ok(box instanceof Box, 'toBox');
  t.ok(Array.isArray(strings), 'toStrings');
});

test('Table.isVisible', t => {
  const data: TableCellInput[][] = [
    ['A', 'B'],
    [1, 2]
  ];
  const table = Table.make(data, unicodeLineTheme);
  const visible: boolean = table.isVisible(0, 0);

  t.equal(typeof visible, 'boolean', 'isVisible returns boolean');
});

test('Table.generateAxes', t => {
  const opts: GenerateAxesOptions = {borderTop: 1, borderBottom: 1, borderLeft: 1, borderRight: 1};
  const result: TableOptions = Table.generateAxes(3, 2, opts);

  t.notEqual(result, undefined, 'generateAxes returns TableOptions');
});

test('Table.make', t => {
  const data: TableCellInput[][] = [
    ['A', 'B'],
    [1, 2]
  ];
  const table: Table = Table.make(data, unicodeLineTheme);
  const table2: Table = Table.make(data, unicodeLineTheme, {borderTop: 1});

  t.ok(table instanceof Table, 'make basic');
  t.ok(table2 instanceof Table, 'make with options');
});

test('CellData type', t => {
  const cell1: CellData = {value: 'hello'};
  const cell2: CellData = {value: 'hello', align: 'center', width: 2, height: 1};

  t.equal(cell1.value, 'hello', 'CellData basic');
  t.equal(cell2.width, 2, 'CellData with span');
});

test('TableCellInput accepts various types', t => {
  const inputs: TableCellInput[] = [
    'string',
    42,
    true,
    null,
    undefined,
    Box.make('box'),
    Panel.make('panel'),
    {value: 'cell data'}
  ];

  t.equal(inputs.length, 8, 'all input types accepted');
});

test('make default export', t => {
  const data: TableCellInput[][] = [
    ['A', 'B'],
    [1, 2]
  ];
  const table: Table = make(data, unicodeLineTheme);

  t.ok(table instanceof Table, 'make shortcut');
});
