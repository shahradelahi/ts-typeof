/**
 * Possible return values of the `typeOf` function.
 */
export type Type =
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'string'
  | 'number'
  | 'symbol'
  | 'generatorfunction'
  | 'function'
  | 'array'
  | 'buffer'
  | 'arguments'
  | 'date'
  | 'error'
  | 'regexp'
  | 'promise'
  | 'weakmap'
  | 'weakset'
  | 'map'
  | 'set'
  | 'int8array'
  | 'uint8array'
  | 'uint8clampedarray'
  | 'int16array'
  | 'uint16array'
  | 'int32array'
  | 'uint32array'
  | 'float32array'
  | 'float64array'
  | 'generator'
  | 'mapiterator'
  | 'setiterator'
  | 'stringiterator'
  | 'arrayiterator'
  | 'object'
  | (string & {});

/**
 * Returns the corresponding {@link Type} of the given type `T`.
 */
export type TypeOf<T> = T extends undefined
  ? 'undefined'
  : T extends null
    ? 'null'
    : T extends boolean
      ? 'boolean'
      : T extends string
        ? 'string'
        : T extends number
          ? 'number'
          : T extends symbol
            ? 'symbol'
            : T extends (...args: any[]) => Generator
              ? 'generatorfunction'
              : T extends (...args: any[]) => any
                ? 'function'
                : T extends any[]
                  ? 'array'
                  : T extends Date
                    ? 'date'
                    : T extends RegExp
                      ? 'regexp'
                      : T extends Error
                        ? 'error'
                        : T extends Promise<any>
                          ? 'promise'
                          : T extends Map<any, any>
                            ? 'map'
                            : T extends Set<any>
                              ? 'set'
                              : T extends WeakMap<any, any>
                                ? 'weakmap'
                                : T extends WeakSet<any>
                                  ? 'weakset'
                                  : T extends Int8Array
                                    ? 'int8array'
                                    : T extends Uint8Array
                                      ? T extends { readInt8: any }
                                        ? 'buffer'
                                        : 'uint8array'
                                      : T extends Uint8ClampedArray
                                        ? 'uint8clampedarray'
                                        : T extends Int16Array
                                          ? 'int16array'
                                          : T extends Uint16Array
                                            ? 'uint16array'
                                            : T extends Int32Array
                                              ? 'int32array'
                                              : T extends Uint32Array
                                                ? 'uint32array'
                                                : T extends Float32Array
                                                  ? 'float32array'
                                                  : T extends Float64Array
                                                    ? 'float64array'
                                                    : T extends IArguments
                                                      ? 'arguments'
                                                      : T extends IterableIterator<any>
                                                        ? 'generator'
                                                        : T extends object
                                                          ? 'object'
                                                          : Type;
