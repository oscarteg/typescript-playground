// ============= Test Cases =============
import type { Equal, Expect, ExpectExtends } from "./type-utils";

// PickByType
type Model = {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
};

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

type MyPick<O, Key extends keyof O> = {
  [K in Key]: O[K];
};

// We can use {} instead of Record<string, never> because Record<string, never> is a subtype of {}
type MyPick2<T extends {}, K extends keyof T> = {
  [U in K]: T[U];
};

type Todo = {
  title: string;
  description: string;
  completed: boolean;
};

type Expected = {
  title: string;
};

type MyPickCases = [Expect<Equal<Expected, MyPick<Todo, "title">>>];

type NonNullish<T> = Exclude<T, null | undefined> & NonNullable<T>;

type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type Last<T> = T extends [...any[], infer R] ? R : never;

type LastCases = [
  Expect<Equal<Last<[1, 2, 3]>, 3>>,
  Expect<Equal<Last<[() => number, 2, 3]>, 3>>,
  Expect<Equal<Last<[undefined]>, undefined>>
];

type Cat = {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
};

type Dog = {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
};

type Animal = Cat | Dog;

type Extract<T, U> = T extends U ? T : never;

type LookUp<U extends { type: string }, T extends U["type"]> = Extract<
  U,
  { type: T }
>;

type A1 = LookUp<Animal, "dog">;
type B1 = Dog;
type C1 = Expect<Equal<A1, B1>>;

type A2 = LookUp<Animal, "cat">;
type B2 = Cat;
type C2 = Expect<Equal<A2, B2>>;

type Mutable<T extends Record<string, unknown>> = {
  -readonly [P in keyof T]: T[P];
};

type L = Mutable<{
  [Symbol.iterator]: (...args: any[]) => any;
}>;

type ObjectEntries<T, U extends keyof T = keyof T> = U extends unknown
  ? [U, T[U] extends infer F | undefined ? F : T[U]]
  : [];

type A = ObjectEntries<{ foo: "bar"; baz: 42 }>;
type B = ["foo", "bar"] | ["baz", 42];
type C = Expect<Equal<A, B>>;

// enum Anus {
//   A = "A",
// }

const Anus = {
  A: "A",
  B: "B",
} as const;

type Kont = (typeof Anus)[keyof typeof Anus];

declare function Foo(a: Kont): void;

Foo("A");

const ref = {
  count: 1,
  person: {
    name: "cattchen",
    age: 22,
    books: ["book1", "book2"],
    pets: [
      {
        type: "cat",
      },
    ],
  },
};

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, "name" | "age">>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number;
        person: { name: string; age: number };
      }>,
      "refCount" | "person" | "person.name" | "person.age"
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "count">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.name">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.age">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.0">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.1">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books[0]">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.[0]">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets.0.type">>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "notExist">, false>>,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.notExist">, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.name.">, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, ".person.name">, false>
  >,
  Expect<
    Equal<
      ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets.[0]type">,
      false
    >
  >
];

// Don't understand this right now
// But very usefull type
type GenNode<
  K extends string | number,
  IsRoot extends boolean
> = IsRoot extends true
  ? `${K}`
  : `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never);

type ObjectKeyPaths<
  T extends object,
  IsRoot extends boolean = true,
  K extends keyof T = keyof T
> = K extends string | number
  ?
      | GenNode<K, IsRoot>
      | (T[K] extends object
          ? `${GenNode<K, IsRoot>}${ObjectKeyPaths<T[K], false>}`
          : never)
  : never;
