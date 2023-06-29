import { scope, type } from "arktype";
// Difference Arktype and Zod
// https://gist.github.com/ssalbdivad/d60d876ab6486adc97e38e3f6916e93f

const user = type({
  name: "string",
  device: {
    platform: "'android'|'ios'",
    "version?": "number",
  },
});

// Hover to infer...
type User = typeof user.infer;
//   ^?
//

const climate = scope({
  rainforst: {
    climate: "'wet'",
    isRainForest: "true",
    color: "'green'",
  },
});

type Climate = typeof climate.infer;
//   ^?

// Scopes are collections of types that can reference each other.

export const types = scope({
  person: {
    name: "string",
    address: {
      street: "string",
    },
  },

  product: {
    name: "string",
    price: "number",
  },

  order: {
    products: "product[]",
  },
}).compile();

type Product = typeof types.product.infer;
//   ^?

type Person = typeof types.person.infer;
//   ^?

const { data, problems } = types.person({
  name: "Oscar",
  address: {
    street: "123 Main St",
  },
});

console.log(data);
console.error(problems);
