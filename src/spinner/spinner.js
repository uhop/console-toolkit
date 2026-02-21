import {checkMarkHeavy} from '../symbols.js';

/** Base class for spinners. Manages spinner state (active, paused, finished) and frame index. */
export class SpinnerBase {
  /**
   * @param {boolean} [isStarted=false] - Whether the spinner starts in the active state.
   */
  constructor(isStarted) {
    this.active = isStarted;
    this.paused = false;
    this.finished = false;
    this.frameIndex = 0;
  }

  /** Whether the spinner has been started (active or finished). */
  get isStarted() {
    return this.active || this.finished;
  }

  /** Whether the spinner is currently active. */
  get isActive() {
    return this.active;
  }

  /** Whether the spinner has finished. */
  get isFinished() {
    return this.finished;
  }

  /** The current state: `''`, `'active'`, `'paused'`, or `'finished'`. */
  get state() {
    if (this.finished) return 'finished';
    if (this.active) return this.paused ? 'paused' : 'active';
    return '';
  }

  /** Sets the spinner state.
   * @param {''|'active'|'paused'|'finished'} value
   */
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

  /** Resets the spinner to its initial (not started) state. */
  reset() {
    this.active = this.paused = this.finished = false;
  }

  /** Advances and returns the next frame index.
   * @param {number} length - The total number of frames.
   * @returns {number} The new frame index.
   */
  nextFrameIndex(length) {
    return (this.frameIndex = (this.frameIndex + 1) % length);
  }

  /** Returns the current frame string. Override in subclasses.
   * @returns {string}
   */
  getFrame() {
    return 'X';
  }
}

const defaultSpinnerDefinition = {notStarted: [' '], finished: [checkMarkHeavy], frames: [...'⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏']};

/** A spinner with configurable frame sets for active, not-started, and finished states. */
export class Spinner extends SpinnerBase {
  /**
   * @param {object} [spinnerDefinition] - Spinner definition with `frames`, `notStarted`, and `finished` arrays.
   * @param {string[]} [spinnerDefinition.frames] - Animation frames for the active state.
   * @param {string[]} [spinnerDefinition.notStarted] - Frames shown before the spinner starts.
   * @param {string[]} [spinnerDefinition.finished] - Frames shown after the spinner finishes.
   * @param {boolean} [isStarted=false] - Whether the spinner starts active.
   */
  constructor(spinnerDefinition, isStarted) {
    super(isStarted);
    this.spinner = {...defaultSpinnerDefinition, ...spinnerDefinition};
  }

  /** Returns the current frame based on the spinner's state.
   * @returns {string}
   */
  getFrame() {
    if (this.finished) return this.spinner.finished[this.nextFrameIndex(this.spinner.finished.length)];
    if (!this.active) return this.spinner.notStarted[this.nextFrameIndex(this.spinner.notStarted.length)];
    if (!this.paused) this.nextFrameIndex(this.spinner.frames.length);
    return this.spinner.frames[this.frameIndex];
  }
}

export default Spinner;
