import test from 'tape-six';
import Turtle, {draw} from 'console-toolkit/turtle';
import Box from 'console-toolkit/box';

test('Turtle static direction constants', t => {
  const r: 0 = Turtle.RIGHT;
  const d: 1 = Turtle.DOWN;
  const l: 2 = Turtle.LEFT;
  const u: 3 = Turtle.UP;
  const e: 0 = Turtle.EAST;
  const s: 1 = Turtle.SOUTH;
  const w: 2 = Turtle.WEST;
  const n: 3 = Turtle.NORTH;

  t.equal(r, 0, 'RIGHT');
  t.equal(d, 1, 'DOWN');
  t.equal(l, 2, 'LEFT');
  t.equal(u, 3, 'UP');
  t.equal(e, 0, 'EAST');
  t.equal(s, 1, 'SOUTH');
  t.equal(w, 2, 'WEST');
  t.equal(n, 3, 'NORTH');
});

test('Turtle constructor and properties', t => {
  const turtle: Turtle = new Turtle(10, 10);
  const turtle2: Turtle = new Turtle(10, 10, 2);
  const w: number = turtle.width;
  const h: number = turtle.height;
  const dir: number = turtle.direction;
  const pos: {x: number; y: number} = turtle.position;
  const th: number = turtle.theme;

  t.ok(turtle instanceof Turtle, 'constructor');
  t.ok(turtle2 instanceof Turtle, 'constructor with theme');
  t.ok(typeof w === 'number' && typeof h === 'number', 'width/height');
  t.equal(typeof dir, 'number', 'direction');
  t.ok(typeof pos.x === 'number' && typeof pos.y === 'number', 'position');
  t.equal(typeof th, 'number', 'theme');
});

test('Turtle position methods return this', t => {
  const turtle = new Turtle(10, 10);
  const r1: Turtle = turtle.reset();
  const r2: Turtle = turtle.home();
  const r3: Turtle = turtle.set(5, 5);
  const r4: Turtle = turtle.goto(3, 3);
  const r5: Turtle = turtle.setPos(1, 1);
  const r6: Turtle = turtle.setPosition(0, 0);
  const r7: Turtle = turtle.setX(5);
  const r8: Turtle = turtle.setY(5);
  const r9: Turtle = turtle.add(1, 1);
  const r10: Turtle = turtle.advance(1, 1);
  const r11: Turtle = turtle.addX(1);
  const r12: Turtle = turtle.addY(1);

  t.ok(r1 === turtle && r2 === turtle, 'reset/home');
  t.ok(r3 === turtle && r4 === turtle, 'set/goto');
  t.ok(r5 === turtle && r6 === turtle, 'setPos/setPosition');
  t.ok(r7 === turtle && r8 === turtle, 'setX/setY');
  t.ok(r9 === turtle && r10 === turtle, 'add/advance');
  t.ok(r11 === turtle && r12 === turtle, 'addX/addY');
});

test('Turtle direction methods return this', t => {
  const turtle = new Turtle(10, 10);
  const r1: Turtle = turtle.setTheme(2);
  const r2: Turtle = turtle.setPen(1);
  const r3: Turtle = turtle.setWidth(1);
  const r4: Turtle = turtle.setDirection(0);
  const r5: Turtle = turtle.setDir(1);
  const r6: Turtle = turtle.setUp();
  const r7: Turtle = turtle.setNorth();
  const r8: Turtle = turtle.setDown();
  const r9: Turtle = turtle.setSouth();
  const r10: Turtle = turtle.setLeft();
  const r11: Turtle = turtle.setWest();
  const r12: Turtle = turtle.setRight();
  const r13: Turtle = turtle.setEast();
  const r14: Turtle = turtle.left();
  const r15: Turtle = turtle.lt();
  const r16: Turtle = turtle.right();
  const r17: Turtle = turtle.rt();

  t.ok(r1 === turtle && r2 === turtle && r3 === turtle, 'setTheme/setPen/setWidth');
  t.ok(r4 === turtle && r5 === turtle, 'setDirection/setDir');
  t.ok(r6 === turtle && r7 === turtle, 'setUp/setNorth');
  t.ok(r8 === turtle && r9 === turtle, 'setDown/setSouth');
  t.ok(r10 === turtle && r11 === turtle, 'setLeft/setWest');
  t.ok(r12 === turtle && r13 === turtle, 'setRight/setEast');
  t.ok(r14 === turtle && r15 === turtle, 'left/lt');
  t.ok(r16 === turtle && r17 === turtle, 'right/rt');
});

