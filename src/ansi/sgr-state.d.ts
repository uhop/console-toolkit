/** SGR (Select Graphics Rendition) state object. Properties are `null` for reset, a command string when set, or `undefined` when unspecified. */
export interface SgrState {
  /** Bold attribute command or `null` to reset. */
  bold?: string | null;
  /** Dim/faint attribute command or `null` to reset. */
  dim?: string | null;
  /** Italic attribute command or `null` to reset. */
  italic?: string | null;
  /** Underline attribute command or `null` to reset. */
  underline?: string | null;
  /** Blink attribute command or `null` to reset. */
  blink?: string | null;
  /** Inverse/reverse attribute command or `null` to reset. */
  inverse?: string | null;
  /** Hidden attribute command or `null` to reset. */
  hidden?: string | null;
  /** Strikethrough attribute command or `null` to reset. */
  strikethrough?: string | null;
  /** Overline attribute command or `null` to reset. */
  overline?: string | null;
  /** Foreground color command(s) or `null` to reset. */
  foreground?: string | string[] | null;
  /** Background color command(s) or `null` to reset. */
  background?: string | string[] | null;
  /** Decoration (underline) color command(s) or `null` to reset. */
  decoration?: string | string[] | null;
  /** Font command or `null` to reset. */
  font?: string | null;
}

/** The fully reset SGR state with all properties set to `null`. */
export const RESET_STATE: SgrState;

/** Extracts the cumulative SGR state from a string by parsing all SGR sequences.
 * @param s - The string to parse for SGR sequences.
 * @param initState - Initial state to build upon.
 * @returns The resulting SGR state.
 */
export function extractState(s: string, initState?: SgrState): SgrState;
/** Converts a value to an SGR state object.
 * @param value - An SgrState object, a string containing SGR sequences, an object with `getState()`, or `null` for reset.
 * @returns The resulting SGR state.
 */
export function toState(value: SgrState | string | {getState(): SgrState} | null): SgrState;

/** Combines multiple SGR states, with later states overriding earlier ones.
 * @param states - States to combine (SgrState objects, strings, or nulls).
 * @returns The combined state.
 */
export function combineStates(...states: (SgrState | string | {getState(): SgrState} | null)[]): SgrState;
/** Converts an array of SGR command strings into an SGR state object.
 * @param commands - Array of SGR command strings.
 * @returns The resulting state.
 */
export function commandsToState(commands: string[]): SgrState;
/** Adds SGR commands to an existing state.
 * @param state - The base state.
 * @param commands - SGR command strings to add.
 * @returns The updated state.
 */
export function addCommandsToState(state: SgrState, commands: string[]): SgrState;

/** Converts an SGR state to an array of SGR command strings.
 * @param state - The SGR state to convert.
 * @returns Array of SGR command strings.
 */
export function stateToCommands(state: SgrState): string[];
/** Computes the minimal SGR commands needed to transition from one state to another.
 * @param prev - The previous SGR state.
 * @param next - The target SGR state.
 * @returns Array of SGR command strings for the transition.
 */
export function stateTransition(prev: SgrState, next: SgrState): string[];
/** Computes the minimal SGR commands to reverse a state transition.
 * @param prev - The previous SGR state.
 * @param next - The target SGR state.
 * @returns Array of SGR command strings for the reverse transition.
 */
export function stateReverseTransition(prev: SgrState, next: SgrState): string[];

/** Converts an array of SGR commands to an escape sequence string.
 * @param commands - Array of SGR command strings, or null/undefined.
 * @returns The SGR escape sequence string.
 */
export function stringifyCommands(commands: string[] | undefined | null): string;
/** Optimizes SGR sequences in a string by computing minimal state transitions.
 * @param s - The string containing SGR sequences.
 * @param initState - Initial SGR state.
 * @returns The optimized string.
 */
export function optimize(s: string, initState?: SgrState): string;
