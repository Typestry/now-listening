import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import { defineConfig } from "rollup"

export default defineConfig({
  input: "src/app.ts",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [typescript(), json()],
})
