import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// Optimized config for Vercel deployment with TailwindCSS 3.x
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: false,
    target: "es2020",
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
