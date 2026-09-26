import test from 'tape-six';
import {readdirSync, statSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

import {freezeDeep} from '../src/meta.js';
import style, {Style} from '../src/style.js';

const srcDir = fileURLToPath(new URL('../src', import.meta.url));
const walk = dir =>
  readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.js') ? [path] : [];
  });

const isDeepFrozen = (value, seen = new Set()) => {
  if (!value || typeof value !== 'object' || seen.has(value)) return true;
  seen.add(value);
  return Object.isFrozen(value) && Reflect.ownKeys(value).every(key => isDeepFrozen(value[key], seen));
};

test('Frozen objects', async t => {
  await t.test('freezeDeep()', t => {
    const inner = {list: [1, {x: 2}]},
      value = {inner, name: 'n'};
    value.self = value;

    t.equal(freezeDeep(value), value, 'returns its argument');
    t.ok(isDeepFrozen(value), 'nested objects and arrays, with a cycle');
    t.equal(freezeDeep(5), 5, 'primitives pass through');
    const fn = () => {};
    freezeDeep(fn);
    t.notOk(Object.isFrozen(fn), 'functions are left alone');
  });

  await t.test('Every exported shared object is deep-frozen', async t => {
    const unfrozen = [];
    let count = 0;
    for (const file of walk(srcDir)) {
      const module = await import(file);
      for (const [name, value] of Object.entries(module)) {
        if (!value || typeof value !== 'object') continue;
        if (Object.getPrototypeOf(value) !== Object.prototype && !Array.isArray(value)) continue;
        ++count;
        if (!isDeepFrozen(value)) unfrozen.push(file.slice(srcDir.length + 1) + ': ' + name);
      }
    }
    t.ok(count > 100, `found ${count} exported objects`);
    t.deepEqual(unfrozen, [], 'add new presets and tables to freezeDeep([...]) in their module');
  });

  await t.test('Style objects', t => {
    for (const object of [
      style,
      style.red,
      style.bright,
      style.bright.red,
      style.bg,
      style.bg.hex(0x336699),
      style.reset
    ]) {
      t.ok(Object.isFrozen(object));
    }
    t.throws(() => {
      style.bright.extra = 1;
    }, 'writing to a view throws');

    class MyStyle extends Style {
      constructor() {
        super({});
        this.extra = 1;
      }
    }
    t.equal(new MyStyle().extra, 1, 'a subclass can set its own fields');
  });
});
