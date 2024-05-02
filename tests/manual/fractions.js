import {
  fractions,
  thirds,
  quarters,
  fifths,
  sixths,
  eighths,
  getThirds,
  getQuarters,
  getFifths,
  getSixths,
  getEighths,
  getFraction
} from '../../src/alphanumeric/fractions.js';
import style, {c} from '../../src/style.js';
import makeTable from '../../src/table/index.js';
import lineTheme from '../../src/themes/lines/unicode-rounded.js';
import {draw} from './utils.js';

const getSymbols = fractions => fractions.map(x => x.symbol).join(' ');

const header = c({setState: style.bold.bright.cyan});

console.log(header`Available fraction symbols` + '\n');

console.log('fractions:', getSymbols(fractions));
console.log('thirds:   ', getSymbols(thirds));
console.log('quarters: ', getSymbols(quarters));
console.log('fifths:   ', getSymbols(fifths));
console.log('sixths:   ', getSymbols(sixths));
console.log('eighths:  ', getSymbols(eighths));

console.log('\n' + header`Mapping fractions to symbols` + '\n');

const tableData = [
  [
    {value: 'Value', height: 2, align: 'dc'},
    {value: 'Chosen symbols', width: 6, align: 'c'},
    ...new Array(5).fill(null)
  ],
  [null, 'Thirds', 'Quarters', 'Fifths', 'Sixths', 'Eighths', 'Fractions'].map(s => s && style.bold.text(s))
];
for (let i = 0; i <= 20; ++i) {
  const x = 1 + i * 0.05;
  tableData.push([
    x.toFixed(2),
    getThirds(x),
    getQuarters(x),
    getFifths(x),
    getSixths(x),
    getEighths(x),
    getFraction(x)
  ]);
}

const table = makeTable(tableData, lineTheme, {
  hCenter: [1, 2, 3, 4, 5, 6],
  hDataSep: 0,
  states: {rowFirst: style.bold}
});
table.vAxis[1] = table.vAxis[2] = 1;

draw(table);
