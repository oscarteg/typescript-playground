type MyType<T> = T extends infer R ? R : never;
type T = MyType<{ b: string }>;
