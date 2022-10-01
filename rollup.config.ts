import json from "@rollup/plugin-json";
import shebang from "rollup-plugin-preserve-shebang";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [json(), shebang(), typescript()],
};
