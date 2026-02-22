import {SgrState} from './ansi/sgr-state.js';
import Box from './box.js';
import {StringsInput} from './strings.js';

/** A single cell in a Panel. */
export interface PanelCell {
  /** The character displayed in this cell. */
  symbol: string;
  /** The SGR state applied to this cell. */
  state: SgrState;
  /** If true, this cell is ignored during rendering (e.g., second half of wide char). */
  ignore?: boolean;
}

/** Options for `Panel.toStrings()`. */
export interface PanelToStringsOptions {
  /** Character used for empty (null) cells (default: ' '). */
  emptySymbol?: string;
  /** SGR state used for empty cells. */
  emptyState?: SgrState | string | string[];
}

/** Options for `Panel.put()`. */
export interface PanelPutOptions {
  /** Character treated as an empty cell (default: '\x07' BELL). */
  emptySymbol?: string;
  /** If true, ignore control symbols when calculating width. */
  ignoreControlSymbols?: boolean;
  /** If true, treat East Asian ambiguous-width characters as wide. */
  ambiguousAsWide?: boolean;
}

/** Options for `Panel.fillState()`. */
export interface PanelFillStateOptions {
  /** The SGR state to fill with. */
  state?: SgrState | string | string[];
  /** Character used for empty cells (default: ' '). */
  emptySymbol?: string;
}

/** Options for `Panel.combineStateBefore()` and `Panel.combineStateAfter()`. */
export interface PanelCombineStateOptions {
  /** The SGR state to combine. */
  state?: SgrState | string | string[];
  /** Character used for empty cells (default: ' '). */
  emptySymbol?: string;
  /** SGR state used for empty cells. */
  emptyState?: SgrState | string | string[];
}

/** Options for `Panel.addBottom()`. */
export interface PanelAddBottomOptions {
  /** Horizontal alignment (default: 'left'). */
  align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c';
}

/** Options for `Panel.addRight()`. */
export interface PanelAddRightOptions {
  /** Vertical alignment (default: 'top'). */
  align?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c';
}

/** Callback function for `Panel.applyFn()`. Receives cell coordinates and current cell, returns new cell or null/undefined.
 * @param x - Column index.
 * @param y - Row index.
 * @param cell - The current cell or null if empty.
 * @returns A new cell, null, or undefined.
 */
type ApplyFn = (x: number, y: number, cell: PanelCell | null) => PanelCell | null | undefined;

/** A 2D array of styled cells for compositing styled text.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-panel}
 */
export class Panel {
  /** The 2D array of cells. */
  box: (PanelCell | null)[][];

  /** Creates an empty Panel of the given dimensions.
   * @param width - Width in columns.
   * @param height - Height in rows.
   */
  constructor(width: number, height: number);

  /** The width of the panel in columns. */
  readonly width: number;
  /** The height of the panel in rows. */
  readonly height: number;

  /** Creates a Panel from various input types.
   * @param s - Input: Panel, Box, string, string array, or object with `toPanel()`/`toBox()`.
   * @param options - Options passed to the conversion.
   * @returns A new Panel instance.
   */
  static make(s: StringsInput, options?: PanelPutOptions): Panel;

  /** Converts the panel to an array of strings with ANSI escape sequences.
   * @param options - Rendering options.
   * @returns Array of styled strings.
   */
  toStrings(options?: PanelToStringsOptions): string[];
  /** Converts the panel to a Box.
   * @param options - Rendering options.
   * @returns A new Box.
   */
  toBox(options?: PanelToStringsOptions): Box;
  /** Returns a clone of this panel.
   * @returns A new Panel copy.
   */
  toPanel(): Panel;

  /** Extracts a rectangular region as a new Panel.
   * @param x - Left column (default: 0).
   * @param y - Top row (default: 0).
   * @param width - Region width (default: panel width).
   * @param height - Region height (default: panel height).
   * @returns A new Panel with the extracted region.
   */
  extract(x?: number, y?: number, width?: number, height?: number): Panel;
  /** Creates a deep copy of this panel.
   * @returns A new Panel copy.
   */
  clone(): Panel;

