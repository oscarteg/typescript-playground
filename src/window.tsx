import React from "react";

type User = Readonly<{
  name: string;
}>;

const user: User = {
  name: "John",
};

// const headTypes = Object.freeze({
//   "Content-Type": "application/json",
// });

test();

// const test = () => "testin";

function test() {
  return null;
}

type Props = {
  dataOptions: Record<`data-${string}`, string>;
};

function Foo(props: any) {
  return <div></div>;
}

function testDestructuring({ foo = "" }) {
  console.log(foo || "testin");

  console.log(foo);
}

testDestructuring({});
testDestructuring({ foo: null });

window._privacy.push([
  "onTcString",
  function () {
    (tcString) => console.log(tcString);
  },
]);

export {};
