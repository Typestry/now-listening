import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    exclude: ["**/test.{ts,mjs,cjs,js}", "node_modules/**/*"],
    setupFiles: ["./setupTests.ts"],
  },
})
