const fruits = ["APPLE", "POMEGRANATE", "PERSIMMON"] as const;
type Fruits = (typeof fruits)[number];

const onFruitChanged = (value: string): Fruits => {
	const fruit: Fruits | undefined = fruits.find((fruit) => fruit === value);
};

const user = {
	name: "Oscar",
} as const;

const foo = {
	name: "oscar",
};

const setCount = (n: number) => {
	return {
		type: "SET_COUNT",
		payload: n,
	} as const;
};

const resetCount = () => {
	return {
		type: "RESET_COUNT",
	} as const;
};

type CountActions = ReturnType<typeof setCount> | ReturnType<typeof resetCount>;
