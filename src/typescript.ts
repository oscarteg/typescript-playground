function foo(x: string | number): boolean {
	if (typeof x === "string") {
		return true;
	} else if (typeof x === "number") {
		return false;
	}

	// Without a never type we would error :
	// - Not all code paths return a value (strict null checks)
	// - Or Unreachable code detected
	// But because TypeScript understands that `fail` function returns `never`
	// It can allow you to call it as you might be using it for runtime safety / exhaustive checks.
	return fail("Unexhaustive!");
}

function fail(message: string): never {
	throw new Error(message);
}

// Inferred return type: void
function failDeclaration(message: string): void {
	throw new Error(message);
}

// Inferred return type: never
const failExpression = (message: string): never => {
	throw new Error(message);
};

function failDeclaration(message: string): never {
	throw new Error(message);
}

class Base {
	overrideMe() {
		throw new Error("You forgot to override me!");
	}
}

class Derived extends Base {
	overrideMe() {
		// Code that actually returns here
	}
}
