import test from 'tape-six';

import style from '../src/style.js';
import {getLength, matchCsiNoGroups} from '../src/ansi/utils.js';

test('Utilities', async t => {
  await t.test('Clean from CSI sequences', t => {
    const s = style.cyan.text('cyan');
    t.equal(getLength(s), 4);
    t.equal(s.replace(matchCsiNoGroups, ''), 'cyan');
  });
});
