import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const port = 3000;
const host = "0.0.0.0";

// https://vitejs.dev/config/
export default defineConfig({
  server: { host, port },
  preview: { host, port },
  plugins: [react()],
});
