import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative URLs let the build run from a domain root or a GitHub Pages sub-path.
  base: './',
  plugins: [react()],
});
