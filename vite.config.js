import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    watch: {
      ignored: ["**/node_modules/**", "**/.git/**"],
    },
    port: 3000,
  },
  plugins: [react()],
});
