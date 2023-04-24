// ============= Test Cases =============

import { Expect, Equal } from "./type-utils";

type A1 = Split<"Hi! How are you?", "z">;
type B1 = ["Hi! How are you?"];
type C1 = Expect<Equal<A1, B1>>;

type A2 = Split<"Hi! How are you?", " ">;
type B2 = ["Hi!", "How", "are", "you?"];
type C2 = Expect<Equal<A2, B2>>;

type A3 = Split<"Hi! How are you?", "">;
type B3 = [
  "H",
  "i",
  "!",
  " ",
  "H"
  "o",
  "w",
  " ",
  "a",
  "r",
  "e",
  " ",
  "y",
  "o",
  "u",
  "?"
];
type C3 = Expect<Equal<A3, B3>>;

type A4 = Split<"", "">;
type B4 = [];
type C4 = Expect<Equal<A4, B4>>;

type A5 = Split<"", "z">;
type B5 = [""];
type C5 = Expect<Equal<A5, B5>>;

type A6 = Split<string, "whatever">;
type B6 = string[];
type C6 = Expect<Equal<A6, B6>>;

type Split<T extends string, S extends string> = string extends T
  ? string[]
  : T extends `${infer Left}${S}${infer Right}`
  ? [Left, ...Split<Right, S>]
  : S extends ""
  ? []
  : [T];
