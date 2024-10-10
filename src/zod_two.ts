import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number({
    message: "Test",
  }),
});

type User = z.infer<typeof userSchema>;

const response = {
  name: "oscar",
  age: "asd",
};

const booleanSchema = z.preprocess((val) => {
  if (typeof val === "string") {
    return val.toLowerCase() === "true" || val === "1";
  }
  return val;
}, z.boolean());

const foo = z.string().pipe(z.coerce.boolean());

console.log(booleanSchema.parse("true"));
console.log(booleanSchema.parse("false"));
