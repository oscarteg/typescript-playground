import { expect, describe, test } from "bun:test";
import { deepMerge } from "./merge";

describe("merge", () => {
  test("simple", () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  test("nested", () => {
    expect(
      deepMerge(
        {
          a: 1,
          b: { c: 2 },
        },
        { b: { c: 5 } }
      )
    ).toEqual({
      a: 1,
      b: { c: 5 },
    });
  });

  test("nested overwrite", () => {
    expect(
      deepMerge(
        {
          a: 1,
          b: {
            c: 2,
            d: {
              e: [1, 2, 3],
            },
          },
        },
        { b: { d: 5 } }
      )
    ).toEqual({
      a: 1,
      b: { c: 2, d: 5 },
    });
  });

  test("nested overwrite", () => {
    expect(
      deepMerge(
        {
          a: 1,
          b: {
            c: 2,
            d: {
              e: [1, 2, 3],
            },
          },
        },
        { b: { d: 5 } }
      )
    ).toEqual({
      a: 1,
      b: { c: 2, d: 5 },
    });
  });
});
