enum ResultKind {
  OK = "Ok",
  ERR = "Err",
}

export type Result<T, E> = Ok<T> | Err<E>;

type ResultBase<A, E> = {
  kind: ResultKind;
  map: <B>(fn: (_: A) => B) => Result<B, E>;
  bind: <B>(fn: (_: A) => Result<B, E>) => Result<B, E>;
  match: <B>(obj: { ok: (_: A) => B; err: (_: E) => B }) => B;
};

export type Ok<A> = Readonly<
  ResultBase<A, never> & { kind: ResultKind.OK; value: A }
>;

export function ok<A>(a: A): Ok<A> {
  return {
    kind: ResultKind.OK,
    value: a,
    map(fn) {
      return ok(fn(this.value));
    },
    bind(fn) {
      return fn(this.value);
    },
    match({ ok }) {
      return ok(this.value);
    },
  };
}

export type Err<E> = Readonly<
  ResultBase<never, E> & { kind: ResultKind.ERR; error: E }
>;

export function err<E>(e: E): Err<E> {
  return {
    kind: ResultKind.ERR,
    error: e,
    map() {
      return this;
    },
    bind() {
      return this;
    },
    match({ err }) {
      return err(this.error);
    },
  };
}

// Assume you have the Result, Ok, and Err types and functions defined as in your code

// A function that performs division and returns a Result
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err("Division by zero");
  }

  return ok(a / b);
}

// Example usage
const result1: Result<number, string> = divide(10, 2); // Ok
const result2: Result<number, string> = divide(8, 0); // Err

// Pattern matching
result1.match({
  ok: (value) => console.log(`Result: ${value}`),
  err: (error) => console.error(`Error: ${error}`),
});

result2.match({
  ok: (value) => console.log(`Result: ${value}`),
  err: (error) => console.error(`Error: ${error}`),
});
