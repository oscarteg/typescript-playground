import { Expect, Equal } from "./type-utils";

type Paragraph = {
  type: "paragraph";
  paragraph: {
    rich_text: string;
    color: string;
  };
};

type Heading = {
  type: "heading";
  heading: {
    rich_text: string;
    color: string;
  };
};
type ResponseObject = Paragraph | Heading;

// Does not work this should be a union of "heading" | "paragraph"
// How can a create a union of all the "type" properties of the ResponseObject discriminated union?
type ResponseType = ResponseObject["type"];

function foo(type: ResponseType): void {
  if (type === "paragraph") {
    console.log("paragraph");
  }

  if (type === "heading") {
    console.log("heading");
  }
}

foo("paragraph");

type StringProps<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type User = {
  id: string;
  age: number;
  address: {
    street: string;
    city: string;
    houseNumber: number;
  };
};

type C2 = Expect<Equal<StringProps<User>, { id: string }>>;

export {};
