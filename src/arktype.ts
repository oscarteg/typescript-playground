import { type } from "arktype";

const user = type({
  name: "string",
  device: {
    platform: "'android'|'ios'",
    "version?": "number",
  },
});

// Hover to infer...
type User = typeof user.infer;
