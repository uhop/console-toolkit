import test from 'tape-six';

import Bitmap from '../src/plot/index.js';
import style from '../src/style.js';

test('Plot', t => {
  t.test('Simple drawing', t => {
    const bmp = new Bitmap(7, 7).line(0, 0, 6, 6).line(0, 6, 6, 0).line(0, 0, 6, 0).line(0, 6, 6, 6);

    t.equal(bmp.width, 7);
    t.equal(bmp.height, 7);
    t.deepEqual(bmp.toBox('*').box, ['*******', ' *   * ', '  * *  ', '   *   ', '  * *  ', ' *   * ', '*******']);
  });

  t.test('Simple drawing - quads', t => {
    const bmp = new Bitmap(7, 7).line(0, 0, 6, 6).line(0, 6, 6, 0).line(0, 0, 6, 0).line(0, 6, 6, 6);

    t.equal(bmp.width, 7);
    t.equal(bmp.height, 7);
    t.deepEqual(bmp.toQuads().box, ['▜▀▜▘', ' ▚▘ ', '▗▘▚ ', '▀▀▀▘']);
  });

  t.test('Rects - quads', t => {
    const bmp = new Bitmap(27, 14)
      .rect(2, 1, 24, 12)
      .rect(4, 2, 22, 11, 0)
      .rect(6, 3, 20, 10)
      .rect(8, 4, 18, 9, 0)
      .rect(10, 5, 16, 8)
      .rect(12, 6, 14, 7, 0);

    t.equal(bmp.width, 27);
    t.equal(bmp.height, 14);
    t.deepEqual(bmp.toQuads().box, [
      ' ▄▄▄▄▄▄▄▄▄▄▄▖ ',
      ' █ ▄▄▄▄▄▄▄▖▐▌ ',
      ' █ █ ▄▄▄▖▐▌▐▌ ',
      ' █ █ █ ▐▌▐▌▐▌ ',
      ' █ █ ▀▀▀▘▐▌▐▌ ',
      ' █ ▀▀▀▀▀▀▀▘▐▌ ',
      ' ▀▀▀▀▀▀▀▀▀▀▀▘ '
    ]);
  });

  t.test('Combination - quads', t => {
    const bmp = new Bitmap(15, 7)
      .line(0, 0, 30, 6)
      .line(0, 6, 30, 0)
      .set(0, 3)
      .set(1, 2)
      .set(1, 4)
      .rect(13, 0, 14, 0)
      .rect(13, 6, 14, 6);

    t.equal(bmp.width, 15);
    t.equal(bmp.height, 7);
    t.deepEqual(bmp.toQuads().box, ['▀▚▄▄  ▝▘', '▞   ▀▀▚▖', '▝▗▄▄▀▀▘ ', '▀▘    ▝▘']);
  });

  t.test('XOR #1 - quads', t => {
    const bmp = new Bitmap(7, 7).line(0, 0, 6, 6).line(0, 6, 6, 0).rect(1, 1, 5, 5, -1);

    t.equal(bmp.width, 7);
    t.equal(bmp.height, 7);
    t.deepEqual(bmp.toQuads().box, ['▘▄▖▘', '▐▞▟ ', '▝▟▞ ', '▘  ▘']);
  });

  t.test('XOR #2 - quads', t => {
    const bmp = new Bitmap(7, 7).rect(1, 1, 5, 5).line(0, 0, 6, 6, -1).line(0, 6, 6, 0, -1);

    t.equal(bmp.width, 7);
    t.equal(bmp.height, 7);
    t.deepEqual(bmp.toQuads().box, ['▘▄▖▘', '▐▟▟ ', '▝▟▞ ', '▘  ▘']);
  });

  t.test('XOR #3 - quads', t => {
    const bmp = new Bitmap(7, 7).rect(1, 1, 5, 5).line(3, 0, 3, 6, -1).line(0, 3, 6, 3, -1);

    t.equal(bmp.width, 7);
    t.equal(bmp.height, 7);
    t.deepEqual(bmp.toQuads().box, ['▗▞▄ ', '▞▚▀▖', '▐▌█ ', ' ▝  ']);
  });

  t.test('XOR #4 - quads', t => {
    const bmp = new Bitmap(7, 7).line(3, 0, 3, 6).line(0, 3, 6, 3).rect(1, 1, 5, 5, -1);

    t.equal(bmp.width, 7);
    t.equal(bmp.height, 7);
    t.deepEqual(bmp.toQuads().box, ['▗▞▄ ', '▞▘▀▖', '▐▌█ ', ' ▝  ']);
  });
});
