import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/ujaas-crisis-care-network/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
}));
