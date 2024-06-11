// const options = {
//   yAxisMin: NaN,
//   yAxisMax: 100,
// };
//
const options = undefined;
console.log(
	(options?.yAxisMin || options?.yAxisMin === 0) && options?.yAxisMax
		? [options.yAxisMin, options.yAxisMax]
		: undefined,
);
