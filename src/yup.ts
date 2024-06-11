import { mapValues } from "radash";
import * as yup from "yup";

export const buildQueryOptionsSchema = yup.object({
	bucketSize: yup.string().required(),
	queryName: yup.string().required().min(1),
	measurements: yup.array().of(yup.string().required()).required(),
	measurementTags: yup.lazy((data) => {
		return yup.object(
			mapValues(data, () => yup.array().of(yup.string()).required()),
		);
	}),
	pivot: yup.boolean(),
});

const data = {
	bucketSize: "1h",
	queryName: "test",
	measurements: ["test"],
	measurementTags: {
		test: ["testing"],
		fuck: ["testing"],
	},
	pivot: true,
};

// parse and assert validity
const formattedData = await buildQueryOptionsSchema.validate(data);
console.log(formattedData);

type Foo = yup.InferType<typeof buildQueryOptionsSchema>;
//   ^?
