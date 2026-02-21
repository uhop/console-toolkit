import { SgrState } from './ansi/sgr-state.js';
import Box from './box.js';

/** A single cell in a Panel. */
export interface PanelCell {
  symbol: string;
  state: SgrState;
  ignore?: boolean;
}

/** Options for `Panel.toStrings()`. */
export interface PanelToStringsOptions {
  emptySymbol?: string;
  emptyState?: any;
}

/** Options for `Panel.put()`. */
export interface PanelPutOptions {
  emptySymbol?: string;
  ignoreControlSymbols?: boolean;
  ambiguousAsWide?: boolean;
}

/** Options for `Panel.fillState()`. */
export interface PanelFillStateOptions {
  state?: SgrState | string | string[];
  emptySymbol?: string;
}

/** Options for `Panel.combineStateBefore()` and `Panel.combineStateAfter()`. */
export interface PanelCombineStateOptions {
  state?: SgrState | string | string[];
  emptySymbol?: string;
  emptyState?: any;
}

/** Options for `Panel.addBottom()`. */
export interface PanelAddBottomOptions {
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

/** Options for `Panel.addRight()`. */
export interface PanelAddRightOptions {
  align?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c';
}

type ApplyFn = (x: number, y: number, cell: PanelCell | null) => PanelCell | null | undefined;

/** A 2D array of styled cells for compositing styled text.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-panel}
 */
export class Panel {
  /** The 2D array of cells. */
  box: (PanelCell | null)[][];

  /** Creates an empty Panel of the given dimensions. */
  constructor(width: number, height: number);

  /** The width of the panel in columns. */
  readonly width: number;
  /** The height of the panel in rows. */
  readonly height: number;

  /** Creates a Panel from various input types. */
  static make(s: any, options?: any): Panel;

  /** Converts the panel to an array of strings with ANSI escape sequences. */
  toStrings(options?: PanelToStringsOptions): string[];
  /** Converts the panel to a Box. */
  toBox(options?: PanelToStringsOptions): Box;
  /** Returns a clone of this panel. */
  toPanel(): Panel;

  /** Extracts a rectangular region as a new Panel. */
  extract(x?: number, y?: number, width?: number, height?: number): Panel;
  /** Creates a deep copy of this panel. */
  clone(): Panel;

  /** Copies cells from another panel into this panel. */
  copyFrom(x: number, y: number, width: number, height: number, panel: Panel, x1?: number, y1?: number): Panel;
  /** Places text onto this panel at the given position. */
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

  /** Returns a transposed copy (rows become columns). */
  transpose(): Panel;
  /** Returns a copy rotated 90° clockwise. */
  rotateRight(): Panel;
  /** Returns a copy rotated 90° counter-clockwise. */
  rotateLeft(): Panel;
  /** Flips the panel horizontally in place. */
  flipH(): Panel;
  /** Flips the panel vertically in place. */
  flipV(): Panel;
}

export function toPanel(s: any, options?: any): Panel;

export default Panel;
