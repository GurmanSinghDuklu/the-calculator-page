import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Split heavy shared libraries into their own cacheable chunks so they
    // aren't duplicated into every lazy page chunk. Combined with per-route
    // React.lazy() this keeps the initial page payload small.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          // Charting library — only needed on a handful of calculator pages.
          if (id.includes("recharts") || id.includes("d3-") || id.includes("victory-vendor")) {
            return "charts";
          }
          // Animation library — only used on a few pages.
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
            return "motion";
          }
          // Radix UI primitives — shared UI, cache once across the site.
          if (id.includes("@radix-ui")) {
            return "radix";
          }
          // React core + router — the stable shared runtime.
          if (
            id.includes("react-router") ||
            id.includes("/react-dom/") ||
            id.includes("/react/") ||
            id.includes("scheduler") ||
            id.includes("react-helmet-async")
          ) {
            return "react-vendor";
          }
          // Everything else from node_modules.
          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
} as any);
