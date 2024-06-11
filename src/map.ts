const data = [
	{
		key: "controllerInstanceId",
		values: ["test", "foo"],
	},
	{
		key: "parameterId",
		values: ["03", "02"],
	},
];

const result = data.reduce((accumulator, { key, values }) => {
	return { ...accumulator, [key]: values };
}, {});

const measurementTags: Array<{ key: string; values: string[] }> = [];

const test = () => {
	return measurementTags.reduce(
		(acc, { key, values }) => ({ ...acc, [key]: values }),
		{},
	);
};

console.log(result);