  /** Copies cells from another panel into this panel.
   * @param x - Destination left column.
   * @param y - Destination top row.
   * @param width - Region width.
   * @param height - Region height.
   * @param panel - Source panel.
   * @param x1 - Source left column (default: 0).
   * @param y1 - Source top row (default: 0).
   * @returns This Panel (mutated).
   */
  copyFrom(x: number, y: number, width: number, height: number, panel: Panel, x1?: number, y1?: number): Panel;
  /** Places text onto this panel at the given position. Characters matching `emptySymbol` (default: '\x07' BELL) are treated as empty cells.
   * @param x - Left column.
   * @param y - Top row.
   * @param text - Content to place (Panel, Box, string, or string array).
   * @param options - Put options.
   * @returns This Panel (mutated).
   */
  put(x: number, y: number, text: StringsInput, options?: PanelPutOptions): Panel;

  /** Applies a function to each cell in the entire panel.
   * @param fn - Cell transformation function.
   * @returns This Panel (mutated).
   */
  applyFn(fn: ApplyFn): Panel;
  /** Applies a function to each cell in a rectangular region.
   * @param x - Left column.
   * @param y - Top row.
   * @param width - Region width.
   * @param height - Region height.
   * @param fn - Cell transformation function.
   * @param options - Reserved for future use.
   * @returns This Panel (mutated).
   */
  applyFn(x: number, y: number, width: number, height: number, fn: ApplyFn): Panel;

  /** Fills the entire panel with a symbol and optional state.
   * @param symbol - Fill character.
   * @param state - SGR state.
   * @param options - Reserved.
   * @returns This Panel (mutated).
   */
  fill(symbol: string, state?: SgrState | string | string[]): Panel;
  /** Fills a rectangular region with a symbol and optional state.
   * @param x - Left column.
   * @param y - Top row.
   * @param width - Region width.
   * @param height - Region height.
   * @param symbol - Fill character.
   * @param state - SGR state.
   * @param options - Reserved.
   * @returns This Panel (mutated).
   */
  fill(
    x: number,
    y: number,
    width: number,
    height: number,
    symbol: string,
    state?: SgrState | string | string[]
  ): Panel;

  /** Fills all cells with the given state, using `emptySymbol` for empty cells' symbol.
   * @param options - Fill state options.
   * @returns This Panel (mutated).
   */
  fillState(options?: PanelFillStateOptions): Panel;
  /** Fills cells in a rectangular region with the given state, using `emptySymbol` for empty cells' symbol.
   * @param x - Left column.
   * @param y - Top row.
   * @param width - Region width.
   * @param height - Region height.
   * @param options - Fill state options.
   * @returns This Panel (mutated).
   */
  fillState(x: number, y: number, width: number, height: number, options?: PanelFillStateOptions): Panel;

  /** Fills the SGR state for non-empty cells.
   * @param options - State options.
   * @returns This Panel (mutated).
   */
  fillNonEmptyState(options?: {state?: SgrState | string | string[]}): Panel;
  /** Fills the SGR state for non-empty cells in a rectangular region.
   * @param x - Left column.
   * @param y - Top row.
   * @param width - Region width.
   * @param height - Region height.
   * @param options - State options.
   * @returns This Panel (mutated).
   */
  fillNonEmptyState(
    x: number,
    y: number,
    width: number,
    height: number,
    options?: {state?: SgrState | string | string[]}
  ): Panel;

  /** Combines a state before existing cell states (applied state acts as a base that cells override).
   * @param options - Combine options.
   * @returns This Panel (mutated).
   */
  combineStateBefore(options?: PanelCombineStateOptions): Panel;
  /** Combines a state before existing cell states in a region (applied state acts as a base that cells override).
   * @param x - Left column.
   * @param y - Top row.
   * @param width - Region width.
   * @param height - Region height.
   * @param options - Combine options.
   * @returns This Panel (mutated).
   */
  combineStateBefore(x: number, y: number, width: number, height: number, options?: PanelCombineStateOptions): Panel;

  /** Combines a state after existing cell states (applied state overrides cell properties).
   * @param options - Combine options.
   * @returns This Panel (mutated).
   */
  combineStateAfter(options?: PanelCombineStateOptions): Panel;
  /** Combines a state after existing cell states in a region (applied state overrides cell properties).
   * @param x - Left column.
   * @param y - Top row.
   * @param width - Region width.
   * @param height - Region height.
   * @param options - Combine options.
   * @returns This Panel (mutated).
   */
  combineStateAfter(x: number, y: number, width: number, height: number, options?: PanelCombineStateOptions): Panel;

  /** Alias for `combineStateAfter`. */
  combineState: Panel['combineStateAfter'];

  /** Clears the entire panel (sets all cells to null). @returns This Panel (mutated). */
  clear(): Panel;
  /** Clears a rectangular region (sets cells to null).
   * @param x - Left column.
   * @param y - Top row.
   * @param width - Region width.
   * @param height - Region height.
   * @param options - Options passed to `applyFn()`.
   * @returns This Panel (mutated).
   */
  clear(x: number, y?: number, width?: number, height?: number): Panel;

