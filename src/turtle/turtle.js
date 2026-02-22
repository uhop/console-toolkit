import {addAliases} from '../meta.js';

/** Turtle graphics on a grid. Supports directional movement, line drawing, state save/restore, and various aliases.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Package:-turtle}
 */
export class Turtle {
  static RIGHT = 0;
  static DOWN = 1;
  static LEFT = 2;
  static UP = 3;

  static EAST = 0;
  static SOUTH = 1;
  static WEST = 2;
  static NORTH = 3;

  /** Creates a new Turtle on a grid of the given size.
   * @param {number} width - Grid width.
   * @param {number} height - Grid height.
   * @param {number} [theme=1] - The line theme/pen width.
   */
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
    this.stack = [];
  }

  /** Resets the turtle position to (0, 0).
   * @returns {this}
   */
  reset() {
    this.position.x = this.position.y = 0;
    return this;
  }
  /** Sets the turtle position (clamped to grid bounds).
   * @param {number} x
   * @param {number} y
   * @returns {this}
   */
  set(x, y) {
    this.position.x = Math.max(0, Math.min(this.width - 1, x));
    this.position.y = Math.max(0, Math.min(this.height - 1, y));
    return this;
  }
  /** Sets the X coordinate.
   * @param {number} x
   * @returns {this}
   */
  setX(x) {
    this.position.x = Math.max(0, Math.min(this.width - 1, x));
    return this;
  }
  /** Sets the Y coordinate.
   * @param {number} y
   * @returns {this}
   */
  setY(y) {
    this.position.y = Math.max(0, Math.min(this.height - 1, y));
    return this;
  }
  /** Moves the turtle by a relative offset without drawing.
   * @param {number} dx - X offset.
   * @param {number} dy - Y offset.
   * @returns {this}
   */
  add(dx, dy) {
    return this.set(x + dx, y + dy);
  }
  /** Adds to the X coordinate.
   * @param {number} dx - X offset.
   * @returns {this}
   */
  addX(dx) {
    return this.setX(x + dx);
  }
  /** Adds to the Y coordinate.
   * @param {number} dy - Y offset.
   * @returns {this}
   */
  addY(dy) {
    return this.setY(y + dy);
  }

  /** Sets the line theme/pen width.
   * @param {number} theme
   * @returns {this}
   */
  setTheme(theme) {
    this.theme = theme;
    return this;
  }

  /** Sets the turtle direction (0=right, 1=down, 2=left, 3=up).
   * @param {number} direction
   * @returns {this}
   */
  setDirection(direction) {
    this.direction = direction % 4;
    return this;
  }
  /** Sets direction to up.
   * @returns {this}
   */
  setUp() {
    return this.setDirection(Turtle.UP);
  }
  /** Sets direction to down.
   * @returns {this}
   */
  setDown() {
    return this.setDirection(Turtle.DOWN);
  }
  /** Sets direction to left.
   * @returns {this}
   */
  setLeft() {
    return this.setDirection(Turtle.LEFT);
  }
  /** Sets direction to right.
   * @returns {this}
   */
  setRight() {
    return this.setDirection(Turtle.RIGHT);
  }
  /** Turns the turtle 90° to the left.
   * @returns {this}
   */
  left() {
    return this.setDirection((this.direction + 3) % 4);
  }
  /** Turns the turtle 90° to the right.
   * @returns {this}
   */
  right() {
    return this.setDirection((this.direction + 1) % 4);
  }

  /** Saves the current position, direction, and theme onto the stack.
   * @returns {this}
   */
  save() {
    this.stack.push([this.position.x, this.position.y, this.direction, this.theme]);
    return this;
  }
  /** Restores the position, direction, and theme from the stack.
   * @returns {this}
   */
  restore() {
    if (!this.stack) throw new ReferenceError('Unmatched restore');
    [this.position.x, this.position.y, this.direction, this.theme] = this.stack.pop();
    return this;
  }

  /** Moves the turtle up, drawing a line.
   * @param {number} distance - Number of cells to move.
   * @returns {this}
   */
  moveUp(distance) {
    if (!distance) return this;
    if (distance < 0) return this.moveDown(-distance);

    const last = Math.max(0, this.position.y - distance);
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
  /** Moves the turtle down, drawing a line.
   * @param {number} distance - Number of cells to move.
   * @returns {this}
   */
  moveDown(distance) {
    if (!distance) return this;
    if (distance < 0) return this.moveUp(-distance);

    const last = Math.min(this.height - 1, this.position.y + distance);
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
  /** Moves the turtle left, drawing a line.
   * @param {number} distance - Number of cells to move.
   * @returns {this}
   */
  moveLeft(distance) {
    if (!distance) return this;
    if (distance < 0) return this.moveRight(-distance);

    const last = Math.max(0, this.position.x - distance);
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
  /** Moves the turtle right, drawing a line.
   * @param {number} distance - Number of cells to move.
   * @returns {this}
   */
  moveRight(distance) {
    if (!distance) return this;
    if (distance < 0) return this.moveLeft(-distance);

    const last = Math.min(this.width - 1, this.position.x + distance);
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
  /** Moves the turtle in the given direction, drawing a line.
   * @param {number} direction - Direction (0=right, 1=down, 2=left, 3=up).
   * @param {number} distance - Number of cells to move.
   * @returns {this}
   */
  move(direction, distance) {
    switch (direction) {
      case Turtle.UP:
        return this.moveUp(distance);
      case Turtle.DOWN:
        return this.moveDown(distance);
      case Turtle.RIGHT:
        return this.moveRight(distance);
      case Turtle.LEFT:
        return this.moveLeft(distance);
    }
    return this;
  }
  /** Moves the turtle forward in its current direction.
   * @param {number} distance - Number of cells to move.
   * @returns {this}
   */
  forward(distance) {
    return this.move(this.direction, distance);
  }
  /** Moves the turtle backward (opposite of current direction).
   * @param {number} distance - Number of cells to move.
   * @returns {this}
   */
  backward(distance) {
    return this.move((this.direction + 2) % 4, distance);
  }

  /** Marks a half-line from the center of the current cell in the given direction.
   * @param {number} direction - Direction (0=right, 1=down, 2=left, 3=up).
   * @returns {this}
   */
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
  /** Marks a half-step line forward.
   * @returns {this}
   */
  markHalfForward() {
    return this.markHalf(this.direction);
  }
  /** Marks a half-step line backward.
   * @returns {this}
   */
  markHalfBackward() {
    return this.markHalf((this.direction + 2) % 4);
  }
  /** Marks a half-step line up.
   * @returns {this}
   */
  markHalfUp() {
    return this.markHalf(Turtle.UP);
  }
  /** Marks a half-step line down.
   * @returns {this}
   */
  markHalfDown() {
    return this.markHalf(Turtle.DOWN);
  }
  /** Marks a half-step line left.
   * @returns {this}
   */
  markHalfLeft() {
    return this.markHalf(Turtle.LEFT);
  }
  /** Marks a half-step line right.
   * @returns {this}
   */
  markHalfRight() {
    return this.markHalf(Turtle.RIGHT);
  }
}

addAliases(Turtle, {
  home: 'reset',
  goto: 'set',
  setPos: 'set',
  setPosition: 'set',
  advance: 'add',
  lt: 'left',
  rt: 'right',
  fd: 'forward',
  fwd: 'forward',
  bk: 'backward',
  back: 'backward',
  bwd: 'backward',
  setPen: 'setTheme',
  setWidth: 'setTheme',
  setDir: 'setDirection',
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
