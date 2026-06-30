import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load environment variables from the root .env file
  const env = loadEnv(mode, process.cwd());

  // Map loaded environment variables to import.meta.env
  const envWithImportMeta = Object.keys(env).reduce((prev, key) => {
    prev[`import.meta.env.${key}`] = JSON.stringify(env[key]);
    return prev;
  }, {});

  console.log(envWithImportMeta, 'this is the file')

  return {
  base: '/',
  plugins: [react()],
  define: envWithImportMeta,
  server: {
    host: "0.0.0.0", // Accept connections from network
    port: 5195,
    strictPort: true,
    allowedHosts: ["69e8c5c8e86910a424ac3991.icod.ai"], // restrict allowed hosts
    watch:{
        usePolling: true,
        interval: 10
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils-vendor': ['axios', 'react-hot-toast']
        }
      }
    },
    chunkSizeWarningLimit: 2500
  },};
});
