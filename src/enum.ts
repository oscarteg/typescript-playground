// Enums as bit mask
const enum Traits {
  None = 0,
  Friendly = 1 << 0, // 0001
  Mean = 1 << 1, // 0010
  Funny = 1 << 2, // 0100
  Boring = 1 << 3, // 1000
  All = ~(0 << 4), // 1111
}

/* const traits = Traits.Mean; */
const traits = Traits.Mean | Traits.Funny; // (0010 | 0100) === 0110

if ((traits & Traits.Mean) === Traits.Mean) {
  console.log(":(");
}

enum Foo {
  Bar = "bar",
  Baz = "baz",
}

console.log("test", Foo.Bar);

// enum Us {
//   Idris = "idris",
//   Robin = "robin",
//   Oscar = "oscar",
// }
//

type Us = "idris" | "robin" | "oscar";

declare function testUs(us: Us): undefined;

const apiResponse = {
  id: "patrick",
} as const;

function testFoo(foo: Foo): Foo {
  return Foo.Bar;
}

testFoo(Foo.Bar);

function toEnumFoo(str: string): Foo {
  switch (str) {
    case "bar":
      return Foo.Bar;
    case "baz":
      return Foo.Baz;
    default:
      throw Error("Invalid enum value");
  }
}

const paths = {
  home: "/",
  user: "/users",
  usersId: (id: string) => `/users/${id}`,
} as const;

const homePath = paths.home;

export {};
