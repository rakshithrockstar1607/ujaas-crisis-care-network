import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/ujaas-crisis-care-network/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: [
        '**/2 page submission/**',
        '**/Premiere Pro Project*/**',
        '**/Section*/**',
        '**/Phase*/**',
        '**/phase*/**',
        '**/screenshots*/**',
        '**/Website References/**',
        '**/Fonts/**',
        '**/Icons/**',
        '**/Image Assets/**',
        '**/ref_thumbs/**',
        '**/*.tmp',
        '**/*.tmp.*',
        '**/~$*',
        '**/*.docx',
        '**/*.doc',
        '**/*.prproj',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.webp'
      ]
    }
  }
}));
