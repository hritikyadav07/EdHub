import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Minimal config without TailwindCSS plugin for deployment
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: false,
    target: "es2020"
  },
  server: {
    port: 5173,
    cors: true,
    // Only add proxy in development
    ...(mode === "development" && {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false,
        },
      },
    }),
  },
}));
