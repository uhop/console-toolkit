import Box from '../Box.js';
import Panel from '../Panel.js';
import {draw as drawBorder} from './draw-borders.js';

const getCellAlign = (align, index) => (typeof align == 'string' && align[index] !== 'd' && align[index]) || '';

const ensureSize = (cellSize, cellLength, cellGap, pos, lineStyle, axis, lengths) => {
  let available = (cellSize - 1) * cellGap;
  for (let i = 0; i < cellSize; ++i)
    available += lengths[pos + i] + (!axis[pos + i] ? 0 : lineStyle ? lineStyle['_w_' + axis[pos + i]] : 1);
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
    const {lineStyle, hAxis = '1', vAxis = '1', hAlign = [], vAlign = [], hMin = 0, vMin = 0, cellPadding = {}} = options;

    this.height = data.length;
    this.width = this.height ? data[0].length : 0;
    this.data = data;

    if (!Array.isArray(hAlign)) hAlign = new Array(this.width).fill(hAlign);
    if (!Array.isArray(vAlign)) vAlign = new Array(this.height).fill(vAlign);

    this.widths = Array.isArray(hMin) ? [...hMin] : new Array(this.width).fill(hMin);
    this.heights = Array.isArray(vMin) ? [...vMin] : new Array(this.height).fill(vMin);

    if (this.widths.length != this.width)
      throw new Error('hMin should be equal to a row size, not ' + this.widths.length);
    if (this.heights.length != this.height)
      throw new Error('vMin should be equal to a column size, not ' + this.heights.length);

    this.lineStyle = lineStyle;
    this.skipList = [];
    this.options = {hAxis, vAxis, hAlign, vAlign};

    {
      const {l = 1, r = 1, t = 0, b = 0} = cellPadding;
      this.cellPadding = {l, r, t, b};
    }

    this.hAxis = Array.isArray(hAxis) ? hAxis : new Array(this.width + 1).fill(hAxis);
    this.vAxis = Array.isArray(vAxis) ? vAxis : new Array(this.height + 1).fill(vAxis);

    if (this.hAxis.length != this.width + 1)
      throw new Error('hAxis should be a row size plus 1, not ' + this.hAxis.length);
    if (this.vAxis.length != this.height + 1)
      throw new Error('vAxis should be a column size plus 1, not ' + this.vAxis.length);

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

    // merged cells
    this.skipList.forEach(rect => {
      const j = (rect.x - 1) >> 1,
        i = (rect.y - 1) >> 1,
        cell = this.cells[i][j];
      if (cell.cellWidth > 1) {
        ensureSize(
          cell.cellWidth,
          cell.width,
          this.cellPadding.l + this.cellPadding.r,
          j,
          lineStyle,
          this.hAxis,
          this.widths
        );
      }
      if (cell.cellHeight > 1) {
        ensureSize(
          cell.cellHeight,
          cell.height,
          this.cellPadding.t + this.cellPadding.b,
          i,
          null,
          this.vAxis,
          this.heights
        );
      }
    });
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

    // draw table borders

    const borderBox = drawBorder(this.lineStyle, hAxis, vAxis, this.skipList, '\x07'),
      panel = Panel.fromBox(borderBox, '\x07');
    panel.fillNonEmptyState(0, 0, panel.width, panel.height, lineState);

    // draw cells

    let y = (vAxis[0] ? 1 : 0) + this.cellPadding.t;
    for (let i = 0; i < this.height; ++i) {
      let x = (this.lineStyle['_w_' + hAxis[0]] || 0) + this.cellPadding.l;
      for (let j = 0; j < this.width; ++j) {
        const cell = this.cells[i][j];
        if (cell && this.isVisible(j, i)) {
          let diffX = this.widths[j] - cell.width + (cell.cellWidth - 1) * (this.cellPadding.l + this.cellPadding.r);
          for (let k = 1; k < cell.cellWidth; ++k) {
            diffX += this.widths[j + k] + (this.hAxis[j + k] ? this.lineStyle['_w_' + this.hAxis[j + k]] : 0);
          }
          let diffY = this.heights[i] - cell.height + (cell.cellHeight - 1) * (this.cellPadding.t + this.cellPadding.b);
          for (let k = 1; k < cell.cellHeight; ++k) {
            diffY += this.heights[j + k] + (this.vAxis[j + k] ? 1 : 0);
          }
          const hAlign = getCellAlign(cell.align, 0) || this.options.hAlign[j] || 'left',
            vAlign = getCellAlign(cell.align, 1) || this.options.vAlign[i] || 'top',
            dx = hAlign === 'l' || hAlign == 'left' ? 0 : hAlign === 'r' || hAlign === 'right' ? diffX : diffX >> 1,
            dy = vAlign === 't' || vAlign == 'top' ? 0 : vAlign === 'b' || vAlign === 'bottom' ? diffY : diffY >> 1;
          panel.put(x + dx, y + dy, cell.box);
        }
        x += hAxis[2 * j + 1] + (this.lineStyle['_w_' + hAxis[2 * j + 2]] || 0);
      }
      y += vAxis[2 * i + 1] + (vAxis[2 * i + 2] ? 1 : 0);
    }

    return panel;
  }

  isVisible(x, y) {
    const i = 2 * y + 1,
      j = 2 * x + 1;
    for (const rect of this.skipList) {
      if (rect.x === j && rect.y === i) return true;
      if (rect.x <= j && j < rect.x + rect.width && rect.y <= i && i < rect.y + rect.height) return false;
    }
    return true;
  }
}

export default Data;
