import lineTheme from 'console-toolkit/themes/lines/unicode-rounded.js';
import makeTable from 'console-toolkit/table';

const tableData = [
  [{value: '0123456789', width: 2}, null],
  // [{value: '01', width: 2}, null],
  [1, 2]
];

const table = makeTable(tableData, lineTheme, {hCenter: [0, 1]});
for (const line of table.toStrings()) console.log(line);
