/** Defines the characters used for table borders at various positions. */
export interface TableDefinition {
  /** Top border characters. */
  t: string;
  /** Middle (row separator) border characters. */
  m: string;
  /** Bottom border characters. */
  b: string;
  /** Vertical border characters. */
  v: string;
  /** Horizontal border characters. */
  h: string;
  /** Character width (default: 1). */
  w?: number;
  /** Fill character. */
  f?: string;
}

/** A line theme mapping theme keys to border/line character definitions. */
export type LineTheme = Record<string, any>;

/** Populates a line theme with characters from a table definition.
 * @param lineTheme - The theme object to populate.
 * @param tableDefinition - The table border character definitions.
 * @param hTheme - Horizontal theme identifier.
 * @param vTheme - Vertical theme identifier.
 */
export function populateTheme(
  lineTheme: LineTheme,
  tableDefinition: TableDefinition,
  hTheme: number | string,
  vTheme: number | string
): void;
