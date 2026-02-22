import {ChartDatum, ChartDataInput} from '../utils.js';
import {SgrState} from '../../ansi/sgr-state.js';
import {LineTheme} from '../../themes/utils.js';
import {StackedChartOptions} from './draw-stacked.js';

/** Options for block bar charts. */
export interface BlockBarOptions extends StackedChartOptions {
  /** Block theme for drawing. */
  blockTheme?: LineTheme;
  /** Size of each rectangle in characters. */
  rectSize?: number;
  /** Initial SGR state. */
  initState?: SgrState | string | null;
  /** If true, reverse the drawing direction. */
  reverse?: boolean;
  /** If set, draw the top border. */
  t?: number;
  /** If set, draw the bottom border. */
  b?: number;
  /** If set, draw the left border. */
  l?: number;
  /** If set, draw the right border. */
  r?: number;
}

/** Draws a single stacked bar row using block-drawing characters.
 * @param data - Chart data items.
 * @param width - Available width.
 * @param maxValue - Maximum value.
 * @param options - Block bar options.
 * @returns Array of strings for the row.
 */
export function drawRow(data: ChartDatum[], width: number, maxValue: number, options?: BlockBarOptions): string[];

/** Draws a complete block stacked bar chart.
 * @param values - Chart data.
 * @param width - Available width.
 * @param options - Block bar options.
 * @returns Array of strings representing the chart.
 */
export function drawChart(values: ChartDataInput, width: number, options?: BlockBarOptions): string[];

export default drawChart;
