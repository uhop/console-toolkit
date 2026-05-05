/** Base class for managing spinner state (active, paused, finished). */
export class SpinnerBase {
  /** Whether the spinner is active. */
  active: boolean;
  /** Whether the spinner is paused. */
  paused: boolean;
  /** Whether the spinner is finished. */
  finished: boolean;
  /** Current frame index. */
  frameIndex: number;

  /**
   * @param isStarted - If true, start in active state.
   */
  constructor(isStarted?: boolean);

  /** Whether the spinner has been started. */
  readonly isStarted: boolean;
  /** Whether the spinner is currently active. */
  readonly isActive: boolean;
  /** Whether the spinner is finished. */
  readonly isFinished: boolean;

  /** The current state string: '', 'active', 'paused', or 'finished'. */
  state: '' | 'active' | 'paused' | 'finished';

  /** Resets the spinner to its initial state. */
  reset(): void;
  /** Advances and returns the next frame index.
   * @param length - Number of frames available.
   * @returns The next frame index.
   */
  nextFrameIndex(length: number): number;
  /** Advances internal state by one step (state-aware: only advances when active+!paused or in finished/notStarted modes).
   * Pure mutation — call `getFrame()` after to read the new frame.
   * @returns This instance.
   */
  tick(): this;
  /** Returns the frame string at the current index. Read-only — does not mutate.
   * @returns The frame string.
   */
  getFrame(): string;
  /** Convenience: calls `tick()` then `getFrame()`. Equivalent to the pre-1.3 `getFrame()` advance-and-return.
   * @returns The frame string at the new index.
   */
  nextFrame(): string;
}

/** Definition of spinner frame sets. */
export interface SpinnerDefinition {
  /** Frames for the active state. */
  frames?: string[];
  /** Frames for the not-started state. */
  notStarted?: string[];
  /** Frames for the finished state. */
  finished?: string[];
}

/** A spinner with configurable frame sets for different states.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-spinner}
 */
export class Spinner extends SpinnerBase {
  /** The resolved spinner definition with all frame sets. */
  spinner: Required<SpinnerDefinition>;

  /**
   * @param spinnerDefinition - Spinner frame definition.
   * @param isStarted - If true, start in active state.
   */
  constructor(spinnerDefinition?: SpinnerDefinition, isStarted?: boolean);

  /** Advances frame index for the active state-array (frames / notStarted / finished).
   * No-op in `paused` state. Read-only-call `getFrame()` after.
   * @returns This instance.
   */
  tick(): this;
  /** Returns the frame string at the current index for the active state-array. Read-only.
   * @returns The frame string.
   */
  getFrame(): string;
}

export default Spinner;
