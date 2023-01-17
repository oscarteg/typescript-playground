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

type GetElementType<T extends any[]> = T extends Array<infer U> ? U : never;

type UserFoo = typeof users[number];

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
