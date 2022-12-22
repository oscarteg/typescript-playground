import { StrictExtract } from "ts-essentials";

interface Paragraph {
  type: "paragraph";
  paragraph: {
    rich_text: string;
    color: string;
  };
}

interface Heading {
  type: "heading";
  heading: {
    rich_text: string;
    color: string;
  };
}
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
