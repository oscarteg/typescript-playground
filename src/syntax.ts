import { match } from "ts-pattern";

const state = { status: "loading" } as const;

type fetchState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error" };

export function patternMatching() {
  return match<fetchState>(state)
    .with({ status: "loading" }, () => console.log("loading"))
    .with({ status: "success" }, ({ data }) => console.log(data))
    .with({ status: "error" }, () => console.log("error"))
    .exhaustive();
}
