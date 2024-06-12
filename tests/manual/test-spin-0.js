import spin, {Spinner} from '../../src/spinner/index.js';
import {bouncingBall} from '../../src/spinner/spinners.js';
import {CURSOR_UP1} from '../../src/ansi/csi.js';

const spinner = spin`Spinner: [${new Spinner()}], ${new Spinner(bouncingBall)}`;

// drawing frames

let first = true;
const frameInterval = setInterval(() => {
  console.log((first ? '' : '\r' + CURSOR_UP1) + spinner.getFrame() + ' state: ' + spinner.state);
  first = false;
}, 100);

// control spinner

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

await timeout(1000);
spinner.active = true;
await timeout(3000);
spinner.paused = true;
await timeout(1000);
spinner.paused = false;
await timeout(3000);
spinner.finished = true;
await timeout(1000);
clearInterval(frameInterval);
