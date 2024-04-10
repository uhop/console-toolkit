import {transcode, transcodeTables} from '../../src/alphanumeric/unicode-numbers.js';
import makeTable from '../../src/table/index.js';
import tableStyle from '../../src/line-styles/unicode-rounded.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const pattern = '0123456789';

const tableData = [
  ['Name', 'Result'],
  ['pattern', pattern].map(s => style.brightCyan.text(s))
];
for (const name of Object.keys(transcodeTables)) {
  tableData.push([name, transcode(pattern, name, {missing: '*'})]);
}

const table = makeTable(tableData, tableStyle, {rowFirst: 1, hDataSep: 0, states: {rowFirst: style.bold.getState()}});

draw(table.draw());
