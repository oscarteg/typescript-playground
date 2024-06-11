function add<T extends number>(a: T, b: T) {
	if (typeof a === "number" && typeof b === "number") {
		return a + b;
	}

	return a + b;
}

export type {};
