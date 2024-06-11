import z, { type ZodTypeAny } from "zod";
// placing shared fields in one place to avoid repetition
const base = z.object({
  name: z.string(),
});

const based = base.merge(
  z.object({
    name: z.array(z.string()),
  })
);

type Base = z.infer<typeof based>;
//    ^?

/**
 * @description
 * This function is used to create a safe loader function.
 * It takes in a loader function and a zod schema.
 * The loader function is expected to return an object.
 * The zod schema is used to validate the output of the loader function.
 * If the output of the loader function is not valid, an error is thrown.
 * If the output of the loader function is valid, it is returned.
 * @param outputValidation - a zod schema used to validate the output of the loader function
 * @param loader - a function that returns an object
 * @returns a function that returns the output of the loader function if it is validate
 * @example
 * const getUsers = safeLoader({
 *  outputValidation: z.object({
 *    name: z.string(),
 *  }),
 *  loader: async () => {
 *    return {
 *      name: "John Doe",
 *    };
 *  },
 * })
 */
export function safeLoader<
  LoaderInputs extends any[],
  OutputValidation extends ZodTypeAny
>({
  outputValidation,
  loader,
}: {
  outputValidation: OutputValidation;
  loader: (...argsList: LoaderInputs) => any;
}) {
  return async (...args: LoaderInputs): Promise<z.infer<OutputValidation>> => {
    const outputs = await loader.apply(null, args);
    const parsedOutput = outputValidation.parse(outputs);
    return parsedOutput;
  };
}
