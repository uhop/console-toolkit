import { SgrState } from './ansi/sgr-state.js';
import Box from './box.js';

export interface PanelCell {
  symbol: string;
  state: SgrState;
  ignore?: boolean;
}

export interface PanelToStringsOptions {
  emptySymbol?: string;
  emptyState?: any;
}

export interface PanelPutOptions {
  emptySymbol?: string;
  ignoreControlSymbols?: boolean;
  ambiguousAsWide?: boolean;
}

export interface PanelFillStateOptions {
  state?: SgrState | string | string[];
  emptySymbol?: string;
}

export interface PanelCombineStateOptions {
  state?: SgrState | string | string[];
  emptySymbol?: string;
  emptyState?: any;
}

export interface PanelAddBottomOptions {
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

export interface PanelAddRightOptions {
  align?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c';
}

type ApplyFn = (x: number, y: number, cell: PanelCell | null) => PanelCell | null | undefined;

export class Panel {
  box: (PanelCell | null)[][];

  constructor(width: number, height: number);

  readonly width: number;
  readonly height: number;

  static make(s: any, options?: any): Panel;

  toStrings(options?: PanelToStringsOptions): string[];
  toBox(options?: PanelToStringsOptions): Box;
  toPanel(): Panel;

  extract(x?: number, y?: number, width?: number, height?: number): Panel;
  clone(): Panel;

  copyFrom(x: number, y: number, width: number, height: number, panel: Panel, x1?: number, y1?: number): Panel;
  put(x: number, y: number, text: Panel | Box | any, options?: PanelPutOptions): Panel;

  applyFn(fn: ApplyFn): Panel;
  applyFn(x: number, y: number, width: number, height: number, fn: ApplyFn, options?: any): Panel;

  fill(symbol: string, state?: SgrState | string | string[], options?: any): Panel;
  fill(x: number, y: number, width: number, height: number, symbol: string, state?: SgrState | string | string[], options?: any): Panel;

  fillState(options?: PanelFillStateOptions): Panel;
  fillState(x: number, y: number, width: number, height: number, options?: PanelFillStateOptions): Panel;

  fillNonEmptyState(options?: { state?: SgrState | string | string[] }): Panel;
  fillNonEmptyState(x: number, y: number, width: number, height: number, options?: { state?: SgrState | string | string[] }): Panel;

  combineStateBefore(options?: PanelCombineStateOptions): Panel;
  combineStateBefore(x: number, y: number, width: number, height: number, options?: PanelCombineStateOptions): Panel;

  combineStateAfter(options?: PanelCombineStateOptions): Panel;
  combineStateAfter(x: number, y: number, width: number, height: number, options?: PanelCombineStateOptions): Panel;

  combineState: Panel['combineStateAfter'];

  clear(): Panel;
  clear(x: number, y?: number, width?: number, height?: number): Panel;

  padLeft(n: number): Panel;
  padRight(n: number): Panel;
  padLeftRight(n: number, m: number): Panel;
  padTop(n: number): Panel;
  padBottom(n: number): Panel;
  padTopBottom(n: number, m: number): Panel;
  pad(t: number, r?: number, b?: number, l?: number): Panel;

  removeColumns(x: number, n: number): Panel;
  removeRows(y: number, n: number): Panel;

  resizeH(newWidth: number, align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c'): Panel;
  resizeV(newHeight: number, align?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c'): Panel;
  resize(newWidth: number, newHeight: number, horizontal?: string, vertical?: string): Panel;

  insertColumns(x: number, n: number): Panel;
  insertRows(y: number, n: number): Panel;

  addBottom(panel: Panel, options?: PanelAddBottomOptions): Panel;
  addRight(panel: Panel, options?: PanelAddRightOptions): Panel;

  transpose(): Panel;
  rotateRight(): Panel;
  rotateLeft(): Panel;
  flipH(): Panel;
  flipV(): Panel;
}

export function toPanel(s: any, options?: any): Panel;

export default Panel;