test('Turtle save/restore', t => {
  const turtle = new Turtle(10, 10);
  const r1: Turtle = turtle.save();
  const r2: Turtle = turtle.restore();

  t.ok(r1 === turtle, 'save');
  t.ok(r2 === turtle, 'restore');
});

test('Turtle movement methods return this', t => {
  const turtle = new Turtle(10, 10);
  const r1: Turtle = turtle.moveUp(2);
  const r2: Turtle = turtle.moveNorth(2);
  const r3: Turtle = turtle.moveDown(2);
  const r4: Turtle = turtle.moveSouth(2);
  const r5: Turtle = turtle.moveLeft(2);
  const r6: Turtle = turtle.moveWest(2);
  const r7: Turtle = turtle.moveRight(2);
  const r8: Turtle = turtle.moveEast(2);
  const r9: Turtle = turtle.move(0, 2);
  const r10: Turtle = turtle.forward(2);
  const r11: Turtle = turtle.fd(2);
  const r12: Turtle = turtle.fwd(2);
  const r13: Turtle = turtle.backward(2);
  const r14: Turtle = turtle.bk(2);
  const r15: Turtle = turtle.back(2);
  const r16: Turtle = turtle.bwd(2);

  t.ok(r1 === turtle && r2 === turtle, 'moveUp/moveNorth');
  t.ok(r3 === turtle && r4 === turtle, 'moveDown/moveSouth');
  t.ok(r5 === turtle && r6 === turtle, 'moveLeft/moveWest');
  t.ok(r7 === turtle && r8 === turtle, 'moveRight/moveEast');
  t.equal(r9, turtle, 'move');
  t.ok(r10 === turtle && r11 === turtle && r12 === turtle, 'forward/fd/fwd');
  t.ok(r13 === turtle && r14 === turtle && r15 === turtle && r16 === turtle, 'backward/bk/back/bwd');
});

test('Turtle markHalf methods return this', t => {
  const turtle = new Turtle(10, 10);
  turtle.set(5, 5);
  const r1: Turtle = turtle.markHalf(0);
  const r2: Turtle = turtle.markHalfForward();
  const r3: Turtle = turtle.markHalfBackward();
  const r4: Turtle = turtle.markHalfUp();
  const r5: Turtle = turtle.markHalfNorth();
  const r6: Turtle = turtle.markHalfDown();
  const r7: Turtle = turtle.markHalfSouth();
  const r8: Turtle = turtle.markHalfLeft();
  const r9: Turtle = turtle.markHalfWest();
  const r10: Turtle = turtle.markHalfRight();
  const r11: Turtle = turtle.markHalfEast();

  t.equal(r1, turtle, 'markHalf');
  t.ok(r2 === turtle && r3 === turtle, 'markHalfForward/markHalfBackward');
  t.ok(r4 === turtle && r5 === turtle, 'markHalfUp/markHalfNorth');
  t.ok(r6 === turtle && r7 === turtle, 'markHalfDown/markHalfSouth');
  t.ok(r8 === turtle && r9 === turtle, 'markHalfLeft/markHalfWest');
  t.ok(r10 === turtle && r11 === turtle, 'markHalfRight/markHalfEast');
});

test('Turtle draw and toBox/toStrings', t => {
  const turtle = new Turtle(5, 5);
  turtle.forward(3).right().forward(3);
  const box: Box = draw(turtle);
  const box2: Box = draw(turtle, {useArcs: true});
  const box3: Box = turtle.toBox();
  const strings: string[] = turtle.toStrings();

  t.ok(box instanceof Box, 'draw');
  t.ok(box2 instanceof Box, 'draw with options');
  t.ok(box3 instanceof Box, 'toBox');
  t.ok(Array.isArray(strings), 'toStrings');
});
