type Form = {
	name: string;
	address: Option<string>;
};

type None = null | undefined;

type Option<T> = T | None;

class FormError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "FormError";
	}
}

class OptionParseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "OptionParseError";
	}

	static fromError(e: Error): OptionParseError {
		return new OptionParseError(e.message);
	}

	static sendToLogger(e: Error): void {
		console.log(e.message);
	}
}

function calcInvoice(form: Form): boolean {
	if (form.address != null) {
		// send to address service
		//
		return true;
	}

	throw new OptionParseError("Address is required");
}

function usingCalc(): void {
	try {
		calcInvoice({ name: "oscar", address: null }); //  number / undefined
	} catch (e) {
		if (e instanceof FormError) {
			// If form error i need to handle it myself
			console.log("FormError");
		}

		// if not form error i need to rethrow it
		throw e;
	}
}

function usingCalc2(): void {
	usingCalc();
}

usingCalc2();

export type {};
