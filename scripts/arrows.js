import * as arrows from '../src/alphanumeric/arrows.js';
import makeTable from '../src/table/index.js';
import lineTheme from '../src/themes/lines/unicode-rounded.js';
import style from '../src/style.js';
import {draw} from '../tests/manual/utils.js';

const pattern = '0 1 2 3 4 5 6 7 8 9';

const tableData = [['Name', 'Result']];
for (const [name, value] of Object.entries(arrows)) {
  if (!Array.isArray(value)) continue;
  tableData.push([name, value.join(' ')]);
}

const table = makeTable(tableData, lineTheme, {rowFirst: 1, hDataSep: 0, states: {rowFirst: style.bold.getState()}});

draw(table);
