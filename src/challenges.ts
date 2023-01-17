import type { Expect, Equal } from "./type-utils";

// PickByType
type Model = {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

/* type PickByType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T]; */

type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: U;
};

type PickByTypeCases = [
  Expect<
    Equal<
      PickByType<Model, boolean>,
      { isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>
];

type First<T extends any[]> = T extends [infer R, ...any[]] ? R : never;

type FirstCases = [
  Expect<Equal<First<[1, 2, 3]>, 1>>,
  Expect<Equal<First<[() => number, 2, 3]>, () => number>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

const func = (a: number, b: number): number => a + b;

type Foo = ReturnType<typeof func>;

type MyParams<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

type Bar = MyParams<typeof func>;

type MyPick<Obj, Key extends keyof Obj> = {
  [K in Key]: Obj[K];
};

type Todo = {
  title: string;
  description: string;
  completed: boolean;
}

type Expected = {
  title: string;
}

type MyPickCases = [
  Expect<Equal<Expected, MyPick<Todo, "title">>>,
  Expect<Equal<Expected, MyPick<Todo, "title" | "description">>>
];

type NonNullish<T> = Exclude<T, null | undefined> & NonNullable<T>;
