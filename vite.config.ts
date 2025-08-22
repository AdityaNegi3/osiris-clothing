// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/osiris-clothing/', // must match the repo name exactly
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
});
