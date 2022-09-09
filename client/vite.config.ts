import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const port = 3000;
const host = "0.0.0.0";

const proxy = {
  "/api": {
    target: "http://localhost:5000",
    rewrite: (path) => path.substring(4),
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: { host, port, proxy },
  preview: { host, port, proxy },
  plugins: [react()],
});
