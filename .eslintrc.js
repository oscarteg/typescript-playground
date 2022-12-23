module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  plugins: ["neverthrow"],
  extends: ["standard-with-typescript", "prettier"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "neverthrow/must-use-result": "error",
  },
};
