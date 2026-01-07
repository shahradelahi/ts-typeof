import { describe, expect, it } from 'vitest';

import { typeOf } from '.';

function getArguments() {
  // eslint-disable-next-line prefer-rest-params
  return arguments;
}

function* gen() {}
async function* asyncGen() {}

const matrix = [
  // --- Primitives ---
  { label: 'undefined', value: undefined, expected: 'undefined' },
  { label: 'null', value: null, expected: 'null' },
  { label: 'boolean (true)', value: true, expected: 'boolean' },
  { label: 'boolean (false)', value: false, expected: 'boolean' },
  { label: 'string', value: 'hello', expected: 'string' },
  { label: 'number (int)', value: 123, expected: 'number' },
  { label: 'number (float)', value: 12.34, expected: 'number' },
  { label: 'number (NaN)', value: NaN, expected: 'number' },
  { label: 'number (Infinity)', value: Infinity, expected: 'number' },
  { label: 'symbol', value: Symbol('foo'), expected: 'symbol' },
  { label: 'bigint', value: BigInt(123), expected: 'bigint' },

  // --- Objects & Collections ---
  { label: 'object (plain)', value: { a: 1 }, expected: 'object' },
  { label: 'object (null prototype)', value: Object.create(null), expected: 'object' },
  { label: 'array', value: [1, 2, 3], expected: 'array' },
  { label: 'date', value: new Date(), expected: 'date' },
  { label: 'regexp', value: /abc/gi, expected: 'regexp' },
  { label: 'error', value: new Error('oops'), expected: 'error' },
  { label: 'typeerror', value: new TypeError('oops'), expected: 'error' }, // Specific errors return 'error' based on isError check
  { label: 'map', value: new Map(), expected: 'map' },
  { label: 'set', value: new Set(), expected: 'set' },
  { label: 'weakmap', value: new WeakMap(), expected: 'weakmap' },
  { label: 'weakset', value: new WeakSet(), expected: 'weakset' },
  { label: 'promise', value: Promise.resolve(), expected: 'promise' },

  // --- Functions ---
  { label: 'function (arrow)', value: () => {}, expected: 'function' },
  { label: 'function (standard)', value: function () {}, expected: 'function' },
  { label: 'async function', value: async () => {}, expected: 'asyncfunction' },
  { label: 'generator function', value: gen, expected: 'generatorfunction' },
  { label: 'async generator function', value: asyncGen, expected: 'asyncgeneratorfunction' },

  // --- Iterators & Generators ---
  { label: 'generator object', value: gen(), expected: 'generator' },
  { label: 'async generator object', value: asyncGen(), expected: 'asyncgenerator' },
  { label: 'map iterator', value: new Map().entries(), expected: 'mapiterator' },
  { label: 'set iterator', value: new Set().values(), expected: 'setiterator' },
  { label: 'array iterator', value: [][Symbol.iterator](), expected: 'arrayiterator' },
  { label: 'string iterator', value: ''[Symbol.iterator](), expected: 'stringiterator' },

  // --- Typed Arrays ---
  { label: 'int8array', value: new Int8Array(0), expected: 'int8array' },
  { label: 'uint8array', value: new Uint8Array(0), expected: 'uint8array' },
  { label: 'uint8clampedarray', value: new Uint8ClampedArray(0), expected: 'uint8clampedarray' },
  { label: 'int16array', value: new Int16Array(0), expected: 'int16array' },
  { label: 'uint16array', value: new Uint16Array(0), expected: 'uint16array' },
  { label: 'int32array', value: new Int32Array(0), expected: 'int32array' },
  { label: 'uint32array', value: new Uint32Array(0), expected: 'uint32array' },
  { label: 'float32array', value: new Float32Array(0), expected: 'float32array' },
  { label: 'float64array', value: new Float64Array(0), expected: 'float64array' },
  { label: 'bigint64array', value: new BigInt64Array(0), expected: 'bigint64array' },
  { label: 'biguint64array', value: new BigUint64Array(0), expected: 'biguint64array' },

  // --- Special Objects ---
  { label: 'arguments', value: getArguments(), expected: 'arguments' },

  // --- Classes ---
  {
    label: 'class instance (custom)',
    value: new (class MyClass {})(),
    expected: 'myclass',
  },
];

if (typeof Buffer !== 'undefined') {
  matrix.push({
    label: 'buffer',
    value: Buffer.from('abc'),
    expected: 'buffer',
  });
}

describe('typeOf Matrix Test', () => {
  it.each(matrix)('should identify $label as "$expected"', ({ value, expected }) => {
    expect(typeOf(value)).toBe(expected);
  });
});
