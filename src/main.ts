type FormValues = Record<string, string | Record<string, string>>;

const test: FormValues = {};

const test2: FormValues = {
  name: "Oscar",
};

const test3: FormValues = {
  name: "Oscar",
};

const test4: FormValues = {
  name: "Oscar",
  adres: {
    straat: "",
  },
};

interface Adres {
  adress: string;
}

const array = [undefined, "oscar"];

// predicate == funtie / methode

console.log(array.every((value) => Boolean(value)));
