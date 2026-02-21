import Box from '../box.js';
import Panel from '../panel.js';
import { SgrState } from '../ansi/sgr-state.js';

export interface CellData {
  value: any;
  align?: string;
  width?: number;
  height?: number;
}

export interface CellPadding {
  l?: number;
  r?: number;
  t?: number;
  b?: number;
}

export interface TableOptions {
  hAxis?: string | (string | number)[];
  vAxis?: string | (string | number)[];
  hAlign?: string | string[];
  vAlign?: string | string[];
  hMin?: number | number[];
  vMin?: number | number[];
  cellPadding?: CellPadding;
}

export interface TableDrawOptions {
  lineState?: SgrState;
}

export interface GenerateAxesOptions {
  hTheme?: string;
  vTheme?: string;
  borderTop?: string | number;
  borderRight?: string | number;
  borderLeft?: string | number;
  borderBottom?: string | number;
  rowFirst?: string | number;
  rowLast?: string | number;
  columnFirst?: string | number;
  columnLast?: string | number;
  hDataSep?: string | number;
  vDataSep?: string | number;

  hAlignDefault?: string;
  hLeft?: number[];
  hCenter?: number[];
  hRight?: number[];

  vAlignDefault?: string;
  vTop?: number[];
  vCenter?: number[];
  vBottom?: number[];

  hMinDefault?: number;
  hMin?: Record<number, number>;

  vMinDefault?: number;
  vMin?: Record<number, number>;
}

export interface DataStyleOptions {
  rowFirst?: SgrState;
  rowLast?: SgrState;
  columnFirst?: SgrState;
  columnLast?: SgrState;
  data?: SgrState;
  rowOdd?: SgrState;
  rowEven?: SgrState;
  columnOdd?: SgrState;
  columnEven?: SgrState;
}

export interface MakeOptions extends GenerateAxesOptions {
  states?: DataStyleOptions;
}

export class Table {
  height: number;
  width: number;
  data: any[][];
  widths: number[];
  heights: number[];
  lineTheme: Record<string, any>;
  skipList: { x: number; y: number; width: number; height: number }[];
  options: { hAxis: any; vAxis: any; hAlign: string[]; vAlign: string[] };
  cellPadding: Required<CellPadding>;
  hAxis: (string | number)[];
  vAxis: (string | number)[];
  cells: any[][];

  constructor(data: any[][], lineTheme: Record<string, any>, options?: TableOptions);

  draw(options?: TableDrawOptions): Panel;
  toPanel(options?: TableDrawOptions): Panel;
  toBox(options?: TableDrawOptions): Box;
  toStrings(options?: TableDrawOptions): string[];

  isVisible(x: number, y: number): boolean;

  static generateAxes(width: number, height: number, options: GenerateAxesOptions): TableOptions;
  static processData(data: any[][], options?: { states?: DataStyleOptions }): any[][];
  static make(data: any[][], lineTheme: Record<string, any>, options?: MakeOptions, overrides?: Partial<TableOptions>): Table;
}

export default Table;
