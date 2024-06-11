import * as yup from "yup";
import z from "zod";

enum Operator {
	GreaterThan = "GREATER_THAN",
	LessThan = "LESS_THAN",
}

const metricTriggerSchema = yup.object({
	metricDefinitionId: yup.string().required().default(""),
	thresholdValue: yup.number().required().default(0),
	operator: yup
		.mixed<Operator>()
		.default(Operator.GreaterThan)
		.oneOf(Object.values(Operator))
		.required(),
});

const foo = yup.object({
	foo: yup.string().required(),
	bar: yup.string().notRequired(),
});

const A = z
	.object({
		a: z.string(),
	})
	.strict();

const B = z
	.object({
		b: z.string(),
	})
	.strict();

const aorB = z.union([A, B]);
type AorB = z.TypeOf<typeof aorB>;

console.log(aorB.parse({ b: "asd" }));

// console.log(foo.validateSync({ foo: "asd", bar: "asd" }));

type Foo = yup.InferType<typeof foo>;

// TODO: Improve validation with when on days/weeks
const scheduleTriggerSchema = yup.object({
	schedule: yup.object().shape(
		{
			weeks: yup.number().test({
				name: "weeks-or-days",
				message: "Either weeks or days must be set",
				test: (value, { parent, createError }) => {
					return true;
					if (parent.days) {
						return createError({ message: "Mag niet" });
					}
				},
			}),
			days: yup.number().test({
				name: "weeks-or-days",
				message: "Either weeks or days must be set",
				test: (value, { parent, createError }) => {
					return true;
					if (parent.weeks) {
						return createError({ message: "Mag nietttttttt" });
					}
				},
			}),
		},
		// NOTE: opt out of pogo sort to be able to have cyclic dependency
		[["days", "weeks"]],
	),
});

const yupSchedule = yup.object({
	scheudle: yup.object().shape(
		{
			weeks: yup.number().when("days", {
				is: (days) => !days,
				then: (schema) => schema.required().default(1),
			}),

			days: yup.number().when("weeks", {
				is: (weeks) => !weeks,
				then: (schema) => schema.required().default(1),
			}),
		},
		// NOTE: opt out of pogo sort to be able to have cyclic dependency
		[["days", "weeks"]],
	),
});

type YupSchedule = yup.InferType<typeof yupSchedule>;

type ScheduleTriggerSchema = yup.InferType<typeof scheduleTriggerSchema>;
//   ^?
//
type Schedule = { days: number } | { weeks: number };

export const validationSchema = yup.object({
	title: yup.string().required().default(""),
	description: yup.string().required().default(""),
	details: yup.object({
		title: yup.string().required().default(""),
		description: yup.string().required().default(""),
		subjectIds: yup
			.array()
			.of(yup.string().required().default(""))
			.required()
			.default([]),
	}),
	triggers: yup
		.array()
		.of(
			yup.lazy((value) => {
				if (value.type === "METRIC") {
					return metricTriggerSchema;
				}

				if (value.type === "SCHEDULE") {
					return scheduleTriggerSchema;
				}

				throw Error(`Unknown trigger type: ${value.type}`);
			}),
		)
		.default([
			{
				type: "SCHEDULE",
				schema: {
					schedule: {
						days: 1,
					},
				},
			},
		]),
});

type Validation = yup.InferType<typeof validationSchema>;

type Triggers = Validation["triggers"];
//    ^?

const user = validationSchema.noUnknown().validateSync(
	{
		title: "Work Order Template 1",
		description: "Asd",
		details: {
			title: "test",
			description: "setset",
			subjectIds: [],
			foo: "Asd",
		},
		triggers: [
			{
				type: "SCHEDULE",
				schedule: {
					weeks: 5123123,
				},
			},
			{
				type: "SCHEDULE",
				schedule: {
					days: 3000,
					weeks: 3000,
				},
			},
			{
				type: "SCHEDULE",
				metricDefinitionId: "12",
				thresholdValue: 1,
				operator: "GREATER_THAN",
			},
		],
	},
	{ strict: true },
);

console.log("---------------------");

console.log(user);
