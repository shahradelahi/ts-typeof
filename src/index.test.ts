import { describe, expect, expectTypeOf, it } from 'vitest';

import { typeOf } from '.';
import type { TypeOf } from './typings';

describe('typeOf', () => {
  it('should return the correct type for primitives', () => {
    expect(typeOf(undefined)).toBe('undefined');
    expectTypeOf(typeOf(undefined)).toEqualTypeOf<'undefined'>();

    expect(typeOf(null)).toBe('null');
    expectTypeOf(typeOf(null)).toEqualTypeOf<'null'>();

    expect(typeOf(true)).toBe('boolean');
    expect(typeOf(false)).toBe('boolean');
    expectTypeOf(typeOf(true)).toEqualTypeOf<'boolean'>();

    expect(typeOf(123)).toBe('number');
    expectTypeOf(typeOf(123)).toEqualTypeOf<'number'>();

    expect(typeOf('hello')).toBe('string');
    expectTypeOf(typeOf('hello')).toEqualTypeOf<'string'>();

    expect(typeOf(Symbol('test'))).toBe('symbol');
    expectTypeOf(typeOf(Symbol('test'))).toEqualTypeOf<'symbol'>();
  });

  it('should return the correct type for built-in objects', () => {
    expect(typeOf([])).toBe('array');
    expectTypeOf(typeOf([])).toEqualTypeOf<'array'>();

    expect(typeOf({})).toBe('object');
    expectTypeOf(typeOf({})).toEqualTypeOf<'object'>();

    expect(typeOf(new Date())).toBe('date');
    expectTypeOf(typeOf(new Date())).toEqualTypeOf<'date'>();

    expect(typeOf(/abc/)).toBe('regexp');
    expectTypeOf(typeOf(/abc/)).toEqualTypeOf<'regexp'>();

    expect(typeOf(new Error())).toBe('error');
    expectTypeOf(typeOf(new Error())).toEqualTypeOf<'error'>();

    expect(typeOf(new Map())).toBe('map');
    expectTypeOf(typeOf(new Map())).toEqualTypeOf<'map'>();

    expect(typeOf(new Set())).toBe('set');
    expectTypeOf(typeOf(new Set())).toEqualTypeOf<'set'>();

    expect(typeOf(new WeakMap())).toBe('weakmap');
    expectTypeOf(typeOf(new WeakMap())).toEqualTypeOf<'weakmap'>();

    expect(typeOf(new WeakSet())).toBe('weakset');
    expectTypeOf(typeOf(new WeakSet())).toEqualTypeOf<'weakset'>();

    expect(typeOf(Promise.resolve())).toBe('promise');
    expectTypeOf(typeOf(Promise.resolve())).toEqualTypeOf<'promise'>();
  });

  it('should return the correct type for functions', () => {
    expect(typeOf(() => {})).toBe('function');
    expectTypeOf(typeOf(() => {})).toEqualTypeOf<'function'>();

    expect(typeOf(function* () {})).toBe('generatorfunction');
    expectTypeOf(typeOf(function* () {})).toEqualTypeOf<'generatorfunction'>();
  });

  it('should return the correct type for typed arrays', () => {
    expect(typeOf(new Int8Array())).toBe('int8array');
    expectTypeOf(typeOf(new Int8Array())).toEqualTypeOf<'int8array'>();
    expect(typeOf(new Uint8Array())).toBe('uint8array');
    expectTypeOf(typeOf(new Uint8Array())).toEqualTypeOf<'uint8array'>();
    expect(typeOf(new Uint8ClampedArray())).toBe('uint8clampedarray');
    expectTypeOf(typeOf(new Uint8ClampedArray())).toEqualTypeOf<'uint8clampedarray'>();
    expect(typeOf(new Int16Array())).toBe('int16array');
    expectTypeOf(typeOf(new Int16Array())).toEqualTypeOf<'int16array'>();
    expect(typeOf(new Uint16Array())).toBe('uint16array');
    expectTypeOf(typeOf(new Uint16Array())).toEqualTypeOf<'uint16array'>();
    expect(typeOf(new Int32Array())).toBe('int32array');
    expectTypeOf(typeOf(new Int32Array())).toEqualTypeOf<'int32array'>();
    expect(typeOf(new Uint32Array())).toBe('uint32array');
    expectTypeOf(typeOf(new Uint32Array())).toEqualTypeOf<'uint32array'>();
    expect(typeOf(new Float32Array())).toBe('float32array');
    expectTypeOf(typeOf(new Float32Array())).toEqualTypeOf<'float32array'>();
    expect(typeOf(new Float64Array())).toBe('float64array');
    expectTypeOf(typeOf(new Float64Array())).toEqualTypeOf<'float64array'>();
  });

  it('should return "arguments" for the arguments object', () => {
    (function () {
      // eslint-disable-next-line prefer-rest-params
      expect(typeOf(arguments)).toBe('arguments');
      // eslint-disable-next-line prefer-rest-params
      expectTypeOf(typeOf(arguments)).toEqualTypeOf<'arguments'>();
    })();
  });

  it('should return "buffer" for Buffer objects (if available)', () => {
    if (typeof Buffer !== 'undefined') {
      const buf = Buffer.from('');
      expect(typeOf(buf)).toBe('buffer');
      expectTypeOf(typeOf(buf)).toEqualTypeOf<'buffer'>();
    }
  });

  it('should handle custom classes', () => {
    class MyClass {}
    expect(typeOf(new MyClass())).toBe('myclass');
    // For custom classes, it falls back to 'object' or string if inferred
    expectTypeOf(typeOf(new MyClass())).toEqualTypeOf<'object'>();
  });

  it('should return the correct type for iterators', () => {
    const map = new Map();
    expect(typeOf(map.entries())).toBe('mapiterator');

    const set = new Set();
    expect(typeOf(set.values())).toBe('setiterator');
  });

  describe('TypeOf', () => {
    it('should correctly map types', () => {
      expectTypeOf<TypeOf<string>>().toEqualTypeOf<'string'>();
      expectTypeOf<TypeOf<number>>().toEqualTypeOf<'number'>();
      expectTypeOf<TypeOf<boolean>>().toEqualTypeOf<'boolean'>();
      expectTypeOf<TypeOf<undefined>>().toEqualTypeOf<'undefined'>();
      expectTypeOf<TypeOf<null>>().toEqualTypeOf<'null'>();
      expectTypeOf<TypeOf<symbol>>().toEqualTypeOf<'symbol'>();
      expectTypeOf<TypeOf<any[]>>().toEqualTypeOf<'array'>();
      expectTypeOf<TypeOf<Date>>().toEqualTypeOf<'date'>();
      expectTypeOf<TypeOf<RegExp>>().toEqualTypeOf<'regexp'>();
      expectTypeOf<TypeOf<Error>>().toEqualTypeOf<'error'>();
      expectTypeOf<TypeOf<Promise<any>>>().toEqualTypeOf<'promise'>();
      expectTypeOf<TypeOf<Map<any, any>>>().toEqualTypeOf<'map'>();
      expectTypeOf<TypeOf<Set<any>>>().toEqualTypeOf<'set'>();
    });
  });
});
