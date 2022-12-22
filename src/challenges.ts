import type { Expect, Equal } from "./type-utils";

// PickByType
interface Model {
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

type _ = [
  Expect<
    Equal<
      PickByType<Model, boolean>,
      { isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>
];
