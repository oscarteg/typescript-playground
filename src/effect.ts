import { pipe, Effect } from "effect";

const increment = (x: number) => x + 1;

const divide = (a: number, b: number): Effect.Effect<never, Error, number> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b);

// $ExpectType Effect<never, never, number>
const task1 = Effect.promise(async () => await Promise.resolve(10));
// $ExpectType Effect<never, never, number>
const task2 = Effect.promise(async () => await Promise.resolve(2));

// $ExpectType Effect<never, Error, string>
const program = pipe(
  Effect.all([task1, task2]),
  Effect.flatMap(([a, b]) => divide(a, b)),
  Effect.map((n1) => increment(n1)),
  Effect.map((n2) => `Result is: ${n2}`)
);

Effect.runPromise(program).then(console.log); // Output: "Result is: 6"

const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

const result = pipe(5, increment, double, subtractTen);

console.log(result); // Output: 2

// Flatmap
// $ExpectType Effect<never, Error, number>
const flatMappedEffect = pipe(
  Effect.succeed([10, 2]),
  Effect.flatMap(([a, b]) => divide(a, b))
);

console.log(Effect.runSync(flatMappedEffect)); // Output: 5
