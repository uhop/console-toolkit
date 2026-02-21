export function capitalize(name: string): string;

export function toCamelCase(names: string[]): string;
export function fromCamelCase(name: string): string[];

export function toPascalCase(names: string[]): string;
export function fromPascalCase(name: string): string[];

export function toAllCapsSnakeCase(names: string[]): string;
export function toSnakeCase(names: string[]): string;
export function fromSnakeCase(name: string): string[];

export function toKebabCase(names: string[]): string;
export function fromKebabCase(name: string): string[];

export function addGetter<T>(Class: T, name: string, getter: () => any, force?: boolean): T;
export function addGetters<T>(Class: T, getters: Record<string, () => any>, force?: boolean): void;

export function addAlias<T>(Class: T, name: string, oldName: string, force?: boolean): T;
export function addAliases<T>(Class: T, aliases: Record<string, string>, force?: boolean): void;
