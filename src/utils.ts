export const nameOf = Object.prototype.toString;

export function ctorName(v: unknown): string | null {
  try {
    const c = (v as any)?.constructor;
    return typeof c === 'function' && c.name ? c.name : null;
  } catch {
    return null;
  }
}

export function isBuffer(v: unknown): boolean {
  try {
    // node & polyfills
    const g: any = globalThis;
    if (g?.Buffer && typeof g.Buffer.isBuffer === 'function') return g.Buffer.isBuffer(v);
    // fallback: detect Uint8Array-like Node Buffer shim
    return !!(
      v &&
      typeof (v as any).readInt8 === 'function' &&
      typeof (v as any).slice === 'function'
    );
  } catch {
    return false;
  }
}

export function isArguments(v: unknown): boolean {
  try {
    if (!v || typeof v !== 'object') return false;
    // common reliable check
    if (nameOf.call(v) === '[object Arguments]') return true;
    // older environments: ducktype w/ try/catch
    return typeof (v as any).length === 'number' && typeof (v as any).callee === 'function';
  } catch {
    return false;
  }
}

export function isDate(v: unknown): boolean {
  if (v instanceof Date) return true;
  return !!(
    v &&
    typeof (v as any).toDateString === 'function' &&
    typeof (v as any).getDate === 'function' &&
    typeof (v as any).setDate === 'function'
  );
}

export function isError(v: unknown): boolean {
  if (v instanceof Error) return true;
  return !!(
    v &&
    typeof (v as any).message === 'string' &&
    (v as any).constructor &&
    typeof (v as any).constructor.stackTraceLimit === 'number'
  );
}

export function isRegexp(v: unknown): boolean {
  if (v instanceof RegExp) return true;
  return !!(
    v &&
    typeof (v as any).flags === 'string' &&
    typeof (v as any).ignoreCase === 'boolean' &&
    typeof (v as any).multiline === 'boolean' &&
    typeof (v as any).global === 'boolean'
  );
}

export function isGeneratorFn(fn: unknown): boolean {
  return ctorName(fn) === 'GeneratorFunction';
}

export function isAsyncFn(fn: unknown): boolean {
  return ctorName(fn) === 'AsyncFunction';
}

export function isAsyncGeneratorFn(fn: unknown): boolean {
  return ctorName(fn) === 'AsyncGeneratorFunction';
}

export function isGeneratorObj(v: unknown): boolean {
  return !!(
    v &&
    typeof (v as any).next === 'function' &&
    typeof (v as any).throw === 'function' &&
    typeof (v as any).return === 'function'
  );
}
