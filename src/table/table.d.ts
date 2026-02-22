import Box from '../box.js';
import Panel from '../panel.js';
import {SgrState} from '../ansi/sgr-state.js';
import {StringsInput} from '../strings.js';
import {LineTheme} from '../themes/utils.js';

/** Input type for a single table cell: a raw value, a CellData object, or null. */
export type TableCellInput = string | number | boolean | Box | Panel | CellData | null | undefined;

/** Data for a single table cell. */
export interface CellData {
  /** Cell content (string, Box, Panel, or other renderable). */
  value: StringsInput;
  /** Horizontal alignment override for this cell. */
  align?: string;
  /** Column span (number of columns this cell occupies). */
  width?: number;
  /** Row span (number of rows this cell occupies). */
  height?: number;
}

/** Cell padding configuration. */
export interface CellPadding {
  /** Left padding in columns. */
  l?: number;
  /** Right padding in columns. */
  r?: number;
  /** Top padding in rows. */
  t?: number;
  /** Bottom padding in rows. */
  b?: number;
}

/** Options for the Table constructor. */
export interface TableOptions {
  /** Horizontal axis definition (border/separator pattern). */
  hAxis?: string | (string | number)[];
  /** Vertical axis definition (border/separator pattern). */
  vAxis?: string | (string | number)[];
  /** Horizontal alignment per column. */
  hAlign?: string | string[];
  /** Vertical alignment per row. */
  vAlign?: string | string[];
  /** Minimum column widths. */
  hMin?: number | number[];
  /** Minimum row heights. */
  vMin?: number | number[];
  /** Cell padding. */
  cellPadding?: CellPadding;
}

/** Options for `Table.draw()`. */
export interface TableDrawOptions {
  /** SGR state applied to table border lines. */
  lineState?: SgrState;
}

/** Options for `Table.generateAxes()`. */
export interface GenerateAxesOptions {
  /** Horizontal line theme name. */
  hTheme?: string;
  /** Vertical line theme name. */
  vTheme?: string;
  /** Top border style. */
  borderTop?: string | number;
  /** Right border style. */
  borderRight?: string | number;
  /** Left border style. */
  borderLeft?: string | number;
  /** Bottom border style. */
  borderBottom?: string | number;
  /** First row separator style. */
  rowFirst?: string | number;
  /** Last row separator style. */
  rowLast?: string | number;
  /** First column separator style. */
  columnFirst?: string | number;
  /** Last column separator style. */
  columnLast?: string | number;
  /** Horizontal data separator style. */
  hDataSep?: string | number;
  /** Vertical data separator style. */
  vDataSep?: string | number;

  /** Default horizontal alignment. */
  hAlignDefault?: string;
  /** Column indices aligned left. */
  hLeft?: number[];
  /** Column indices aligned center. */
  hCenter?: number[];
  /** Column indices aligned right. */
  hRight?: number[];

  /** Default vertical alignment. */
  vAlignDefault?: string;
  /** Row indices aligned top. */
  vTop?: number[];
  /** Row indices aligned center. */
  vCenter?: number[];
  /** Row indices aligned bottom. */
  vBottom?: number[];

  /** Default minimum column width. */
  hMinDefault?: number;
  /** Minimum widths per column index. */
  hMin?: Record<number, number>;

  /** Default minimum row height. */
  vMinDefault?: number;
  /** Minimum heights per row index. */
  vMin?: Record<number, number>;
}

/** SGR styles applied to table data cells. */
export interface DataStyleOptions {
  /** Style for the first row. */
  rowFirst?: SgrState;
  /** Style for the last row. */
  rowLast?: SgrState;
  /** Style for the first column. */
  columnFirst?: SgrState;
  /** Style for the last column. */
  columnLast?: SgrState;
  /** Default style for data cells. */
  data?: SgrState;
  /** Style for odd rows. */
  rowOdd?: SgrState;
  /** Style for even rows. */
  rowEven?: SgrState;
  /** Style for odd columns. */
  columnOdd?: SgrState;
  /** Style for even columns. */
  columnEven?: SgrState;
}

/** Options for `Table.make()`, combining axis generation and data styling. */
export interface MakeOptions extends GenerateAxesOptions {
  /** Data cell styles. */
  states?: DataStyleOptions;
}

/** Renders tabular data with borders, alignment, and merged cells.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Package:-table}
 */
export class Table {
  /** Number of data rows. */
  height: number;
  /** Number of data columns. */
  width: number;
  /** The raw data grid. */
  data: TableCellInput[][];
  /** Computed column widths. */
  widths: number[];
  /** Computed row heights. */
  heights: number[];
  /** Line theme for borders. */
  lineTheme: LineTheme;
  /** List of cells to skip (merged cell regions). */
  skipList: {x: number; y: number; width: number; height: number}[];
  /** Resolved table options. */
  options: {hAxis: string | (string | number)[]; vAxis: string | (string | number)[]; hAlign: string[]; vAlign: string[]};
  /** Resolved cell padding. */
  cellPadding: Required<CellPadding>;
  /** Horizontal axis pattern. */
  hAxis: (string | number)[];
  /** Vertical axis pattern. */
  vAxis: (string | number)[];
  /** Processed cell grid. */
  cells: (object | null)[][];

  /**
   * @param data - 2D array of cell data.
   * @param lineTheme - Line theme for borders.
   * @param options - Table options.
   */
  constructor(data: TableCellInput[][], lineTheme: LineTheme, options?: TableOptions);

  /** Draws the table as a Panel.
   * @param options - Draw options.
   * @returns A Panel.
   */
  draw(options?: TableDrawOptions): Panel;
  /** Draws the table as a Panel.
   * @param options - Draw options.
   * @returns A Panel.
   */
  toPanel(options?: TableDrawOptions): Panel;
  /** Draws the table as a Box.
   * @param options - Draw options.
   * @returns A Box.
   */
  toBox(options?: TableDrawOptions): Box;
  /** Draws the table as a string array.
   * @param options - Draw options.
   * @returns Array of strings.
   */
  toStrings(options?: TableDrawOptions): string[];

  /** Checks if a cell at (x, y) is visible (not hidden by a merged cell).
   * @param x - Column index.
   * @param y - Row index.
   * @returns True if visible.
   */
  isVisible(x: number, y: number): boolean;

  /** Generates axis options from dimensions and configuration.
   * @param width - Number of columns.
   * @param height - Number of rows.
   * @param options - Generation options.
   * @returns Table options with axis definitions.
   */
  static generateAxes(width: number, height: number, options: GenerateAxesOptions): TableOptions;
  /** Processes data cells, applying styles.
   * @param data - 2D array of cell data.
   * @param options - Data style options.
   * @returns Processed data grid.
   */
  static processData(data: TableCellInput[][], options?: DataStyleOptions): TableCellInput[][];
  /** Factory method that generates axes, processes data, and creates a Table.
   * @param data - 2D array of cell data.
   * @param lineTheme - Line theme for borders.
   * @param options - Make options.
   * @param overrides - Additional table option overrides.
   * @returns A new Table.
   */
  static make(
    data: TableCellInput[][],
    lineTheme: LineTheme,
    options?: MakeOptions,
    overrides?: Partial<TableOptions>
  ): Table;
}

export default Table;
