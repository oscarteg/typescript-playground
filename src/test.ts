type Maybe<T> = T | null;

export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

type LineOptions = {
	data: number[];
	__typename?: "LineOptions";
	bins?: Maybe<Scalars["Float"]>;
	colors: Array<Scalars["String"]>;
	groupBy: Array<Scalars["String"]>;
	position: Scalars["String"];
	type: Scalars["String"];
	xAxisLabel?: Maybe<Scalars["String"]>;
	xColumn: Scalars["String"];
};

type BarOptions = {
	__typename?: "BarOptions";
	axisPrefix?: Maybe<Scalars["String"]>;
	axisSuffix?: Maybe<Scalars["String"]>;
	decimalPlaces?: Maybe<Scalars["Float"]>;
	type: Scalars["String"];
	valuePrefix?: Maybe<Scalars["String"]>;
	valueSuffix?: Maybe<Scalars["String"]>;
};

type Options = LineOptions | BarOptions;

function createLine(options: LineOptions): Options {
	const { data, ...rest } = options;
	//      ^?
}

function createBar(options: BarOptions): Options {}

function isLineOptions(options: Options): options is LineOptions {
	return (options as LineOptions).__typename !== "LineOptions";
}

function isBarOptions(options: Options): options is LineOptions {
	return (options as BarOptions).__typename !== "BarOptions";
}

function getVisualisationConfigurationFromOptions(
	visualisationType: string,
	options: Options,
) {
	switch (visualisationType) {
		case "bar":
			isBarOptions(options);
			return createBar(options as BarOptions);
		case "line":
			isLineOptions(options);
			return createLine(options as LineOptions);
		default:
			return createLine(options as LineOptions);
	}
}

type State = ReturnType<typeof getVisualisationConfigurationFromOptions>;
//   ^?
//

const faa = ["a", "b"] as const;
//    ^?
//
//
//
//
