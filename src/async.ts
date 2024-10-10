const database = [];

async function run(): Promise<void> {
	console.log("run");
	console.log("after addUser");
	await addUser("Oscar");
}
async function addUser(name: string): Promise<string> {
	console.log("addUser");

	return await new Promise((resolve, reject) => {
		setTimeout(() => {
			database.push(name);

			// reject(new Error());
		}, 1000);
	});
}

run()
	.then(() => console.log("After run"))
	.catch((e) => console.error(e));

console.log("after script");

// await calling
// caller
// calling
// after caller
// RESPONSE

// without calling
// ller
// calling
// after caller
// RESPONSE

/* run */
/* addUser */
/* after addUser */
/* after script */
/* After run */

const data = (async () => {
	const result: string = await Promise.resolve("test");
	console.log(`The result is: ${result}`);
	return result;
})();

console.log(data);

let response;

try {
	response = await Promise.resolve(10);
} catch (error) {
	console.log(error);
}
