import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers — enables smaller output via ES2020 syntax
    target: "es2020",
    // Enable CSS minification
    cssMinify: true,
    // Raise the chunk size warning threshold (we're actively splitting)
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        // Split large dependencies into separate lazy-loaded chunks
        manualChunks: (id) => {
          // framer-motion gets its own chunk — large and only needed for animations
          if (id.includes("framer-motion")) return "framer-motion";
          // All radix-ui components go together — they're often used together
          if (id.includes("@radix-ui")) return "radix-ui";
          // lucide-react icons — large icon library
          if (id.includes("lucide-react")) return "lucide";
          // react-router
          if (id.includes("react-router-dom") || id.includes("react-router")) return "router";
          // Core react runtime
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) return "react-vendor";
          // tanstack query
          if (id.includes("@tanstack")) return "tanstack";
        },
      },
    },
  },
}));
