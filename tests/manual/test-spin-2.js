import process from 'node:process';

import spin, {Spinner} from '../../src/spinner/index.js';
import {bouncingBall} from '../../src/spinner/spinners.js';
import Writer from '../../src/output/writer.js';
import Updater from '../../src/output/updater.js';
import {CURSOR_NORMAL, CURSOR_INVISIBLE} from '../../src/ansi/csi.js';

const spinner = spin`spinner: [${new Spinner()}]
spinner: ${new Spinner(bouncingBall)}
state:   ${state => state}`;

// drawing frames

const writer = new Writer();
const updater = new Updater(
  spinner,
  {prologue: CURSOR_INVISIBLE, epilogue: '\n' + CURSOR_NORMAL, noLastNewLine: true},
  writer
);

process.once('SIGINT', () => {
  updater.done();
  process.exit(130);
});

// control spinner

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

updater.update('');
await sleep(1000);
updater.startRefreshing();
await sleep(3000);
updater.stopRefreshing();
await sleep(1000);
updater.startRefreshing();
await sleep(3000);
updater.final();
