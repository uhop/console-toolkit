import Box from '../Box.js';
import Panel from '../Panel.js';
import {draw as drawBorder} from './draw-borders.js';

const getCellAlign = (align, index) => (typeof align == 'string' && align[index] !== 'd' && align[index]) || '';

const ensureSize = (cellSize, cellLength, cellGap, pos, lengths) => {
  let available = (cellSize - 1) * cellGap;
  for (let i = 0; i < cellSize; ++i) available += lengths[pos + i];
  if (cellLength > available) {
    const diff = cellLength - available,
      perCell = Math.floor(diff / cellSize),
      remainder = diff % cellSize;
    if (perCell) {
      for (let i = 0; i < cellSize; ++i) lengths[j + i] += perCell;
    }
    if (remainder) {
      for (let i = 0; i < remainder; ++i) ++lengths[j + i];
    }
  }
};

export class Data {
  constructor(data, options = {}) {
    const {lineStyle, hTheme = '1', vTheme = '1', hAlign = [], vAlign = [], cellPadding = {}} = options;

    this.height = data.length;
    this.width = this.height ? data[0].length : 0;
    this.data = data;

    if (typeof hAlign == 'string') hAlign = new Array(this.width).fill(hAlign);
    if (typeof vAlign == 'string') vAlign = new Array(this.height).fill(vAlign);

    this.lineStyle = lineStyle;
    this.options = {hTheme, vTheme, hAlign, vAlign};
    this.widths = new Array(this.width).fill(0);
    this.heights = new Array(this.height).fill(0);
    this.skipList = [];

    {
      const {l = 1, r = 1, t = 0, b = 0} = cellPadding;
      this.cellPadding = {l, r, t, b};
    }

    this.cells = data.map((row, i) => {
      const result = new Array(this.width);
      for (let j = 0; j < this.width; ++j) {
        const data = row[j];
        if (data === null || data === undefined) {
          result[j] = null;
          continue;
        }
        const isObject = data?.hasOwnProperty('value'),
          value = isObject ? data.value : data,
          align = (isObject && data.align) || '',
          box = value instanceof Box ? value : Box.make(value, ' ', getCellAlign(align, 0) || hAlign[j] || 'left'),
          width = box.width,
          height = box.height,
          cellWidth = isObject ? data.width || 1 : 1,
          cellHeight = isObject ? data.height || 1 : 1;
        result[j] = {data, value, box, width, height, cellWidth, cellHeight, align};
        if (cellWidth < 2) this.widths[j] = Math.max(this.widths[j], width);
        if (cellHeight < 2) this.heights[i] = Math.max(this.heights[i], height);
        if (cellWidth > 1 || cellHeight > 1) {
          this.skipList.push({x: 2 * j + 1, y: 2 * i + 1, width: 2 * cellWidth - 1, height: 2 * cellHeight - 1});
        }
      }
      return result;
    });

    this.hAxis = new Array(this.width + 1).fill(vTheme);
    this.vAxis = new Array(this.height + 1).fill(hTheme);

    // merged cells
    this.skipList.forEach(rect => {
      const j = (rect.x - 1) >> 1,
        i = (rect.y - 1) >> 1,
        cell = this.cells[i][j];
      if (cell.cellWidth > 1) {
        ensureSize(
          cell.cellWidth,
          cell.width,
          lineStyle['_w_' + vTheme].length + this.cellPadding.l + this.cellPadding.r,
          j,
          this.widths
        );
      }
      if (cell.cellHeight > 1) {
        ensureSize(cell.cellHeight, cell.height, 1 + this.cellPadding.t + this.cellPadding.b, i, this.heights);
      }
    });
    console.log(this.widths, this.heights);
  }

  draw(lineState, cellState) {
    // prepare axes

    const hAxis = new Array(this.hAxis.length + this.widths.length),
      hPadding = this.cellPadding.l + this.cellPadding.r;
    for (let i = 0; i < this.widths.length; ++i) {
      hAxis[2 * i] = this.hAxis[i];
      hAxis[2 * i + 1] = this.widths[i] + hPadding;
    }
    hAxis[hAxis.length - 1] = this.hAxis[this.hAxis.length - 1];

    const vAxis = new Array(this.vAxis.length + this.heights.length),
      vPadding = this.cellPadding.t + this.cellPadding.b;
    for (let i = 0; i < this.heights.length; ++i) {
      vAxis[2 * i] = this.vAxis[i];
      vAxis[2 * i + 1] = this.heights[i] + vPadding;
    }
    vAxis[vAxis.length - 1] = this.vAxis[this.vAxis.length - 1];

    const borderBox = drawBorder(this.lineStyle, hAxis, vAxis, this.skipList, '\x07'),
      panel = Panel.fromBox(borderBox, '\x07');
    panel.fillNonEmptyState(0, 0, panel.width, panel.height, lineState);

    let y = (vAxis[0] ? 1 : 0) + this.cellPadding.t;
    for (let i = 0; i < this.height; ++i) {
      let x = (hAxis[0] ? this.lineStyle['_w_' + hAxis[0]] : 0) + this.cellPadding.l;
      for (let j = 0; j < this.width; ++j) {
        const cell = this.cells[i][j];
        if (cell) {
          let diffX =
            this.widths[j] -
            cell.width +
            (cell.cellWidth - 1) * (this.lineStyle['_w_' + hAxis[0]] + this.cellPadding.l + this.cellPadding.r);
          for (let k = 1; k < cell.cellWidth; ++k) diffX += this.widths[j + k];
          let diffY =
            this.heights[i] - cell.height + (cell.cellHeight - 1) * (1 + this.cellPadding.t + this.cellPadding.b);
          for (let k = 1; k < cell.cellHeight; ++k) diffY += this.heights[j + k];
          const hAlign = getCellAlign(cell.align, 0) || this.options.hAlign[j] || 'left',
            vAlign = getCellAlign(cell.align, 1) || this.options.vAlign[i] || 'top',
            dx = hAlign === 'l' || hAlign == 'left' ? 0 : hAlign === 'r' || hAlign === 'right' ? diffX : diffX >> 1,
            dy = vAlign === 't' || vAlign == 'top' ? 0 : vAlign === 'b' || vAlign === 'bottom' ? diffY : diffY >> 1;
          panel.put(x + dx, y + dy, cell.box);
        }
        x += hAxis[2 * j + 1] + (hAxis[2 * j + 2] ? this.lineStyle['_w_' + hAxis[2 * j + 2]] : 0);
      }
      y += vAxis[2 * i + 1] + (vAxis[2 * i + 1] ? 1 : 0);
    }

    return panel;
  }
}

export default Data;
