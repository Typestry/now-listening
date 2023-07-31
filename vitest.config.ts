/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    exclude: ["**/test.{ts,mjs,cjs,js}", "node_modules/**/*"],
    setupFiles: ["./setupTests.ts"],
  },
})
