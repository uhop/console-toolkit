import test from 'tape-six';

import * as meta from '../src/meta.js';

test('Meta', t => {
  t.test('Capitalize', t => {
    t.equal(meta.capitalize('one'), 'One');
    t.equal(meta.capitalize('TWO'), 'Two');
    t.equal(meta.capitalize('tHREE'), 'Three');
    t.equal(meta.capitalize('fOuR'), 'Four');
  });

  t.test('Camel case', t => {
    t.deepEqual(meta.fromCamelCase('oneTwoThree'), ['one', 'Two', 'Three']);
    t.equal(meta.toCamelCase(['one', 'two', 'THREE', 'fOuR']), 'oneTwoThreeFour');
  });

  t.test('Pascal case', t => {
    t.deepEqual(meta.fromPascalCase('OneTwoThree'), ['One', 'Two', 'Three']);
    t.equal(meta.toPascalCase(['one', 'two', 'THREE', 'fOuR']), 'OneTwoThreeFour');
  });

  t.test('Snake case', t => {
    t.deepEqual(meta.fromSnakeCase('One_Two_Three'), ['One', 'Two', 'Three']);
    t.equal(meta.toSnakeCase(['one', 'two', 'THREE', 'fOuR']), 'one_two_three_four');
    t.equal(meta.toAllCapsSnakeCase(['one', 'two', 'THREE', 'fOuR']), 'ONE_TWO_THREE_FOUR');
  });

  t.test('Kebab case', t => {
    t.deepEqual(meta.fromKebabCase('One-Two-Three'), ['One', 'Two', 'Three']);
    t.equal(meta.toKebabCase(['one', 'two', 'THREE', 'fOuR']), 'one-two-three-four');
  });

  t.test('Add getters', t => {
    class X {
      constructor() {
        this.a = 42;
      }
      get b() {
        return 1984;
      }
    }

    const x = new X();
    t.equal(x.a, 42);
    t.equal(x.b, 1984);
    t.equal(x.c, undefined);

    meta.addGetters(X, {
      b: function () {
        return 'no!';
      },
      c: function () {
        return 2042;
      }
    });

    t.equal(x.a, 42);
    t.equal(x.b, 1984);
    t.equal(x.c, 2042);

    meta.addGetters(
      X,
      {
        b: function () {
          return 'no!';
        }
      },
      true
    );

    t.equal(x.a, 42);
    t.equal(x.b, 'no!');
    t.equal(x.c, 2042);
  });

  t.test('Add aliases', t => {
    class X {
      constructor() {
        this.a = 42;
      }
      get b() {
        return 1984;
      }
      get c() {
        return 2042;
      }
    }

    const x = new X();
    t.equal(x.a, 42);
    t.equal(x.b, 1984);
    t.equal(x.c, 2042);
    t.equal(x.d, undefined);

    meta.addAliases(X, {c: 'b', d: 'b'});

    t.equal(x.a, 42);
    t.equal(x.b, 1984);
    t.equal(x.c, 2042);
    t.equal(x.d, 1984);

    meta.addAliases(X, {b: 'c'}, true);

    t.equal(x.a, 42);
    t.equal(x.b, 2042);
    t.equal(x.c, 2042);
    t.equal(x.d, 1984);
  });
});
