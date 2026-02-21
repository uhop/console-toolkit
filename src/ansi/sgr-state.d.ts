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

export const RESET_STATE: SgrState;

export function extractState(s: string, initState?: SgrState): SgrState;
export function toState(value: any): SgrState;

export function combineStates(...states: any[]): SgrState;
export function commandsToState(commands: string[]): SgrState;
export function addCommandsToState(state: SgrState, commands: string[]): SgrState;

export function stateToCommands(state: any): string[];
export function stateTransition(prev: any, next: any): string[];
export function stateReverseTransition(prev: any, next: any): string[];

export function stringifyCommands(commands: string[] | undefined | null): string;
export function optimize(s: string, initState?: any): string;
