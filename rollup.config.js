import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import run from "@rollup/plugin-run"

export default {
  input: "src/app.ts",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    typescript(),
    json(),
    run({
      execArgv: ["-r", "source-map-support/register"],
    }),
  ],
}
