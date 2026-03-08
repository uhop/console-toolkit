import test from 'tape-six';

import Box, {toBox} from 'console-toolkit/box';
import type {BoxMakeOptions, AddBottomOptions, AddRightOptions} from 'console-toolkit/box';

import Panel, {toPanel} from 'console-toolkit/panel';
import type {PanelCell, PanelPutOptions, PanelToStringsOptions} from 'console-toolkit/panel';

import style, {Style, s, c, RESET_STATE} from 'console-toolkit/style';

import {toStrings, getLength, getMaxLength, clipStrings, clip} from 'console-toolkit/strings';
import type {StringsInput, StringsValue, StringsFunction} from 'console-toolkit/strings';

import {ESC, CURSOR_DELETE, CURSOR_GO_UP1, CURSOR_SAVE, CURSOR_RESTORE} from 'console-toolkit/ansi';

import {Table, draw as drawTable, make as makeTable} from 'console-toolkit/table';

import Bitmap, {drawLine, drawRect, toQuads} from 'console-toolkit/plot';

import Turtle, {draw as drawTurtle} from 'console-toolkit/turtle';

import {Spinner} from 'console-toolkit/spinner';
import spin from 'console-toolkit/spinner';

import {drawBlock, drawFrame} from 'console-toolkit/draw-block.js';
import {drawRealWidthBlock, drawRealHeightBlock} from 'console-toolkit/draw-block-frac.js';

test('default imports are the expected types', t => {
  t.ok(Box instanceof Function, 'Box is a function');
  t.ok(Panel instanceof Function, 'Panel is a function');
  t.ok(style instanceof Style, 'style is a Style');
  t.ok(Bitmap instanceof Function, 'Bitmap is a function');
  t.ok(Turtle instanceof Function, 'Turtle is a function');
  t.equal(typeof spin, 'function', 'spin is a function');
});

test('named imports are defined', t => {
  t.equal(typeof toBox, 'function', 'toBox');
  t.equal(typeof toPanel, 'function', 'toPanel');
  t.equal(typeof toStrings, 'function', 'toStrings');
  t.equal(typeof getLength, 'function', 'getLength');
  t.equal(typeof getMaxLength, 'function', 'getMaxLength');
  t.equal(typeof clipStrings, 'function', 'clipStrings');
  t.equal(typeof clip, 'function', 'clip');
  t.equal(typeof s, 'function', 's');
  t.equal(typeof c, 'function', 'c');
  t.equal(typeof ESC, 'string', 'ESC');
  t.equal(typeof CURSOR_DELETE, 'string', 'CURSOR_DELETE');
  t.equal(typeof CURSOR_GO_UP1, 'string', 'CURSOR_GO_UP1');
  t.equal(typeof CURSOR_SAVE, 'string', 'CURSOR_SAVE');
  t.equal(typeof CURSOR_RESTORE, 'string', 'CURSOR_RESTORE');
  t.equal(typeof Table, 'function', 'Table');
  t.equal(typeof drawTable, 'function', 'drawTable');
  t.equal(typeof makeTable, 'function', 'makeTable');
  t.equal(typeof drawLine, 'function', 'drawLine');
  t.equal(typeof drawRect, 'function', 'drawRect');
  t.equal(typeof toQuads, 'function', 'toQuads');
  t.equal(typeof drawTurtle, 'function', 'drawTurtle');
  t.equal(typeof Spinner, 'function', 'Spinner');
  t.equal(typeof drawBlock, 'function', 'drawBlock');
  t.equal(typeof drawFrame, 'function', 'drawFrame');
  t.equal(typeof drawRealWidthBlock, 'function', 'drawRealWidthBlock');
  t.equal(typeof drawRealHeightBlock, 'function', 'drawRealHeightBlock');
});
