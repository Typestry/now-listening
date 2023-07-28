import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"

export default {
  input: "src/app.ts",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [typescript(), json()],
}
