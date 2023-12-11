function foo(bar: boolean): () => void {
  if (bar) {
    return () => {
      console.log("bar");
    };
  }
}

const execute = foo(false);

execute();

export {};
