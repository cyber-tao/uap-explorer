import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react-router-dom/")) {
            return "react-vendor"
          }
          if (id.includes("node_modules/three")) return "three"
          if (id.includes("node_modules/gsap") || id.includes("node_modules/lenis")) {
            return "motion"
          }
          if (id.includes("node_modules/lucide-react")) return "lucide"
          if (id.includes("src/data/events.ts")) return "events-data"
        },
      },
    },
  },
})
