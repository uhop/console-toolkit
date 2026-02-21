/** Capitalizes the first letter of a string and lowercases the rest.
 * @param {string} name - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalize = name => (name ? name[0].toUpperCase() + name.substring(1).toLowerCase() : name);

/** Converts an array of name parts to camelCase.
 * @param {string[]} names - The name parts.
 * @returns {string} The camelCase string.
 */
export const toCamelCase = names =>
  names.map((name, index) => (index ? capitalize(name) : name.toLowerCase())).join('');
/** Splits a camelCase string into an array of name parts.
 * @param {string} name - The camelCase string.
 * @returns {string[]} The name parts.
 */
export const fromCamelCase = name => name.split(/(?=[A-Z])/g);

/** Converts an array of name parts to PascalCase.
 * @param {string[]} names - The name parts.
 * @returns {string} The PascalCase string.
 */
export const toPascalCase = names => names.map(name => capitalize(name)).join('');
/** Splits a PascalCase string into an array of name parts.
 * @param {string} name - The PascalCase string.
 * @returns {string[]} The name parts.
 */
export const fromPascalCase = name => name.split(/(?=[A-Z])/g);

/** Converts an array of name parts to ALL_CAPS_SNAKE_CASE.
 * @param {string[]} names - The name parts.
 * @returns {string} The ALL_CAPS_SNAKE_CASE string.
 */
export const toAllCapsSnakeCase = names => names.map(name => name.toUpperCase()).join('_');
/** Converts an array of name parts to snake_case.
 * @param {string[]} names - The name parts.
 * @returns {string} The snake_case string.
 */
export const toSnakeCase = names => names.map(name => name.toLowerCase()).join('_');
/** Splits a snake_case string into an array of name parts.
 * @param {string} name - The snake_case string.
 * @returns {string[]} The name parts.
 */
export const fromSnakeCase = name => name.split('_');

/** Converts an array of name parts to kebab-case.
 * @param {string[]} names - The name parts.
 * @returns {string} The kebab-case string.
 */
export const toKebabCase = names => names.map(name => name.toLowerCase()).join('-');
/** Splits a kebab-case string into an array of name parts.
 * @param {string} name - The kebab-case string.
 * @returns {string[]} The name parts.
 */
export const fromKebabCase = name => name.split('-');

/** Adds a getter property to a class prototype or object.
 * @param {Function|object} Class - The class or object to add the getter to.
 * @param {string} name - The property name.
 * @param {Function} getter - The getter function.
 * @param {boolean} [force] - If true, overwrite existing properties.
 * @returns {object} The modified prototype or object.
 */
export const addGetter = (Class, name, getter, force) => {
  const object = Class.prototype || Class;
  if (!force && object.hasOwnProperty(name)) return object;
  return Object.defineProperty(object, name, {configurable: true, enumerable: true, get: getter});
};

/** Adds multiple getter properties to a class prototype or object.
 * @param {Function|object} Class - The class or object to add getters to.
 * @param {Record<string, Function>} getters - An object mapping property names to getter functions.
 * @param {boolean} [force] - If true, overwrite existing properties.
 */
export const addGetters = (Class, getters, force) => {
  for (const [name, value] of Object.entries(getters)) {
    addGetter(Class, name, value, force);
  }
};

/** Adds an alias property that mirrors an existing property descriptor.
 * @param {Function|object} Class - The class or object to add the alias to.
 * @param {string} name - The new alias name.
 * @param {string} oldName - The existing property name to alias.
 * @param {boolean} [force] - If true, overwrite existing properties.
 * @returns {object} The modified prototype or object.
 */
export const addAlias = (Class, name, oldName, force) => {
  const object = Class.prototype || Class;
  if (!force && object.hasOwnProperty(name)) return object;
  const descriptor = Object.getOwnPropertyDescriptor(object, oldName);
  if (!descriptor) return object;
  return Object.defineProperty(object, name, descriptor);
};

/** Adds multiple alias properties to a class prototype or object.
 * @param {Function|object} Class - The class or object to add aliases to.
 * @param {Record<string, string>} aliases - An object mapping new names to existing property names.
 * @param {boolean} [force] - If true, overwrite existing properties.
 */
export const addAliases = (Class, aliases, force) => {
  for (const [name, oldName] of Object.entries(aliases)) {
    addAlias(Class, name, oldName, force);
  }
};
