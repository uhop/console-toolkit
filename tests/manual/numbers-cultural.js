import {transcode} from '../../src/alphanumeric/unicode-numbers.js';
import {transcodeTables} from '../../src/alphanumeric/unicode-cultural-numbers.js';
import makeTable from '../../src/table/index.js';
import tableStyle from '../../src/line-styles/unicode-rounded.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const pattern = '0 1 2 3 4 5 6 7 8 9';

const tableData = [
  ['Name', 'Result'],
  ['pattern', pattern].map(s => style.brightCyan.text(s))
];
for (const name of Object.keys(transcodeTables)) {
  tableData.push([name, transcode(pattern, transcodeTables[name])]);
}

const table = makeTable(tableData, tableStyle, {rowFirst: 1, hDataSep: 0, states: {rowFirst: style.bold.getState()}});

draw(table.draw());
