import type { TypeOf } from './typings';
import {
  ctorName,
  isArguments,
  isAsyncFn,
  isAsyncGeneratorFn,
  isBuffer,
  isDate,
  isError,
  isGeneratorFn,
  isGeneratorObj,
  isRegexp,
  nameOf,
} from './utils';

/**
 * Returns a lowercase string describing the precise runtime type of `val`.
 *
 * This function provides a more granular type detection than the built-in `typeof` operator,
 * handling primitives, built-ins (Date, RegExp, Map, etc.), and environment-specific
 * types like Node.js Buffers.
 *
 * @template T - The type of the value being inspected.
 * @param val - The value to inspect.
 * @returns A lowercase string representing the type of the value.
 *
 * @example
 * ```ts
 * typeOf(null)              // 'null'
 * typeOf(undefined)         // 'undefined'
 * typeOf([])                // 'array'
 * typeOf(new Date())        // 'date'
 * typeOf(/abc/)             // 'regexp'
 * typeOf(async () => {})    // 'asyncfunction'
 * typeOf(Buffer.from(''))   // 'buffer'
 * ```
 */
export function typeOf<T>(val: T): TypeOf<T> {
  if (val === undefined) return 'undefined' as TypeOf<T>;
  if (val === null) return 'null' as TypeOf<T>;

  const t = typeof val;
  // fast path for primitives + function types
  switch (t) {
    case 'boolean':
      return 'boolean' as TypeOf<T>;
    case 'string':
      return 'string' as TypeOf<T>;
    case 'number':
      return 'number' as TypeOf<T>;
    case 'symbol':
      return 'symbol' as TypeOf<T>;
    case 'function': {
      if (isGeneratorFn(val)) return 'generatorfunction' as TypeOf<T>;
      if (isAsyncGeneratorFn(val)) return 'asyncgeneratorfunction' as TypeOf<T>;
      if (isAsyncFn(val)) return 'asyncfunction' as TypeOf<T>;
      return 'function' as TypeOf<T>;
    }
  }

  if (Array.isArray(val)) return 'array' as TypeOf<T>;
  if (isBuffer(val)) return 'buffer' as TypeOf<T>;
  if (isArguments(val)) return 'arguments' as TypeOf<T>;
  if (isDate(val)) return 'date' as TypeOf<T>;
  if (isError(val)) return 'error' as TypeOf<T>;
  if (isRegexp(val)) return 'regexp' as TypeOf<T>;

  const c = ctorName(val);
  if (c) {
    switch (c) {
      case 'Symbol':
        return 'symbol' as TypeOf<T>;
      case 'Promise':
        return 'promise' as TypeOf<T>;
      case 'WeakMap':
        return 'weakmap' as TypeOf<T>;
      case 'WeakSet':
        return 'weakset' as TypeOf<T>;
      case 'Map':
        return 'map' as TypeOf<T>;
      case 'Set':
        return 'set' as TypeOf<T>;
      case 'Int8Array':
        return 'int8array' as TypeOf<T>;
      case 'Uint8Array':
        return 'uint8array' as TypeOf<T>;
      case 'Uint8ClampedArray':
        return 'uint8clampedarray' as TypeOf<T>;
      case 'Int16Array':
        return 'int16array' as TypeOf<T>;
      case 'Uint16Array':
        return 'uint16array' as TypeOf<T>;
      case 'Int32Array':
        return 'int32array' as TypeOf<T>;
      case 'Uint32Array':
        return 'uint32array' as TypeOf<T>;
      case 'Float32Array':
        return 'float32array' as TypeOf<T>;
      case 'Float64Array':
        return 'float64array' as TypeOf<T>;
    }
  }

  if (isGeneratorObj(val)) {
    if (nameOf.call(val) === '[object AsyncGenerator]') return 'asyncgenerator' as TypeOf<T>;
    return 'generator' as TypeOf<T>;
  }

  // fallback to Object.prototype.toString for exotic built-ins and iterators
  const name = nameOf.call(val);
  switch (name) {
    case '[object Object]':
      if (c && c !== 'Object') return c.toLowerCase().replace(/\s/g, '') as TypeOf<T>;
      return 'object' as TypeOf<T>;
    case '[object Map Iterator]':
      return 'mapiterator' as TypeOf<T>;
    case '[object Set Iterator]':
      return 'setiterator' as TypeOf<T>;
    case '[object String Iterator]':
      return 'stringiterator' as TypeOf<T>;
    case '[object Array Iterator]':
      return 'arrayiterator' as TypeOf<T>;
  }

  // final fallback: "[object Foo]" -> "foo"
  return name.slice(8, -1).toLowerCase().replace(/\s/g, '') as TypeOf<T>;
}

export type * from './typings';
export default typeOf;
