import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // proxy: {
  //   "/v1": {
  //     target: "https://ont-survey-tracker-development.up.railway.app",
  //     changeOrigin: true,
  //     secure: false,
  //   },
  // },
  plugins: [react()],
});
