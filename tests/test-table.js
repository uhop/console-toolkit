import test from 'tape-six';

import makeTable from '../src/table/index.js';
import lineTheme from '../src/themes/lines/unicode-rounded.js';
import {s} from '../src/style.js';

test('Table', async t => {
  await t.test('Simple table', t => {
    const data = [
      ['Color', 'Sample', 'Number'].map(x => s`{{bold}}${x}`),
      ['blue', s`{{blue}}blue`, 2],
      ['green', s`{{green}}1st line\n2nd\nand 3rd`, 3],
      [s`{{inverse}}bright\nyellow`, s`{{bright.yellow}}bright yellow`, '12,345']
    ];

    const table = makeTable(
      data,
      lineTheme,
      {rowFirst: '2', columnLast: '2'},
      {hAlign: ['l', 'c', 'r'], vAlign: ['t', 'c', 'c', 'c', 'b']}
    );

    const expected = [
        '\x1B[22;2m╭────────┬───────────────╥────────╮\x1B[22m',
        '\x1B[22;2m│\x1B[m \x1B[1mColor\x1B[m  \x1B[2m│\x1B[m    \x1B[1mSample\x1B[m     \x1B[2m║\x1B[m \x1B[1mNumber\x1B[m \x1B[2m│\x1B[m',
        '\x1B[22;2m╞════════╪═══════════════╬════════╡\x1B[22m',
        '\x1B[22;2m│\x1B[m blue   \x1B[2m│\x1B[m     \x1B[34mblue\x1B[m      \x1B[2m║\x1B[m      2 \x1B[2m│\x1B[m',
        '\x1B[22;2m├────────┼───────────────╫────────┤\x1B[22m',
        '\x1B[22;2m│\x1B[m        \x1B[2m│\x1B[m   \x1B[32m1st line\x1B[m    \x1B[2m║\x1B[m        \x1B[2m│\x1B[m',
        '\x1B[22;2m│\x1B[m green  \x1B[2m│\x1B[m   \x1B[32m  2nd   \x1B[m    \x1B[2m║\x1B[m      3 \x1B[2m│\x1B[m',
        '\x1B[22;2m│\x1B[m        \x1B[2m│\x1B[m   \x1B[32mand 3rd \x1B[m    \x1B[2m║\x1B[m        \x1B[2m│\x1B[m',
        '\x1B[22;2m├────────┼───────────────╫────────┤\x1B[22m',
        '\x1B[22;2m│\x1B[m \x1B[7mbright\x1B[m \x1B[2m│\x1B[m \x1B[93mbright yellow\x1B[m \x1B[2m║\x1B[m 12,345 \x1B[2m│\x1B[m',
        '\x1B[22;2m│\x1B[m \x1B[7myellow\x1B[m \x1B[2m│\x1B[m               \x1B[2m║\x1B[m        \x1B[2m│\x1B[m',
        '\x1B[22;2m╰────────┴───────────────╨────────╯\x1B[22m'
      ],
      actual = table.draw().toBox().box;

    t.deepEqual(actual, expected);
  });

  await t.test('Simple table with spans', t => {
    const data = [
      [null, 'Quarter', 'Number'].map(x => x && s`{{bold}}${x}`),
      [{value: 'Year\n2024', height: 4, align: 'dc'}, 'I', 31],
      [null, 'II', 41],
      [null, 'III', 59],
      [null, 'IV', 26],
      [{value: s`{{bold.bright.cyan}}Total:`, width: 2}, null, s`{{bold.cyan}}157`]
    ];

    const table = makeTable(data, lineTheme, {rowFirst: '2', columnLast: '2', hCenter: [1], hRight: [2]});

    t.deepEqual(table.draw().toBox().box, [
      '\x1B[22;2m╭──────┬─────────╥────────╮\x1B[22m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m \x1B[1mQuarter\x1B[m \x1B[2m║\x1B[m \x1B[1mNumber\x1B[m \x1B[2m│\x1B[m',
      '\x1B[22;2m╞══════╪═════════╬════════╡\x1B[22m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m    I    \x1B[2m║\x1B[m     31 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m      \x1B[2m├─────────╫────────┤\x1B[m',
      '\x1B[22;2m│\x1B[m Year \x1B[2m│\x1B[m   II    \x1B[2m║\x1B[m     41 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m 2024 \x1B[2m├─────────╫────────┤\x1B[m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m   III   \x1B[2m║\x1B[m     59 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m      \x1B[2m├─────────╫────────┤\x1B[m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m   IV    \x1B[2m║\x1B[m     26 \x1B[2m│\x1B[m',
      '\x1B[22;2m├──────┴─────────╫────────┤\x1B[22m',
      '\x1B[22;2m│\x1B[m \x1B[1;96mTotal:\x1B[m         \x1B[2m║\x1B[m    \x1B[1;36m157\x1B[m \x1B[2m│\x1B[m',
      '\x1B[22;2m╰────────────────╨────────╯\x1B[22m'
    ]);
  });

  await t.test('Simple table with no separators', t => {
    const data = [
      [null, 'Quarter', 'Number'].map(x => x && s`{{bold}}${x}`),
      [{value: 'Year\n2024', height: 4, align: 'dc'}, 'I', 31],
      [null, 'II', 41],
      [null, 'III', 59],
      [null, 'IV', 26],
      [{value: s`{{bold.bright.cyan}}Total:`, width: 2}, null, s`{{bold.cyan}}157`]
    ];

    const table = makeTable(data, lineTheme, {
      hCenter: [1],
      hRight: [2],
      columnLast: '2',
      rowFirst: '2',
      rowLast: '2',
      hDataSep: 0
    });

    t.deepEqual(table.draw().toBox().box, [
      '\x1B[22;2m╭──────┬─────────╥────────╮\x1B[22m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m \x1B[1mQuarter\x1B[m \x1B[2m║\x1B[m \x1B[1mNumber\x1B[m \x1B[2m│\x1B[m',
      '\x1B[22;2m╞══════╪═════════╬════════╡\x1B[22m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m    I    \x1B[2m║\x1B[m     31 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m Year \x1B[2m│\x1B[m   II    \x1B[2m║\x1B[m     41 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m 2024 \x1B[2m│\x1B[m   III   \x1B[2m║\x1B[m     59 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m   IV    \x1B[2m║\x1B[m     26 \x1B[2m│\x1B[m',
      '\x1B[22;2m╞══════╧═════════╬════════╡\x1B[22m',
      '\x1B[22;2m│\x1B[m \x1B[1;96mTotal:\x1B[m         \x1B[2m║\x1B[m    \x1B[1;36m157\x1B[m \x1B[2m│\x1B[m',
      '\x1B[22;2m╰────────────────╨────────╯\x1B[22m'
    ]);
  });

  await t.test('Fancy table', t => {
    const data = [
      [null, 'Quarter', 'Number'],
      [{value: 'Year\n2024', height: 4, align: 'dc'}, 'I', 31],
      [null, 'II', 41],
      [null, 'III', 59],
      [null, 'IV', 26],
      [{value: 'Total:', width: 2, align: 'r'}, null, s`{{bold}}157`]
    ];

    const table = makeTable(data, lineTheme, {
      hCenter: [1],
      hRight: [2],
      columnLast: '2',
      rowFirst: '2',
      rowLast: '2',
      hDataSep: 0,
      states: {
        rowFirst: s`{{bold}}`,
        rowLast: s`{{bright.cyan}}`
      }
    });

    t.deepEqual(table.draw().toBox().box, [
      '\x1B[22;2m╭──────┬─────────╥────────╮\x1B[22m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m \x1B[1mQuarter\x1B[m \x1B[2m║\x1B[m \x1B[1mNumber\x1B[m \x1B[2m│\x1B[m',
      '\x1B[22;2m╞══════╪═════════╬════════╡\x1B[22m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m    I    \x1B[2m║\x1B[m     31 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m Year \x1B[2m│\x1B[m   II    \x1B[2m║\x1B[m     41 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m 2024 \x1B[2m│\x1B[m   III   \x1B[2m║\x1B[m     59 \x1B[2m│\x1B[m',
      '\x1B[22;2m│\x1B[m      \x1B[2m│\x1B[m   IV    \x1B[2m║\x1B[m     26 \x1B[2m│\x1B[m',
      '\x1B[22;2m╞══════╧═════════╬════════╡\x1B[22m',
      '\x1B[22;2m│\x1B[m         \x1B[96mTotal:\x1B[m \x1B[2m║\x1B[m    \x1B[1;96m157\x1B[m \x1B[2m│\x1B[m',
      '\x1B[22;2m╰────────────────╨────────╯\x1B[22m'
    ]);
  });
});
