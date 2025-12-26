import { typeOf } from '@se-oss/typeof';
import kindOfLib from 'kind-of';
// @ts-expect-error TS7016: Could not find a declaration file for module type-of.
import typeOfLib from 'type-of';
// @ts-expect-error TS7016: Could not find a declaration file for module typeof.
import typeofLib from 'typeof';
import { bench, describe } from 'vitest';

const inputs = {
  undefined: undefined,
  null: null,
  boolean: true,
  number: 123,
  string: 'hello',
  symbol: Symbol('test'),
  array: [1, 2, 3],
  object: { a: 1 },
  date: new Date(),
  regexp: /abc/g,
  function: () => {},
  buffer: Buffer.from('abc'),
  map: new Map(),
  set: new Set(),
  weakmap: new WeakMap(),
  weakset: new WeakSet(),
  int8array: new Int8Array(),
  promise: Promise.resolve(),
};

describe('Benchmarks', () => {
  describe('Summary (all types)', () => {
    bench('@se-oss/typeof', () => {
      for (const val of Object.values(inputs)) {
        typeOf(val);
      }
    });

    bench('kind-of', () => {
      for (const val of Object.values(inputs)) {
        kindOfLib(val);
      }
    });

    bench('type-of', () => {
      for (const val of Object.values(inputs)) {
        typeOfLib(val);
      }
    });

    bench('typeof', () => {
      for (const val of Object.values(inputs)) {
        typeofLib(val);
      }
    });
  });

  describe('Fast paths (primitives)', () => {
    const primitives = [undefined, null, true, 123, 'hello'];
    bench('@se-oss/typeof', () => {
      for (const val of primitives) {
        typeOf(val);
      }
    });

    bench('kind-of', () => {
      for (const val of primitives) {
        kindOfLib(val);
      }
    });

    bench('type-of', () => {
      for (const val of primitives) {
        typeOfLib(val);
      }
    });

    bench('typeof', () => {
      for (const val of primitives) {
        typeofLib(val);
      }
    });
  });

  describe('Complex types (objects, dates, etc.)', () => {
    const complex = [inputs.object, inputs.date, inputs.regexp, inputs.array, inputs.buffer];
    bench('@se-oss/typeof', () => {
      for (const val of complex) {
        typeOf(val);
      }
    });

    bench('kind-of', () => {
      for (const val of complex) {
        kindOfLib(val);
      }
    });

    bench('type-of', () => {
      for (const val of complex) {
        typeOfLib(val);
      }
    });

    bench('typeof', () => {
      for (const val of complex) {
        typeofLib(val);
      }
    });
  });
});
