import test from 'tape-six';
import Bitmap, {drawLine, drawRect, toQuads} from 'console-toolkit/plot';
import Box from 'console-toolkit/box';

test('Bitmap constructor and properties', t => {
  const bm: Bitmap = new Bitmap(20, 10);
  const bm2: Bitmap = new Bitmap(20, 10, 4, 4);

  const w: number = bm.width;
  const h: number = bm.height;
  const bw: number = bm.blockWidth;
  const bh: number = bm.blockHeight;
  const ls: number = bm.lineSize;
  const lc: number = bm.lineCount;
  const arr: number[] = bm.bitmap;

  t.ok(bm instanceof Bitmap, 'constructor');
  t.ok(bm2 instanceof Bitmap, 'constructor with block size');
  t.ok(typeof w === 'number' && typeof h === 'number', 'width/height');
  t.ok(typeof bw === 'number' && typeof bh === 'number', 'blockWidth/blockHeight');
  t.ok(typeof ls === 'number' && typeof lc === 'number', 'lineSize/lineCount');
  t.ok(Array.isArray(arr), 'bitmap array');
});

test('Bitmap bit operations', t => {
  const bm = new Bitmap(20, 10);
  const val: number = bm.getBit(0, 0);
  const r1: Bitmap = bm.setBit(0, 0);
  const r2: Bitmap = bm.setBit(1, 1, 1);
  const r3: Bitmap = bm.set(2, 2);
  const wi: number = bm.getWordIndex(0, 0);
  const wm: number = bm.getWordMask(0, 0);

  t.equal(typeof val, 'number', 'getBit returns number');
  t.equal(r1, bm, 'setBit returns this');
  t.equal(r2, bm, 'setBit with value');
  t.equal(r3, bm, 'set alias');
  t.equal(typeof wi, 'number', 'getWordIndex');
  t.equal(typeof wm, 'number', 'getWordMask');
});

test('Bitmap clear and verifyPos', t => {
  const bm = new Bitmap(20, 10);
  const r1: Bitmap = bm.clear();
  const r2: Bitmap = bm.clear(true);
  const r3: Bitmap = bm.verifyPos(0, 0);

  t.equal(r1, bm, 'clear');
  t.equal(r2, bm, 'clear with value');
  t.equal(r3, bm, 'verifyPos');
});

test('Bitmap toBox', t => {
  const bm = new Bitmap(20, 10);
  const box: Box = bm.toBox();
  const box2: Box = bm.toBox('#', '.');

  t.ok(box instanceof Box, 'toBox default');
  t.ok(box2 instanceof Box, 'toBox with chars');
});

test('Bitmap augmented methods (from plot/index)', t => {
  const bm = new Bitmap(20, 10);
  const r1: Bitmap = bm.line(0, 0, 10, 10);
  const r2: Bitmap = bm.line(0, 0, 10, 10, 1);
  const r3: Bitmap = bm.rect(0, 0, 5, 5);
  const r4: Bitmap = bm.rect(0, 0, 5, 5, 1);
  const quads: Box = bm.toQuads();
  const strings: string[] = bm.toStrings();

  t.equal(r1, bm, 'line');
  t.equal(r2, bm, 'line with value');
  t.equal(r3, bm, 'rect');
  t.equal(r4, bm, 'rect with value');
  t.ok(quads instanceof Box, 'toQuads');
  t.ok(Array.isArray(strings), 'toStrings');
});

test('standalone functions', t => {
  const bm = new Bitmap(20, 10);
  drawLine(bm, 0, 0, 10, 5);
  drawRect(bm, 0, 0, 5, 5);
  const box: Box = toQuads(bm);

  t.equal(typeof drawLine, 'function', 'drawLine');
  t.equal(typeof drawRect, 'function', 'drawRect');
  t.ok(box instanceof Box, 'toQuads');
});
