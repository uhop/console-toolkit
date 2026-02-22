/** Capitalizes the first letter of a string and lowercases the rest.
 * @param name - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(name: string): string;

/** Converts an array of name parts to camelCase.
 * @param names - Name parts.
 * @returns The camelCase string.
 */
export function toCamelCase(names: string[]): string;
/** Splits a camelCase string into an array of name parts.
 * @param name - The camelCase string.
 * @returns Array of name parts.
 */
export function fromCamelCase(name: string): string[];

/** Converts an array of name parts to PascalCase.
 * @param names - Name parts.
 * @returns The PascalCase string.
 */
export function toPascalCase(names: string[]): string;
/** Splits a PascalCase string into an array of name parts.
 * @param name - The PascalCase string.
 * @returns Array of name parts.
 */
export function fromPascalCase(name: string): string[];

/** Converts an array of name parts to ALL_CAPS_SNAKE_CASE.
 * @param names - Name parts.
 * @returns The ALL_CAPS_SNAKE_CASE string.
 */
export function toAllCapsSnakeCase(names: string[]): string;
/** Converts an array of name parts to snake_case.
 * @param names - Name parts.
 * @returns The snake_case string.
 */
export function toSnakeCase(names: string[]): string;
/** Splits a snake_case string into an array of name parts.
 * @param name - The snake_case string.
 * @returns Array of name parts.
 */
export function fromSnakeCase(name: string): string[];

/** Converts an array of name parts to kebab-case.
 * @param names - Name parts.
 * @returns The kebab-case string.
 */
export function toKebabCase(names: string[]): string;
/** Splits a kebab-case string into an array of name parts.
 * @param name - The kebab-case string.
 * @returns Array of name parts.
 */
export function fromKebabCase(name: string): string[];

/** Adds a getter property to a class prototype or object.
 * @param Class - The class or object to modify.
 * @param name - Property name.
 * @param getter - Getter function.
 * @param force - If true, overwrite existing properties.
 * @returns The modified class/object.
 */
export function addGetter<T>(Class: T, name: string, getter: () => unknown, force?: boolean): T;
/** Adds multiple getter properties to a class prototype or object.
 * @param Class - The class or object to modify.
 * @param getters - Map of property names to getter functions.
 * @param force - If true, overwrite existing properties.
 */
export function addGetters<T>(Class: T, getters: Record<string, () => unknown>, force?: boolean): void;

/** Adds an alias property that mirrors an existing property descriptor.
 * @param Class - The class or object to modify.
 * @param name - New property name.
 * @param oldName - Existing property name to alias.
 * @param force - If true, overwrite existing properties.
 * @returns The modified class/object.
 */
export function addAlias<T>(Class: T, name: string, oldName: string, force?: boolean): T;
/** Adds multiple alias properties to a class prototype or object.
 * @param Class - The class or object to modify.
 * @param aliases - Map of new names to existing names.
 * @param force - If true, overwrite existing properties.
 */
export function addAliases<T>(Class: T, aliases: Record<string, string>, force?: boolean): void;
