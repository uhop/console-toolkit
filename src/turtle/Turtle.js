import {addAliases} from '../meta.js';

export class Turtle {
  static RIGHT = 0;
  static DOWN = 1;
  static LEFT = 2;
  static UP = 3;

  static EAST = 0;
  static SOUTH = 1;
  static WEST = 2;
  static NORTH = 3;

  constructor(width, height, theme = 1) {
    this.cells = new Array(height);
    for (let i = 0; i < height; ++i) {
      this.cells[i] = new Array(width).fill(null);
    }

    this.width = width;
    this.height = height;
    this.direction = Turtle.RIGHT;
    this.position = {x: 0, y: 0};
    this.theme = theme;
  }

  reset() {
    this.position.x = this.position.y = 0;
    return this;
  }
  set(x, y) {
    this.position.x = Math.max(0, Math.min(this.width - 1, x));
    this.position.y = Math.max(0, Math.min(this.height - 1, y));
    return this;
  }
  setX(x) {
    this.position.x = Math.max(0, Math.min(this.width - 1, x));
    return this;
  }
  setY(y) {
    this.position.y = Math.max(0, Math.min(this.height - 1, y));
    return this;
  }

  setTheme(theme) {
    this.theme = theme;
    return this;
  }

  setDirection(direction) {
    this.direction = direction % 4;
    return this;
  }
  setUp() {
    return this.setDirection(Turtle.UP);
  }
  setDown() {
    return this.setDirection(Turtle.DOWN);
  }
  setLeft() {
    return this.setDirection(Turtle.LEFT);
  }
  setRight() {
    return this.setDirection(Turtle.RIGHT);
  }
  left() {
    return this.setDirection((this.direction + 3) % 4);
  }
  right() {
    return this.setDirection((this.direction + 1) % 4);
  }

  moveUp(d) {
    if (!d) return this;
    if (d < 0) return this.moveDown(-d);

    const last = Math.max(0, this.position.y - d);
    if (this.position.y === last) return this;

    for (let i = this.position.y; i >= last; --i) {
      let cell = this.cells[i][this.position.x];
      if (!cell) cell = this.cells[i][this.position.x] = {};
      switch (i) {
        case this.position.y:
          cell.u = this.theme;
          break;
        case last:
          cell.d = this.theme;
          break;
        default:
          cell.u = cell.d = this.theme;
          break;
      }
    }

    this.position.y = last;
    return this;
  }
  moveDown(d) {
    if (!d) return this;
    if (d < 0) return this.moveUp(-d);

    const last = Math.min(this.height - 1, this.position.y + d);
    if (this.position.y === last) return this;

    for (let i = this.position.y; i <= last; ++i) {
      let cell = this.cells[i][this.position.x];
      if (!cell) cell = this.cells[i][this.position.x] = {};
      switch (i) {
        case this.position.y:
          cell.d = this.theme;
          break;
        case last:
          cell.u = this.theme;
          break;
        default:
          cell.u = cell.d = this.theme;
          break;
      }
    }

    this.position.y = last;
    return this;
  }
  moveLeft(d) {
    if (!d) return this;
    if (d < 0) return this.moveRight(-d);

    const last = Math.max(0, this.position.x - d);
    if (this.position.x === last) return this;

    for (let j = this.position.x; j >= last; --j) {
      let cell = this.cells[this.position.y][j];
      if (!cell) cell = this.cells[this.position.y][j] = {};
      switch (j) {
        case this.position.x:
          cell.l = this.theme;
          break;
        case last:
          cell.r = this.theme;
          break;
        default:
          cell.r = cell.l = this.theme;
          break;
      }
    }

    this.position.x = last;
    return this;
  }
  moveRight(d) {
    if (!d) return this;
    if (d < 0) return this.moveLeft(-d);

    const last = Math.min(this.width - 1, this.position.x + d);
    if (this.position.x === last) return this;

    for (let j = this.position.x; j <= last; ++j) {
      let cell = this.cells[this.position.y][j];
      if (!cell) cell = this.cells[this.position.y][j] = {};
      switch (j) {
        case this.position.x:
          cell.r = this.theme;
          break;
        case last:
          cell.l = this.theme;
          break;
        default:
          cell.r = cell.l = this.theme;
          break;
      }
    }

    this.position.x = last;
    return this;
  }
  move(direction, d) {
    switch (direction) {
      case Turtle.UP:
        return this.moveUp(d);
      case Turtle.DOWN:
        return this.moveDown(d);
      case Turtle.RIGHT:
        return this.moveRight(d);
      case Turtle.LEFT:
        return this.moveLeft(d);
    }
    return this;
  }
  forward(d) {
    return this.move(this.direction, d);
  }
  backward(d) {
    return this.move((this.direction + 2) % 4, d);
  }

  markHalf(direction) {
    let cell = this.cells[this.position.y][this.position.x];
    if (!cell) cell = this.cells[this.position.y][this.position.x] = {};
    switch (direction) {
      case Turtle.UP:
        cell.u = this.theme;
        break;
      case Turtle.DOWN:
        cell.d = this.theme;
        break;
      case Turtle.RIGHT:
        cell.r = this.theme;
        break;
      case Turtle.LEFT:
        cell.l = this.theme;
        break;
    }
    return this;
  }
  markHalfForward() {
    return this.markHalf(this.direction);
  }
  markHalfBackward() {
    return this.markHalf((this.direction + 2) % 4);
  }
  markHalfUp() {
    return this.markHalf(Turtle.UP);
  }
  markHalfDown() {
    return this.markHalf(Turtle.DOWN);
  }
  markHalfLeft() {
    return this.markHalf(Turtle.LEFT);
  }
  markHalfRight() {
    return this.markHalf(Turtle.RIGHT);
  }
}

addAliases(Turtle, {
  home: 'reset',
  goto: 'set',
  setPos: 'set',
  setPosition: 'set',
  lt: 'left',
  rt: 'right',
  fd: 'forward',
  fwd: 'forward',
  bk: 'backward',
  back: 'backward',
  bwd: 'backward',
  setNorth: 'setUp',
  setSouth: 'setDown',
  setWest: 'setLeft',
  setEast: 'setRight',
  moveNorth: 'moveUp',
  moveSouth: 'moveDown',
  moveWest: 'moveLeft',
  moveEast: 'moveRight',
  markHalfNorth: 'markHalfUp',
  markHalfSouth: 'markHalfDown',
  markHalfWest: 'markHalfLeft',
  markHalfEast: 'markHalfRight'
});

export default Turtle;