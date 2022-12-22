interface Room {
  readonly id: number;
}

export class User {
  readonly name: string;
}

type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};

function mutateImmutable(input: Immutable<typeof a>): void {
  input.d.e.f.h.boom = "respek"; // Cannot assign to 'boom' because it is a read-only property.ts(2540)
}

const foo = { a: 23 } as const;

foo.a = 34;

mutateImmutable({
  a: 22,
  b: 33,
  c: [78, 99],
  d: { e: { f: { g: true, h: { boom: "selecta" } } } },
} as const);

const a = {
  b: 33,
  c: [78, 99],
  d: { e: { f: { g: true, h: { boom: "selecta" } } } },
} as const;

a.d.e.f.h.boom = "respek";
