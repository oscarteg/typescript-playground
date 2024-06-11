function foo(bar: boolean): () => void {
	if (bar) {
		return () => {
			console.log("bar");
		};
	}
}

type Baz = {
	name: string;
	testin: string;
};

function bar({ name, ...b }: Partial<Baz> = {}): void {
	console.log("foo");
}

const execute = foo(false);

execute();

export type {};
