/** SGR (Select Graphics Rendition) state object. Properties are `null` for reset, a command string when set, or `undefined` when unspecified. */
export interface SgrState {
  bold?: string | null;
  dim?: string | null;
  italic?: string | null;
  underline?: string | null;
  blink?: string | null;
  inverse?: string | null;
  hidden?: string | null;
  strikethrough?: string | null;
  overline?: string | null;
  foreground?: string | string[] | null;
  background?: string | string[] | null;
  decoration?: string | string[] | null;
  font?: string | null;
}

/** The fully reset SGR state with all properties set to `null`. */
export const RESET_STATE: SgrState;

/** Extracts the cumulative SGR state from a string by parsing all SGR sequences. */
export function extractState(s: string, initState?: SgrState): SgrState;
/** Converts a value to an SGR state object. */
export function toState(value: any): SgrState;

/** Combines multiple SGR states, with later states overriding earlier ones. */
export function combineStates(...states: any[]): SgrState;
/** Converts an array of SGR command strings into an SGR state object. */
export function commandsToState(commands: string[]): SgrState;
/** Adds SGR commands to an existing state. */
export function addCommandsToState(state: SgrState, commands: string[]): SgrState;

/** Converts an SGR state to an array of SGR command strings. */
export function stateToCommands(state: any): string[];
/** Computes the minimal SGR commands needed to transition from one state to another. */
export function stateTransition(prev: any, next: any): string[];
/** Computes the minimal SGR commands to reverse a state transition. */
export function stateReverseTransition(prev: any, next: any): string[];

/** Converts an array of SGR commands to an escape sequence string. */
export function stringifyCommands(commands: string[] | undefined | null): string;
/** Optimizes SGR sequences in a string by computing minimal state transitions. */
export function optimize(s: string, initState?: any): string;
