import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections (required for Codespaces)
    port: 5173,
    strictPort: false, // Allow fallback to other ports if 5173 is busy
    hmr: {
      port: 5173, // Use same port for HMR
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false, // Allow fallback for preview as well
  },
});
