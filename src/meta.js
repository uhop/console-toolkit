export const capitalize = name => (name ? name[0].toUpperCase() + name.substring(1).toLowerCase() : name);

export const toCamelCase = names =>
  names.map((name, index) => (index ? capitalize(name) : name.toLowerCase())).join('');
export const fromCamelCase = name => name.split(/(?=[A-Z])/g);

export const toPascalCase = names => names.map(name => capitalize(name)).join('');
export const fromPascalCase = name => name.split(/(?=[A-Z])/g);

export const toAllCapsSnakeCase = names => names.map(name => name.toUpperCase()).join('_');
export const toSnakeCase = names => names.map(name => name.toLowerCase()).join('_');
export const fromSnakeCase = name => name.split('_');

export const toKebabCase = names => names.map(name => name.toLowerCase()).join('-');
export const fromKebabCase = name => name.split('-');

export const addGetter = (Class, name, getter, force) => {
  const object = Class.prototype || Class;
  if (!force && object.hasOwnProperty(name)) return object;
  return Object.defineProperty(object, name, {configurable: true, enumerable: true, get: getter});
};

export const addAlias = (Class, name, oldName, force) => {
  const object = Class.prototype || Class;
  if (!force && object.hasOwnProperty(name)) return object;
  const descriptor = Object.getOwnPropertyDescriptor(object, oldName);
  if (!descriptor) return object;
  return Object.defineProperty(object, name, descriptor);
};
