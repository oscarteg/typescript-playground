function once<T extends (...args: any[]) => any>(
	fn: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
	let hsb = false;
	let result;
	return (...args) => {
		if (!hsb) {
			result = fn(...args);
			hsb = true;
			return result;
		} else {
			return undefined;
		}
	};
}

const fn = (a: number, b: number, c: number): number => a + b + c;
const onceFn = once(fn);

type F = () => Promise<any>;

async function promisePool(functions: F[], n: number): Promise<any> {
	async function* next(): AsyncGenerator<never, void, unknown> {
		if (functions.length === 0) {
			return;
		}

		// Remove the first element of the array
		const f = functions.shift();
		// execute the first function
		await f?.();

		// recursive call the next entry
		next();
	}

	//
	await Promise.all(Array(Math.min(n, functions.length)).fill(0).map(next));
}

// const sleep = async (t: number | undefined): Promise<unknown> =>
//   await new Promise((resolve) => setTimeout(resolve, t));
// void promisePool(
//   [async () => await sleep(500), async () => await sleep(400)],
//   2
// );

function areDeeplyEqual(o1: any, o2: any): boolean {
	if (typeof o1 !== typeof o2) {
		return false;
	}

	if (typeof o1 !== "object" || o1 === null || o2 === null) {
		return o1 === o2;
	}

	if ((o1 ?? o2) === null) {
		return o1 === o2;
	}

	if (Array.isArray(o1) || Array.isArray(o2)) {
		if (!Array.isArray(o1) || !Array.isArray(o2) || o1.length !== o2.length) {
			return false;
		}
		return o1.every((v: any, k: number) => areDeeplyEqual(v, o2[k]));
	}

	// Create an array of keys from both objects and remove duplicatesby using a Set
	// This way you don't compare if the item of set A is in set B but you check if all the items of set A n B

	// When both are objects recursive call areDeeplyEqual
	return Array.from(new Set([...Object.keys(o1), ...Object.keys(o2)])).every(
		(k) => areDeeplyEqual(o1[k], o2[k]),
	);
}
