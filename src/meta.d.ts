/** Capitalizes the first letter of a string and lowercases the rest. */
export function capitalize(name: string): string;

/** Converts an array of name parts to camelCase. */
export function toCamelCase(names: string[]): string;
/** Splits a camelCase string into an array of name parts. */
export function fromCamelCase(name: string): string[];

export function toPascalCase(names: string[]): string;
export function fromPascalCase(name: string): string[];

export function toAllCapsSnakeCase(names: string[]): string;
export function toSnakeCase(names: string[]): string;
export function fromSnakeCase(name: string): string[];

export function toKebabCase(names: string[]): string;
export function fromKebabCase(name: string): string[];

/** Adds a getter property to a class prototype or object. */
export function addGetter<T>(Class: T, name: string, getter: () => any, force?: boolean): T;
/** Adds multiple getter properties to a class prototype or object. */
export function addGetters<T>(Class: T, getters: Record<string, () => any>, force?: boolean): void;

/** Adds an alias property that mirrors an existing property descriptor. */
export function addAlias<T>(Class: T, name: string, oldName: string, force?: boolean): T;
/** Adds multiple alias properties to a class prototype or object. */
export function addAliases<T>(Class: T, aliases: Record<string, string>, force?: boolean): void;
