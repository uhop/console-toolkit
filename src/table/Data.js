import Box from '../Box.js';
import Panel from '../Panel.js';
import style from '../style.js';
import {draw as drawBorder} from './draw-borders.js';

const getCellAlign = (align, index) => (typeof align == 'string' && align[index] !== 'd' && align[index]) || '';

export class Data {
  constructor(data, options = {}) {
    const {hTheme = '1', vTheme = '1', hAlign = [], vAlign = [], cellPadding = {}} = options;

    this.height = data.length;
    this.width = this.height ? data[0].length : 0;
    this.data = data;

    if (typeof hAlign == 'string') hAlign = new Array(this.width).fill(hAlign);
    if (typeof vAlign == 'string') vAlign = new Array(this.height).fill(vAlign);

    this.options = {hTheme, vTheme, hAlign, vAlign};
    this.widths = new Array(this.width).fill(0);
    this.heights = new Array(this.height).fill(0);
    this.skipList = [];

    {
      const {l = 1, r = 1, t = 0, b = 0} = cellPadding;
      this.cellPadding = {l, r, t, b};
    }

    this.cells = data.forEach((row, i) => {
      const result = new Array(this.width);
      for (let j = 0; j < this.width; ++j) {
        const data = row[j];
        if (data === null || data === undefined) {
          result[j] = null;
          continue;
        }
        const isObject = data?.hasOwnProperty(value),
          value = isObject ? data.value : data,
          align = (isObject && data.align) || '',
          box = value instanceof Box ? value : Box.make(value, ' ', getCellAlign(align, 0) || hAlign[j] || 'left'),
          width = box.width,
          height = box.height,
          cellWidth = isObject ? data.width || 1 : 1,
          cellHight = isObject ? data.height || 1 : 1;
        result[j] = {data, value, box, width, height, cellWidth, cellHight};
        this.widths[j] = Math.max(this.widths[j], width);
        this.heights[i] = Math.max(this.heights[i], height);
        if (cellWidth > 1 || cellHeight > 1) {
          this.skipList.push({x: 2 * j + 1, y: 2 * i + 1, width: 2 * cellWidth - 1, height: 2 * cellHeight - 1});
        }
      }
      return result;
    });

    // TODO: take into account merged cells

    this.hAxis = new Array(this.width + 1).fill(hTheme);
    this.vAxis = new Array(this.width + 1).fill(vTheme);
  }

  draw(tableStyle, lineState, cellState) {
    // prepare axes

    const hAxis = new Array(this.hAxis.length + this.widths.length);
    for (let i = 0; i < this.widths.length; ++i) {
      hAxis[2 * i] = this.hAxis[i];
      hAxis[2 * i + 1] = this.widths[i];
    }
    hAxis[hAxis.length - 1] = this.hAxis[this.hAxis.length - 1];

    const vAxis = new Array(this.vAxis.length + this.heights.length);
    for (let i = 0; i < this.heights.length; ++i) {
      vAxis[2 * i] = this.vAxis[i];
      vAxis[2 * i + 1] = this.heights[i];
    }
    vAxis[vAxis.length - 1] = this.vAxis[this.vAxis.length - 1];

    const borderBox = drawBorder(tableStyle, hAxis, vAxis, this.skipList, '\x07'),
      panel = Panel.fromBox(borderBox, '\x07');
    panel.fillNonEmptyState(style.dim.getState());

    return panel;
  }
}
