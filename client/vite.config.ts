import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const port = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  server: { port },
  preview: { port },
  plugins: [react()],
});
