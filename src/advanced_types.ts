import { Join } from "type-fest";
type MyType1<T> = T extends infer R ? R : never;
type T1 = MyType1<{ b: string }>;

type ToArray<Type> = Type extends any ? Type[] : never;

const users = [
  {
    id: 2,
    name: "Oscar",
  },
  {
    id: 3,
    name: "Stefan",
  },
];

const translation = {
  viewName: {
    componentName: {
      title: "translated title",
    },
  },
};

type GetElementType<T extends any[]> = T extends Array<infer U> ? U : never;

type UserFoo = (typeof users)[number];

type Point = {
  x: number;
  y: number;
};

type P = keyof Point;

const keyOf = "x";

const x: Point = {
  x: 3,
  y: 9,
};

type User = {
  id: number;
  name: string;
};

type NotAllowed = any[] | Function;
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type BadChars = "." | "-" | "+" | " " | "e" | "E";

type ExtractDottable<K extends PropertyKey> = K extends string
  ? string extends K
    ? never
    : // eslint-disable-next-line unused-imports/no-unused-vars-ts
    K extends `${Digit}${infer _}` | `${infer _}${BadChars}${infer _}`
    ? never
    : K
  : never;

type DottablePaths<T, P extends Prev[number] = 10> =
  | []
  | ([P] extends [never]
      ? never
      : T extends NotAllowed
      ? never
      : T extends object
      ? {
          [K in ExtractDottable<keyof T>]: [K, ...DottablePaths<T[K], Prev[P]>];
        }[ExtractDottable<keyof T>]
      : never);

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Translation = Join<PathsToStringProps<typeof translation>, ".">;
//    ^?

const t: Translation = "viewName.componentName.title";

type TestDottable = DottablePaths<User>;
//    ^?
