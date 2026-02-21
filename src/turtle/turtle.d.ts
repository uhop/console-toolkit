/** Turtle graphics on a grid with directional movement and line drawing.
 * @see {@link https://github.com/uhop/console-toolkit/wiki/Module:-turtle}
 */
export class Turtle {
  /** Direction constant: right (0). */
  static RIGHT: 0;
  /** Direction constant: down (1). */
  static DOWN: 1;
  /** Direction constant: left (2). */
  static LEFT: 2;
  /** Direction constant: up (3). */
  static UP: 3;

  /** Direction constant: east (0). */
  static EAST: 0;
  /** Direction constant: south (1). */
  static SOUTH: 1;
  /** Direction constant: west (2). */
  static WEST: 2;
  /** Direction constant: north (3). */
  static NORTH: 3;

  /** The 2D grid of cells with directional line weights. */
  cells: ({u?: number; d?: number; l?: number; r?: number} | null)[][];
  /** Grid width. */
  width: number;
  /** Grid height. */
  height: number;
  /** Current direction (0=right, 1=down, 2=left, 3=up). */
  direction: number;
  /** Current position. */
  position: {x: number; y: number};
  /** Current line theme/weight. */
  theme: number;
  /** Saved state stack. */
  stack: [number, number, number, number][];

  /**
   * @param width - Grid width.
   * @param height - Grid height.
   * @param theme - Initial line theme (default: 1).
   */
  constructor(width: number, height: number, theme?: number);

  /** Resets the turtle to the origin facing right.
   * @returns This Turtle.
   */
  reset(): this;
  /** Alias for `reset`. */
  home: Turtle['reset'];

  /** Sets the turtle position.
   * @param x - X coordinate.
   * @param y - Y coordinate.
   * @returns This Turtle.
   */
  set(x: number, y: number): this;
  /** Alias for `set`. */
  goto: Turtle['set'];
  /** Alias for `set`. */
  setPos: Turtle['set'];
  /** Alias for `set`. */
  setPosition: Turtle['set'];

  /** Sets the X coordinate.
   * @param x - X coordinate.
   * @returns This Turtle.
   */
  setX(x: number): this;
  /** Sets the Y coordinate.
   * @param y - Y coordinate.
   * @returns This Turtle.
   */
  setY(y: number): this;

  /** Moves the turtle by a relative offset without drawing.
   * @param dx - X offset.
   * @param dy - Y offset.
   * @returns This Turtle.
   */
  add(dx: number, dy: number): this;
  /** Alias for `add`. */
  advance: Turtle['add'];

  /** Adds to the X coordinate.
   * @param dx - X offset.
   * @returns This Turtle.
   */
  addX(dx: number): this;
  /** Adds to the Y coordinate.
   * @param dy - Y offset.
   * @returns This Turtle.
   */
  addY(dy: number): this;

  /** Sets the line theme/weight.
   * @param theme - Theme number.
   * @returns This Turtle.
   */
  setTheme(theme: number): this;
  /** Alias for `setTheme`. */
  setPen: Turtle['setTheme'];
  /** Alias for `setTheme`. */
  setWidth: Turtle['setTheme'];

  /** Sets the direction.
   * @param direction - Direction (0-3).
   * @returns This Turtle.
   */
  setDirection(direction: number): this;
  /** Alias for `setDirection`. */
  setDir: Turtle['setDirection'];

  /** Sets direction to up.
   * @returns This Turtle.
   */
  setUp(): this;
  /** Alias for `setUp`. */
  setNorth: Turtle['setUp'];

  /** Sets direction to down.
   * @returns This Turtle.
   */
  setDown(): this;
  /** Alias for `setDown`. */
  setSouth: Turtle['setDown'];

  /** Sets direction to left.
   * @returns This Turtle.
   */
  setLeft(): this;
  /** Alias for `setLeft`. */
  setWest: Turtle['setLeft'];

  /** Sets direction to right.
   * @returns This Turtle.
   */
  setRight(): this;
  /** Alias for `setRight`. */
  setEast: Turtle['setRight'];

  /** Turns the turtle 90° left.
   * @returns This Turtle.
   */
  left(): this;
  /** Alias for `left`. */
  lt: Turtle['left'];

  /** Turns the turtle 90° right.
   * @returns This Turtle.
   */
  right(): this;
  /** Alias for `right`. */
  rt: Turtle['right'];

  /** Saves the current state onto the stack.
   * @returns This Turtle.
   */
  save(): this;
  /** Restores the last saved state from the stack.
   * @returns This Turtle.
   */
  restore(): this;

  /** Moves up by distance, drawing a line.
   * @param distance - Steps.
   * @returns This Turtle.
   */
  moveUp(distance: number): this;
  /** Alias for `moveUp`. */
  moveNorth: Turtle['moveUp'];

  /** Moves down by distance, drawing a line.
   * @param distance - Steps.
   * @returns This Turtle.
   */
  moveDown(distance: number): this;
  /** Alias for `moveDown`. */
  moveSouth: Turtle['moveDown'];

  /** Moves left by distance, drawing a line.
   * @param distance - Steps.
   * @returns This Turtle.
   */
  moveLeft(distance: number): this;
  /** Alias for `moveLeft`. */
  moveWest: Turtle['moveLeft'];

  /** Moves right by distance, drawing a line.
   * @param distance - Steps.
   * @returns This Turtle.
   */
  moveRight(distance: number): this;
  /** Alias for `moveRight`. */
  moveEast: Turtle['moveRight'];

  /** Moves in a direction, drawing a line.
   * @param direction - Direction (0-3).
   * @param distance - Steps.
   * @returns This Turtle.
   */
  move(direction: number, distance: number): this;

  /** Moves the turtle forward, drawing a line.
   * @param distance - Steps.
   * @returns This Turtle.
   */
  forward(distance: number): this;
  /** Alias for `forward`. */
  fd: Turtle['forward'];
  /** Alias for `forward`. */
  fwd: Turtle['forward'];

  /** Moves the turtle backward, drawing a line.
   * @param distance - Steps.
   * @returns This Turtle.
   */
  backward(distance: number): this;
  /** Alias for `backward`. */
  bk: Turtle['backward'];
  /** Alias for `backward`. */
  back: Turtle['backward'];
  /** Alias for `backward`. */
  bwd: Turtle['backward'];

  /** Marks a half-step line in the given direction.
   * @param direction - Direction (0-3).
   * @returns This Turtle.
   */
  markHalf(direction: number): this;
  /** Marks a half-step line forward.
   * @returns This Turtle.
   */
  markHalfForward(): this;
  /** Marks a half-step line backward.
   * @returns This Turtle.
   */
  markHalfBackward(): this;

  /** Marks a half-step line up.
   * @returns This Turtle.
   */
  markHalfUp(): this;
  /** Alias for `markHalfUp`. */
  markHalfNorth: Turtle['markHalfUp'];

  /** Marks a half-step line down.
   * @returns This Turtle.
   */
  markHalfDown(): this;
  /** Alias for `markHalfDown`. */
  markHalfSouth: Turtle['markHalfDown'];

  /** Marks a half-step line left.
   * @returns This Turtle.
   */
  markHalfLeft(): this;
  /** Alias for `markHalfLeft`. */
  markHalfWest: Turtle['markHalfLeft'];

  /** Marks a half-step line right.
   * @returns This Turtle.
   */
  markHalfRight(): this;
  /** Alias for `markHalfRight`. */
  markHalfEast: Turtle['markHalfRight'];
}

export default Turtle;