  /** Pads the left side.
   * @param n - Columns.
   * @returns This Panel (mutated).
   */
  padLeft(n: number): Panel;
  /** Pads the right side.
   * @param n - Columns.
   * @returns This Panel (mutated).
   */
  padRight(n: number): Panel;
  /** Pads left and right sides.
   * @param n - Left columns.
   * @param m - Right columns.
   * @returns This Panel (mutated).
   */
  padLeftRight(n: number, m: number): Panel;
  /** Pads the top.
   * @param n - Rows.
   * @returns This Panel (mutated).
   */
  padTop(n: number): Panel;
  /** Pads the bottom.
   * @param n - Rows.
   * @returns This Panel (mutated).
   */
  padBottom(n: number): Panel;
  /** Pads top and bottom.
   * @param n - Top rows.
   * @param m - Bottom rows.
   * @returns This Panel (mutated).
   */
  padTopBottom(n: number, m: number): Panel;
  /** Pads using CSS-style shorthand.
   * @param t - Top.
   * @param r - Right.
   * @param b - Bottom.
   * @param l - Left.
   * @returns This Panel (mutated).
   */
  pad(t: number, r?: number, b?: number, l?: number): Panel;

  /** Removes columns starting at `x`.
   * @param x - Start column.
   * @param n - Number of columns.
   * @returns This Panel (mutated).
   */
  removeColumns(x: number, n: number): Panel;
  /** Removes rows starting at `y`.
   * @param y - Start row.
   * @param n - Number of rows.
   * @returns This Panel (mutated).
   */
  removeRows(y: number, n: number): Panel;

  /** Resizes horizontally.
   * @param newWidth - New width.
   * @param align - Alignment (default: 'right').
   * @returns This Panel (mutated).
   */
  resizeH(newWidth: number, align?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c'): Panel;
  /** Resizes vertically.
   * @param newHeight - New height.
   * @param align - Alignment (default: 'bottom').
   * @returns This Panel (mutated).
   */
  resizeV(newHeight: number, align?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c'): Panel;
  /** Resizes both dimensions.
   * @param newWidth - New width.
   * @param newHeight - New height.
   * @param horizontal - Horizontal alignment (default: 'right').
   * @param vertical - Vertical alignment (default: 'bottom').
   * @returns This Panel (mutated).
   */
  resize(
    newWidth: number,
    newHeight: number,
    horizontal?: 'left' | 'l' | 'right' | 'r' | 'center' | 'c',
    vertical?: 'top' | 't' | 'bottom' | 'b' | 'center' | 'c'
  ): Panel;

  /** Inserts empty columns at `x`.
   * @param x - Column index.
   * @param n - Number of columns.
   * @returns This Panel (mutated).
   */
  insertColumns(x: number, n: number): Panel;
  /** Inserts empty rows at `y`.
   * @param y - Row index.
   * @param n - Number of rows.
   * @returns This Panel (mutated).
   */
  insertRows(y: number, n: number): Panel;

  /** Appends another panel below this one.
   * @param panel - Panel to append.
   * @param options - Alignment options.
   * @returns This Panel (mutated).
   */
  addBottom(panel: Panel, options?: PanelAddBottomOptions): Panel;
  /** Appends another panel to the right.
   * @param panel - Panel to append.
   * @param options - Alignment options.
   * @returns This Panel (mutated).
   */
  addRight(panel: Panel, options?: PanelAddRightOptions): Panel;

  /** Returns a transposed copy (rows become columns).
   * @returns A new Panel.
   */
  transpose(): Panel;
  /** Returns a copy rotated 90° clockwise.
   * @returns A new Panel.
   */
  rotateRight(): Panel;
  /** Returns a copy rotated 90° counter-clockwise.
   * @returns A new Panel.
   */
  rotateLeft(): Panel;
  /** Flips the panel horizontally in place.
   * @returns This Panel (mutated).
   */
  flipH(): Panel;
  /** Flips the panel vertically in place.
   * @returns This Panel (mutated).
   */
  flipV(): Panel;
}

/** Alias for `Panel.make()`. Creates a Panel from various input types.
 * @param s - Input convertible to a Panel.
 * @param options - Options passed to the conversion.
 * @returns A new Panel instance.
 */
export function toPanel(s: StringsInput, options?: PanelPutOptions): Panel;

export default Panel;
