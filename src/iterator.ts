//  Specifically, an iterator is any object which implements the Iterator protocol by having a next() method that returns an object with two properties:
const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const nextIndex = 0;
const iterationCount = 0;
const end = 100;

const rangeIterator = {
  [Symbol.iterator]() {
    let counter = 0;
    return {
      next: () => {
        return {
          done: counter >= 5,
          value: counter++,
        };
      },
    };
  },
  // next() {
  //   let result;
  //   if (nextIndex < end) {
  //     result = { value: nextIndex, done: false };
  //     nextIndex += step;
  //     iterationCount++;
  //     return result;
  //   }
  //   return { value: iterationCount, done: true };
  // },
};

for (const num of rangeIterator) {
  console.log(num);
}

function* fibonacci(n: number, current = 0, next = 1): Generator<number> {
  if (n === 0) {
    return current;
  }
  yield current;
  yield* fibonacci(n - 1, next, current + next);
}

const sequence = fibonacci(15);

// for (const num of myIterable) {
//   console.log(num);
// }
//
// for (const value of sequence) {
//   console.log(value);
// }

// const bar = () => true


// implicit return
