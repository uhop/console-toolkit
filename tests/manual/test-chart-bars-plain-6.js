import Box from '../../src/Box.js';
import {transcodeTables} from '../../src/alphanumeric/unicode-numbers.js';
import drawChart, {drawItemLabel} from '../../src/charts/bars/plain.js';
import makeTable from '../../src/table/index.js';
import lineTheme from '../../src/themes/lines/unicode-rounded.js';
import style from '../../src/style.js';
import {draw} from './utils.js';

const chartData = [
  [
    {value: 2, label: 'Alex'},
    {value: 1, label: 'Bob'},
    {value: 2, label: 'Chris'},
    {value: 1, label: 'Zachary'}
  ],
  [
    {value: 5, label: 'Alex'},
    {value: 1, label: 'Bob'},
    {value: 4, label: 'Chris'}
  ],
  [
    {value: 1, label: 'Alex'},
    {value: 1, label: 'Bob'},
    {value: 0, label: 'Chris'},
    {value: 3, label: 'Zachary'}
  ],
  [
    {value: 3, label: 'Alex'},
    {value: 1, label: 'Bob'},
    {value: 3, label: 'Chris'}
  ]
];

const chart = Box.make(
  drawChart(chartData, 50, {
    reverse: true,
    drawItem: drawItemLabel,
    truncate: true,
    initState: style.bold.bright.white.getState()
  }),
  {align: 'right'}
);

const {roman} = transcodeTables,
  tableData = [
    ['Performance', 'Year 2022'],
    [{value: chart, height: 4}, 'Quarter ' + roman.get(1)],
    [null, 'Quarter ' + roman.get(2)],
    [null, 'Quarter ' + roman.get(3)],
    [null, 'Quarter ' + roman.get(4)]
  ];

const table = makeTable(tableData, lineTheme, {rowFirst: 1, hDataSep: 0});
draw(table.draw());
