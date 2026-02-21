/** Base class for managing spinner state (active, paused, finished). */
export class SpinnerBase {
  active: boolean;
  paused: boolean;
  finished: boolean;
  frameIndex: number;

  constructor(isStarted?: boolean);

  readonly isStarted: boolean;
  readonly isActive: boolean;
  readonly isFinished: boolean;

  state: '' | 'active' | 'paused' | 'finished';

  reset(): void;
  nextFrameIndex(length: number): number;
  getFrame(): string;
}

export interface SpinnerDefinition {
  frames?: string[];
  notStarted?: string[];
  finished?: string[];
}

/** A spinner with configurable frame sets for different states.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-spinner}
 */
export class Spinner extends SpinnerBase {
  spinner: Required<SpinnerDefinition>;

  constructor(spinnerDefinition?: SpinnerDefinition, isStarted?: boolean);

  getFrame(): string;
}

export default Spinner;
