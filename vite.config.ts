import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    cors: true,
    proxy: {
      "/cors": {
        target: "http://localhost:8600/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/cors/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
