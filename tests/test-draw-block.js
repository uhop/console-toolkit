import test from 'tape-six';

import {drawFrame, drawBlock} from '../src/draw-block.js';
import lineTheme from '../src/themes/lines/ascii-girder.js';
import blockTheme from '../src/themes/blocks/unicode-half.js';

test('Draw a block', t => {
  t.test('Block', t => {
    const b = drawBlock(2, 1, blockTheme);

    t.equal(b.width, 4);
    t.equal(b.height, 3);

    t.deepEqual(b.box, ['▗▄▄▖', '▐██▌', '▝▀▀▘']);
  });

  t.test('Frame', t => {
    const b = drawFrame(2, 1, blockTheme);

    t.equal(b.width, 4);
    t.equal(b.height, 3);

    t.deepEqual(b.box, ['▗▄▄▖', '▐  ▌', '▝▀▀▘']);
  });

  t.test('Block with lines', t => {
    const b = drawBlock(2, 1, lineTheme);

    t.equal(b.width, 6);
    t.equal(b.height, 3);

    t.deepEqual(b.box, ['//==\\\\', '||  ||', '\\\\==//']);
  });

  t.test('Block with lines and a filler', t => {
    const b = drawBlock(2, 1, lineTheme, {symbol: '*'});

    t.equal(b.width, 6);
    t.equal(b.height, 3);

    t.deepEqual(b.box, ['//==\\\\', '||**||', '\\\\==//']);
  });

  t.test('Frame with zero lines', t => {
    const b = drawBlock(2, 1, lineTheme, {left: 0, right: 0});

    t.equal(b.width, 2);
    t.equal(b.height, 3);

    t.deepEqual(b.box, ['==', '  ', '==']);
  });
});
