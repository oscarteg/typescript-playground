const user: User = {
  name: "oscar",
};

type User = {
  name: string;
};

// Object.values(user).forEach(([k, v]) => {
//   console.log(k, v);
// }
//
console.log(Object.entries(user));

export {};
