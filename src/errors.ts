// try {
//   Promise.reject(new Error("Error message"));
// } catch (err) {
//   throw new Error("New error message", {
//     cause: { code: 1000, message: "NOTHING", err },
//   });
// }

class ApiError extends Error {
  toString() {
    return `FUCK: ${this.message}`;
  }
}

try {
  throw new ApiError("Api error message");
} catch (e) {
  if (e instanceof ApiError) {
    console.error(`${e}`);
    throw e;
  }
}
