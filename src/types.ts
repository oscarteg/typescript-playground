const array = [1, 2, 3, 4, 5];

type Array = [number, ...number[]];

function foo(foo: Array) {
  foo[0].toString();
}
