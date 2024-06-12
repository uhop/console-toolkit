import spin, {Spinner} from '../../src/spinner/index.js';
import {bouncingBall} from '../../src/spinner/spinners.js';
import {CURSOR_UP1} from '../../src/ansi/csi.js';

const spinner = spin`Spinner: [${new Spinner()}], ${new Spinner(bouncingBall)}, state: ${state => state}`;

// drawing frames

let first = true;
const frameInterval = setInterval(() => {
  console.log((first ? '' : '\r' + CURSOR_UP1) + spinner.getFrame());
  first = false;
}, 100);

// control spinner

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

await sleep(1000);
spinner.active = true;
await sleep(3000);
spinner.paused = true;
await sleep(1000);
spinner.paused = false;
await sleep(3000);
spinner.finished = true;
await sleep(1000);
clearInterval(frameInterval);
