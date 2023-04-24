export function overwrite<
  O extends Record<string, unknown>,
  R extends Record<keyof O, V>,
  V = any
>(obj: O, value: V): R {
  return Object.fromEntries(Object.keys(obj).map((key) => [key, value])) as R;
}

const foo = overwrite({ a: 1, b: 2, c: 3 }, "foo");
//    ^?
