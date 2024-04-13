import {transcode, transcodeTables} from '../../src/alphanumeric/unicode-letters.js';
import makeTable from '../../src/table/index.js';
import lineTheme from '../../src/themes/lines/unicode-rounded.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz';

const tableData = [['Name', 'Result'], ['pattern', pattern].map(s => style.brightCyan.text(s))];
for (const name of Object.keys(transcodeTables)) {
  tableData.push([name, transcode(pattern, name)]);
}

const table = makeTable(tableData, lineTheme, {rowFirst: 1, states: {rowFirst: style.bold.getState()}});

draw(table.draw());

// VS15 = 0xFE0E, VS16 = 0xFE0F
// console.log('\u{24C2} \u{24C2}\u{FE0E} \u{24C2}\u{FE0F}')
