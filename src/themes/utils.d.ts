export interface TableDefinition {
  t: string;
  m: string;
  b: string;
  v: string;
  h: string;
  w?: number;
  f?: string;
}

export type LineTheme = Record<string, any>;

export function populateTheme(
  lineTheme: LineTheme,
  tableDefinition: TableDefinition,
  hTheme: number | string,
  vTheme: number | string
): void;
