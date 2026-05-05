import {SpinnerBase} from './spinner.js';

class Spinner extends SpinnerBase {
  constructor(strings, args) {
    super(false);
    this.strings = strings;
    this.args = args;
    this.indices = new WeakMap();
  }

  tick() {
    for (const arg of this.args) {
      if (arg instanceof SpinnerBase) {
        arg.active = this.active;
        arg.paused = this.paused;
        arg.finished = this.finished;
        arg.tick();
        continue;
      }
      if (Array.isArray(arg)) {
        if (!this.indices.has(arg)) {
          this.indices.set(arg, 0);
          continue;
        }
        if (!this.finished && !this.paused && this.active) {
          this.indices.set(arg, (this.indices.get(arg) + 1) % arg.length);
        }
      }
    }
    return this;
  }

  getFrame() {
    let result = '';
    for (let i = 0; i < this.args.length; ++i) {
      const arg = this.args[i];

      result += this.strings[i];

      if (typeof arg == 'function') {
        result += String(arg(this.state));
        continue;
      }

      if (arg instanceof SpinnerBase) {
        result += arg.getFrame();
        continue;
      }

      if (Array.isArray(arg)) {
        result += String(arg[this.indices.get(arg) ?? 0]);
        continue;
      }

      result += String(arg);
    }

    result += this.strings[this.args.length];
    return result;
  }
}

const spin = (strings, ...args) => new Spinner(strings, args);

export default spin;
