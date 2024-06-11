const p1 = Promise.resolve(1);
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => reject("Error from p2"), 200);
});
const p3 = new Promise((resolve, reject) => {
	setTimeout(() => reject("Error from p3"), 100);
});

// Promise.all([p1, p2, p3])
//   .then((results) => console.log(results))
//   .catch((error) => console.log(error)); // Output: Error from p3

Promise.allSettled([p1, p2, p3])
	.then((results) => console.log(results))
	.catch((error) => console.log(error)); // Output: [{status: "fulfilled", value: 1}, {status: "rejected", reason: "Error from p2"}, {status: "rejected", reason: "Error from p3"}]
