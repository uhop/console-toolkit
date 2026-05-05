import {checkMarkHeavy} from '../symbols.js';

export class SpinnerBase {
  constructor(isStarted) {
    this.active = isStarted;
    this.paused = false;
    this.finished = false;
    this.frameIndex = 0;
  }

  get isStarted() {
    return this.active || this.finished;
  }

  get isActive() {
    return this.active;
  }

  get isFinished() {
    return this.finished;
  }

  get state() {
    if (this.finished) return 'finished';
    if (this.active) return this.paused ? 'paused' : 'active';
    return '';
  }

  set state(value) {
    this.finished = this.active = this.paused = false;
    switch (value) {
      case 'finished':
        this.finished = true;
        break;
      case 'paused':
        this.active = this.paused = true;
        break;
      case 'active':
        this.active = true;
        break;
    }
  }

  reset() {
    this.active = this.paused = this.finished = false;
  }

  nextFrameIndex(length) {
    return (this.frameIndex = (this.frameIndex + 1) % length);
  }

  tick() {
    return this;
  }

  getFrame() {
    return 'X';
  }

  nextFrame() {
    this.tick();
    return this.getFrame();
  }
}

const defaultSpinnerDefinition = {notStarted: [' '], finished: [checkMarkHeavy], frames: [...'⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏']};

export class Spinner extends SpinnerBase {
  constructor(spinnerDefinition, isStarted) {
    super(isStarted);
    this.spinner = {...defaultSpinnerDefinition, ...spinnerDefinition};
  }

  tick() {
    if (this.finished) {
      this.nextFrameIndex(this.spinner.finished.length);
    } else if (!this.active) {
      this.nextFrameIndex(this.spinner.notStarted.length);
    } else if (!this.paused) {
      this.nextFrameIndex(this.spinner.frames.length);
    }
    return this;
  }

  getFrame() {
    const arr = this.finished ? this.spinner.finished : !this.active ? this.spinner.notStarted : this.spinner.frames;
    return arr[this.frameIndex % arr.length];
  }
}

export default Spinner;
