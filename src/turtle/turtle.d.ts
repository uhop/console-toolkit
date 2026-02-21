export class Turtle {
  static RIGHT: 0;
  static DOWN: 1;
  static LEFT: 2;
  static UP: 3;

  static EAST: 0;
  static SOUTH: 1;
  static WEST: 2;
  static NORTH: 3;

  cells: (({ u?: number; d?: number; l?: number; r?: number }) | null)[][];
  width: number;
  height: number;
  direction: number;
  position: { x: number; y: number };
  theme: number;
  stack: [number, number, number, number][];

  constructor(width: number, height: number, theme?: number);

  reset(): this;
  home: Turtle['reset'];

  set(x: number, y: number): this;
  goto: Turtle['set'];
  setPos: Turtle['set'];
  setPosition: Turtle['set'];

  setX(x: number): this;
  setY(y: number): this;

  add(dx: number, dy: number): this;
  advance: Turtle['add'];

  addX(dx: number): this;
  addY(dy: number): this;

  setTheme(theme: number): this;
  setPen: Turtle['setTheme'];
  setWidth: Turtle['setTheme'];

  setDirection(direction: number): this;
  setDir: Turtle['setDirection'];

  setUp(): this;
  setNorth: Turtle['setUp'];

  setDown(): this;
  setSouth: Turtle['setDown'];

  setLeft(): this;
  setWest: Turtle['setLeft'];

  setRight(): this;
  setEast: Turtle['setRight'];

  left(): this;
  lt: Turtle['left'];

  right(): this;
  rt: Turtle['right'];

  save(): this;
  restore(): this;

  moveUp(distance: number): this;
  moveNorth: Turtle['moveUp'];

  moveDown(distance: number): this;
  moveSouth: Turtle['moveDown'];

  moveLeft(distance: number): this;
  moveWest: Turtle['moveLeft'];

  moveRight(distance: number): this;
  moveEast: Turtle['moveRight'];

  move(direction: number, distance: number): this;

  forward(distance: number): this;
  fd: Turtle['forward'];
  fwd: Turtle['forward'];

  backward(distance: number): this;
  bk: Turtle['backward'];
  back: Turtle['backward'];
  bwd: Turtle['backward'];

  markHalf(direction: number): this;
  markHalfForward(): this;
  markHalfBackward(): this;

  markHalfUp(): this;
  markHalfNorth: Turtle['markHalfUp'];

  markHalfDown(): this;
  markHalfSouth: Turtle['markHalfDown'];

  markHalfLeft(): this;
  markHalfWest: Turtle['markHalfLeft'];

  markHalfRight(): this;
  markHalfEast: Turtle['markHalfRight'];
}

export default Turtle;
